import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';

const root = process.cwd();
const standaloneDir = join(root, '.next', 'standalone');
const standaloneStaticDir = join(standaloneDir, '.next', 'static');
const staticDir = join(root, '.next', 'static');
const publicDir = join(root, 'public');
const standalonePublicDir = join(standaloneDir, 'public');
const bundledNodePath = join(standaloneDir, 'node.exe');

if (!existsSync(standaloneDir)) {
  throw new Error('Next standalone output not found. Run the desktop build first.');
}

if (existsSync(staticDir)) {
  rmSync(standaloneStaticDir, { recursive: true, force: true });
  mkdirSync(dirname(standaloneStaticDir), { recursive: true });
  cpSync(staticDir, standaloneStaticDir, { recursive: true });
}

if (existsSync(publicDir)) {
  rmSync(standalonePublicDir, { recursive: true, force: true });
  cpSync(publicDir, standalonePublicDir, { recursive: true });
}

cpSync(process.execPath, bundledNodePath);

console.log('Prepared Next standalone server for Tauri resources');
