use std::{
  fs::{File, OpenOptions},
  io::Write,
  net::{TcpListener, TcpStream},
  path::PathBuf,
  process::{Child, Command, Stdio},
  sync::{Arc, Mutex},
  thread,
  time::Duration,
};

use tauri::{AppHandle, Manager, Runtime, Url};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let next_server = Arc::new(Mutex::new(None));
  let setup_next_server = Arc::clone(&next_server);
  let shutdown_next_server = Arc::clone(&next_server);

  tauri::Builder::default()
    .setup(move |app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      #[cfg(not(debug_assertions))]
      {
        let app_handle = app.handle().clone();
        let setup_next_server = Arc::clone(&setup_next_server);

        thread::spawn(move || {
          if let Err(error) = start_next_server(app_handle, setup_next_server) {
            log_startup(&format!("failed to start Next server: {error}"));
          }
        });
      }

      Ok(())
    })
    .on_window_event(move |_window, event| {
      if matches!(event, tauri::WindowEvent::CloseRequested { .. }) {
        if let Some(mut child) = shutdown_next_server.lock().unwrap().take() {
          let _ = child.kill();
        }
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn start_next_server<R: Runtime>(
  app: AppHandle<R>,
  next_server: Arc<Mutex<Option<Child>>>,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
  let port = find_available_port()?;
  let resource_dir = app.path().resource_dir()?;
  log_startup(&format!("resource dir: {}", resource_dir.display()));

  let standalone_dir = find_standalone_dir(resource_dir)?;
  let node_path = standalone_dir.join("node.exe");
  log_startup(&format!("standalone dir: {}", standalone_dir.display()));

  let stdout = File::create(std::env::temp_dir().join("chalkboard-next.out.log"))?;
  let stderr = File::create(std::env::temp_dir().join("chalkboard-next.err.log"))?;

  let mut child = Command::new(node_path)
    .arg("server.js")
    .current_dir(&standalone_dir)
    .env("PORT", port.to_string())
    .env("HOSTNAME", "127.0.0.1")
    .env("DEPLOYMENT_MODE", "desktop")
    .env("NEXTAUTH_URL", format!("http://127.0.0.1:{port}"))
    .env("NEXTAUTH_SECRET", "chalkboard-desktop-secret")
    .stdin(Stdio::null())
    .stdout(Stdio::from(stdout))
    .stderr(Stdio::from(stderr))
    .spawn()?;

  wait_for_server(port, &mut child)?;

  *next_server.lock().unwrap() = Some(child);

  if let Some(window) = app.get_webview_window("main") {
    window.navigate(Url::parse(&format!("http://127.0.0.1:{port}/id/auth/signin"))?)?;
  }

  Ok(())
}

fn find_available_port() -> std::io::Result<u16> {
  let listener = TcpListener::bind(("127.0.0.1", 0))?;
  Ok(listener.local_addr()?.port())
}

fn find_standalone_dir(resource_dir: PathBuf) -> std::io::Result<PathBuf> {
  let candidates = [
    resource_dir.join("standalone"),
    resource_dir.join("_up_").join(".next").join("standalone"),
  ];

  candidates
    .into_iter()
    .find(|path| path.join("server.js").exists() && path.join("node.exe").exists())
    .ok_or_else(|| {
      std::io::Error::new(
        std::io::ErrorKind::NotFound,
        "Bundled Next.js standalone server was not found",
      )
    })
}

fn wait_for_server(port: u16, child: &mut Child) -> std::io::Result<()> {
  for _ in 0..120 {
    if TcpStream::connect(("127.0.0.1", port)).is_ok() {
      log_startup(&format!("Next server listening on port {port}"));
      return Ok(());
    }

    if let Some(status) = child.try_wait()? {
      return Err(std::io::Error::new(
        std::io::ErrorKind::Other,
        format!("Next.js server exited early with {status}"),
      ));
    }

    thread::sleep(Duration::from_millis(250));
  }

  Err(std::io::Error::new(
    std::io::ErrorKind::TimedOut,
    "Next.js server did not start in time",
  ))
}

fn log_startup(message: &str) {
  if let Ok(mut file) = OpenOptions::new()
    .create(true)
    .append(true)
    .open(std::env::temp_dir().join("chalkboard-desktop.log"))
  {
    let _ = writeln!(file, "{message}");
  }
}
