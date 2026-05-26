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
  let next_server: Arc<Mutex<Option<Child>>> = Arc::new(Mutex::new(None));
  let setup_next_server = Arc::clone(&next_server);
  let shutdown_next_server = Arc::clone(&next_server);

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![print_receipt_raw])
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

#[tauri::command]
fn print_receipt_raw(receipt: String, printer_name: Option<String>) -> Result<(), String> {
  #[cfg(windows)]
  {
    raw_print::print_receipt(receipt, printer_name).map_err(|error| error.to_string())
  }

  #[cfg(not(windows))]
  {
    let _ = receipt;
    let _ = printer_name;
    Err("Raw receipt printing is only supported on Windows desktop".to_string())
  }
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

#[cfg(windows)]
mod raw_print {
  use std::{
    ffi::{c_void, OsStr},
    os::windows::ffi::OsStrExt,
    ptr::null_mut,
  };

  use windows_sys::Win32::{
    Foundation::HANDLE,
    Graphics::Printing::{
      ClosePrinter, EndDocPrinter, EndPagePrinter, GetDefaultPrinterW, OpenPrinterW,
      StartDocPrinterW, StartPagePrinter, WritePrinter, DOC_INFO_1W,
    },
  };

  pub fn print_receipt(
    receipt: String,
    printer_name: Option<String>,
  ) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let target_printer = match printer_name {
      Some(name) if !name.trim().is_empty() => name,
      _ => default_printer()?,
    };

    let mut bytes = escpos_receipt_bytes(&receipt);
    if let Err(error) = raw_write(&target_printer, &mut bytes) {
      let fallback_printer = default_printer()?;
      if fallback_printer == target_printer {
        return Err(error);
      }
      raw_write(&fallback_printer, &mut bytes)?;
    }
    Ok(())
  }

  fn escpos_receipt_bytes(receipt: &str) -> Vec<u8> {
    let normalized = receipt.replace("\r\n", "\n").replace('\r', "\n");
    let mut bytes = Vec::with_capacity(normalized.len() + 32);

    bytes.extend_from_slice(&[0x1b, 0x40]); // Initialize printer.
    bytes.extend_from_slice(&[0x1b, 0x61, 0x01]); // Center.
    bytes.extend_from_slice(&[0x1b, 0x45, 0x01]); // Bold on.

    for line in normalized.lines() {
      let trimmed = line.trim_end();
      if is_separator(trimmed) {
        bytes.extend_from_slice(&[0x1b, 0x45, 0x00]);
        bytes.extend_from_slice(trimmed.as_bytes());
        bytes.extend_from_slice(b"\n");
        bytes.extend_from_slice(&[0x1b, 0x45, 0x01]);
      } else {
        bytes.extend_from_slice(trimmed.as_bytes());
        bytes.extend_from_slice(b"\n");
      }
    }

    bytes.extend_from_slice(&[0x1b, 0x45, 0x00]); // Bold off.
    bytes.extend_from_slice(b"\n\n");
    bytes.extend_from_slice(&[0x1d, 0x56, 0x42, 0x00]); // Partial cut when supported.
    bytes
  }

  fn is_separator(line: &str) -> bool {
    !line.is_empty() && line.chars().all(|ch| ch == '-' || ch == '=')
  }

  fn raw_write(
    printer_name: &str,
    bytes: &mut [u8],
  ) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let mut printer_handle: HANDLE = null_mut();
    let mut printer_name_wide = wide_null(printer_name);

    if unsafe { OpenPrinterW(printer_name_wide.as_mut_ptr(), &mut printer_handle, null_mut()) } == 0 {
      return Err(format!("Failed to open printer '{printer_name}'").into());
    }

    let mut doc_name = wide_null("Chalkboard Receipt");
    let mut data_type = wide_null("RAW");
    let doc_info = DOC_INFO_1W {
      pDocName: doc_name.as_mut_ptr(),
      pOutputFile: null_mut(),
      pDatatype: data_type.as_mut_ptr(),
    };

    let result = unsafe {
      let doc_started = StartDocPrinterW(
        printer_handle,
        1,
        &doc_info as *const DOC_INFO_1W,
      );
      if doc_started == 0 {
        ClosePrinter(printer_handle);
        return Err("Failed to start printer document".into());
      }

      if StartPagePrinter(printer_handle) == 0 {
        EndDocPrinter(printer_handle);
        ClosePrinter(printer_handle);
        return Err("Failed to start printer page".into());
      }

      let mut written = 0;
      let write_ok = WritePrinter(
        printer_handle,
        bytes.as_mut_ptr() as *mut c_void,
        bytes.len() as u32,
        &mut written,
      );

      EndPagePrinter(printer_handle);
      EndDocPrinter(printer_handle);
      ClosePrinter(printer_handle);

      write_ok != 0 && written as usize == bytes.len()
    };

    if !result {
      return Err("Failed to write complete receipt to printer".into());
    }

    Ok(())
  }

  fn default_printer() -> Result<String, Box<dyn std::error::Error + Send + Sync>> {
    let mut needed = 0;
    unsafe {
      GetDefaultPrinterW(null_mut(), &mut needed);
    }

    if needed == 0 {
      return Err("No default Windows printer is configured".into());
    }

    let mut buffer = vec![0u16; needed as usize];
    let ok = unsafe { GetDefaultPrinterW(buffer.as_mut_ptr(), &mut needed) };
    if ok == 0 {
      return Err("Failed to read default Windows printer".into());
    }

    let end = buffer.iter().position(|&ch| ch == 0).unwrap_or(buffer.len());
    Ok(String::from_utf16_lossy(&buffer[..end]))
  }

  fn wide_null(value: &str) -> Vec<u16> {
    OsStr::new(value).encode_wide().chain(Some(0)).collect()
  }
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
