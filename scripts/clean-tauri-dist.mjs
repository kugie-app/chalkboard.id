/**
 * Post-build cleanup for Tauri desktop builds.
 * Removes node_modules from .next/standalone to prevent Tauri from
 * rejecting the frontendDist directory.
 */
import { rmSync, existsSync } from 'fs';
import { join } from 'path';

const targets = [
  join('.next', 'standalone', 'node_modules'),
  join('.next', 'standalone', '.next', 'cache'),
];

for (const target of targets) {
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
    console.log(`Removed ${target}`);
  }
}

console.log('Tauri dist cleanup complete');
