#!/usr/bin/env node

/**
 * Windows Packaging Script for Standalone Deployment
 * Creates a Windows executable from the Next.js standalone build
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  appName: 'Chalkboard.id',
  version: require('../package.json').version,
  buildDir: path.join(__dirname, '..', '.next', 'standalone'),
  outputDir: path.join(__dirname, '..', 'dist'),
  assetsDir: path.join(__dirname, '..', '.next', 'static'),
  publicDir: path.join(__dirname, '..', 'public'),
};

console.log('📦 Starting Windows packaging process...');

/**
 * Ensure required directories exist
 */
function ensureDirectories() {
  if (!fs.existsSync(config.buildDir)) {
    throw new Error('Standalone build not found. Run `bun run build:standalone` first.');
  }

  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  console.log('✅ Directory structure verified');
}

/**
 * Install pkg if not already installed
 */
function ensurePkg() {
  try {
    execSync('npx pkg --version', { stdio: 'pipe' });
    console.log('✅ pkg is available');
  } catch (error) {
    console.log('⚠️  Installing pkg globally...');
    execSync('npm install -g pkg', { stdio: 'inherit' });
  }
}

/**
 * Create package.json for standalone app
 */
function createStandalonePackage() {
  const packagePath = path.join(config.buildDir, 'package.json');
  
  const standalonePackage = {
    name: 'chalkboard-standalone',
    version: config.version,
    main: 'server.js',
    scripts: {
      start: 'node server.js'
    },
    pkg: {
      assets: [
        '.next/static/**/*',
        'public/**/*',
        'src/**/*',
        'node_modules/.pnpm/**/*'
      ],
      targets: [
        'node18-win-x64'
      ],
      outputPath: config.outputDir
    },
    bin: 'server.js'
  };

  fs.writeFileSync(packagePath, JSON.stringify(standalonePackage, null, 2));
  console.log('✅ Created standalone package.json');
}

/**
 * Copy static assets
 */
function copyStaticAssets() {
  const staticDir = path.join(config.buildDir, '.next', 'static');
  if (fs.existsSync(config.assetsDir)) {
    if (!fs.existsSync(path.dirname(staticDir))) {
      fs.mkdirSync(path.dirname(staticDir), { recursive: true });
    }
    execSync(`cp -r "${config.assetsDir}" "${staticDir}"`, { stdio: 'inherit' });
    console.log('✅ Copied static assets');
  }

  const publicDir = path.join(config.buildDir, 'public');
  if (fs.existsSync(config.publicDir)) {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    execSync(`cp -r "${config.publicDir}"/* "${publicDir}/"`, { stdio: 'inherit' });
    console.log('✅ Copied public assets');
  }
}

/**
 * Create startup script that handles auto-updates and migrations
 */
function createStartupScript() {
  const startupScript = `
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Set environment variables for standalone mode
process.env.IS_STANDALONE_WINDOWS = 'true';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.DEPLOYMENT_MODE = 'standalone';

// Ensure required directories exist
const requiredDirs = ['logs', 'backups', 'uploads', 'updates'];
requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Load environment variables from .env file if it exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

console.log('🚀 Starting Chalkboard.id v${config.version}');
console.log('📁 Working directory:', __dirname);
console.log('🌐 Mode: Standalone Windows');

// Import the actual Next.js server
require('./server.js');
`.trim();

  const startupPath = path.join(config.buildDir, 'chalkboard.js');
  fs.writeFileSync(startupPath, startupScript);
  
  // Update package.json to use our startup script
  const packagePath = path.join(config.buildDir, 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  packageData.main = 'chalkboard.js';
  packageData.bin = 'chalkboard.js';
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
  
  console.log('✅ Created startup script');
}

/**
 * Create Windows installer
 */
function createInstaller() {
  const installerScript = `
@echo off
echo.
echo ====================================
echo   Chalkboard.id v${config.version}
echo   Windows Standalone Installer
echo ====================================
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  PostgreSQL not found. Please install PostgreSQL 12+ before running Chalkboard.id
    echo    Download from: https://www.postgresql.org/download/windows/
    echo.
    pause
    exit /b 1
)

REM Create installation directory
if not exist "%PROGRAMFILES%\\Chalkboard" (
    mkdir "%PROGRAMFILES%\\Chalkboard"
)

REM Copy executable
copy "chalkboard-win.exe" "%PROGRAMFILES%\\Chalkboard\\chalkboard.exe"

REM Create desktop shortcut
set SHORTCUT="%USERPROFILE%\\Desktop\\Chalkboard.id.lnk"
echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = %SHORTCUT% >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "%PROGRAMFILES%\\Chalkboard\\chalkboard.exe" >> CreateShortcut.vbs
echo oLink.WorkingDirectory = "%PROGRAMFILES%\\Chalkboard" >> CreateShortcut.vbs
echo oLink.Description = "Chalkboard.id - Billiard Hall Management System" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs
cscript CreateShortcut.vbs
del CreateShortcut.vbs

REM Create example environment file
echo # Chalkboard.id Configuration > "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo # Copy this file to .env and configure your settings >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo # >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo # Database Configuration >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo DATABASE_URL=postgresql://postgres:password@localhost:5432/chalkboard >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo # >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo # Authentication >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo NEXTAUTH_SECRET=your-secret-here-minimum-32-characters >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo NEXTAUTH_URL=http://localhost:3000 >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo # >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo # Auto-update Server (optional) >> "%PROGRAMFILES%\\Chalkboard\\.env.example"
echo UPDATE_SERVER_URL=https://your-update-server.com/api/updates >> "%PROGRAMFILES%\\Chalkboard\\.env.example"

echo.
echo ✅ Installation completed successfully!
echo.
echo 📋 Next steps:
echo    1. Configure PostgreSQL database
echo    2. Copy .env.example to .env and edit settings
echo    3. Launch Chalkboard.id from desktop shortcut
echo.
echo 📖 For detailed setup instructions, visit:
echo    https://github.com/your-username/chalkboard/blob/main/docs/STANDALONE.md
echo.
pause
`.trim();

  const installerPath = path.join(config.outputDir, 'install.bat');
  fs.writeFileSync(installerPath, installerScript);
  console.log('✅ Created Windows installer script');
}

/**
 * Build the executable
 */
function buildExecutable() {
  console.log('🔨 Building Windows executable...');
  
  const pkgCommand = [
    'npx pkg',
    path.join(config.buildDir, 'package.json'),
    '--target node18-win-x64',
    '--output', path.join(config.outputDir, 'chalkboard-win.exe'),
    '--compress GZip'
  ].join(' ');

  try {
    execSync(pkgCommand, { 
      stdio: 'inherit',
      cwd: config.buildDir
    });
    console.log('✅ Windows executable created successfully');
  } catch (error) {
    console.error('❌ Failed to create executable:', error.message);
    throw error;
  }
}

/**
 * Create release package
 */
function createReleasePackage() {
  const releaseDir = path.join(config.outputDir, 'release');
  if (!fs.existsSync(releaseDir)) {
    fs.mkdirSync(releaseDir);
  }

  // Copy executable
  const executablePath = path.join(config.outputDir, 'chalkboard-win.exe');
  const releaseExecutable = path.join(releaseDir, 'chalkboard-win.exe');
  fs.copyFileSync(executablePath, releaseExecutable);

  // Copy installer
  const installerPath = path.join(config.outputDir, 'install.bat');
  const releaseInstaller = path.join(releaseDir, 'install.bat');
  fs.copyFileSync(installerPath, releaseInstaller);

  // Copy environment example
  const envExamplePath = path.join(__dirname, '..', '.env.standalone.example');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, path.join(releaseDir, '.env.example'));
  }

  // Create README
  const readmeContent = `
# Chalkboard.id v${config.version} - Windows Standalone

## Quick Start

1. Run \`install.bat\` as Administrator to install Chalkboard.id
2. Configure PostgreSQL database (see Database Setup below)
3. Configure environment variables in \`C:\\Program Files\\Chalkboard\\.env\`
4. Launch Chalkboard.id from desktop shortcut

## Database Setup

1. Install PostgreSQL 12+ from https://www.postgresql.org/download/windows/
2. Create a database named \`chalkboard\`
3. Update DATABASE_URL in .env file

## Configuration

Copy \`.env.example\` to \`.env\` and configure:
- DATABASE_URL: PostgreSQL connection string
- NEXTAUTH_SECRET: Random string for session encryption
- UPDATE_SERVER_URL: Auto-update server (optional)

## Support

For help and documentation, visit:
https://github.com/your-username/chalkboard/blob/main/docs/

## Version Information

- Version: ${config.version}
- Build Date: ${new Date().toISOString()}
- Platform: Windows x64
`.trim();

  fs.writeFileSync(path.join(releaseDir, 'README.txt'), readmeContent);

  console.log('✅ Release package created in:', releaseDir);
}

/**
 * Main packaging process
 */
async function main() {
  try {
    ensureDirectories();
    ensurePkg();
    createStandalonePackage();
    copyStaticAssets();
    createStartupScript();
    buildExecutable();
    createInstaller();
    createReleasePackage();

    console.log('');
    console.log('🎉 Windows packaging completed successfully!');
    console.log('📁 Output directory:', config.outputDir);
    console.log('📦 Release package:', path.join(config.outputDir, 'release'));
    console.log('');
    console.log('💡 To distribute:');
    console.log('   - Share the entire "release" folder');
    console.log('   - Users should run install.bat as Administrator');
    console.log('   - Ensure PostgreSQL is installed on target systems');
    console.log('');

  } catch (error) {
    console.error('❌ Packaging failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, config };