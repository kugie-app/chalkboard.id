/**
 * Auto-Update Manager for Standalone Windows Deployment
 * Handles automatic update checking, downloading, and application restart
 */

import { getDeploymentConfig } from './deployment-config';
import { runMigrations, checkMigrationStatus } from './migration-manager';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export interface UpdateInfo {
  version: string;
  releaseNotes: string;
  downloadUrl: string;
  size: number;
  checksum: string;
  releaseDate: string;
  isRequired: boolean;
}

export interface UpdateResult {
  success: boolean;
  error?: string;
  downloadPath?: string;
  restartRequired?: boolean;
}

export interface UpdateProgress {
  phase: 'checking' | 'downloading' | 'installing' | 'migrating' | 'restarting' | 'complete';
  progress: number; // 0-100
  message: string;
  error?: string;
}

/**
 * Check for available updates from update server
 */
export async function checkForUpdates(): Promise<UpdateInfo | null> {
  const config = getDeploymentConfig();
  
  if (config.mode !== 'standalone' || !config.versioning.updateServerUrl) {
    console.log('Auto-update not available for this deployment mode');
    return null;
  }
  
  try {
    const currentVersion = config.versioning.currentVersion;
    const updateUrl = `${config.versioning.updateServerUrl}?current=${currentVersion}&platform=win32`;
    
    console.log(`Checking for updates from: ${updateUrl}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(updateUrl, {
      method: 'GET',
      headers: {
        'User-Agent': `Chalkboard/${currentVersion} (Windows)`,
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Update server responded with ${response.status}: ${response.statusText}`);
    }
    
    const updateInfo = await response.json() as UpdateInfo;
    
    // Check if update is newer than current version
    if (isNewerVersion(updateInfo.version, currentVersion)) {
      console.log(`Update available: v${updateInfo.version}`);
      return updateInfo;
    } else {
      console.log('No updates available');
      return null;
    }
  } catch (error) {
    console.error('Failed to check for updates:', error);
    return null;
  }
}

/**
 * Compare version strings (simple semantic versioning)
 */
function isNewerVersion(newVersion: string, currentVersion: string): boolean {
  const parseVersion = (v: string) => v.split('.').map(Number);
  const newParts = parseVersion(newVersion);
  const currentParts = parseVersion(currentVersion);
  
  for (let i = 0; i < Math.max(newParts.length, currentParts.length); i++) {
    const newPart = newParts[i] || 0;
    const currentPart = currentParts[i] || 0;
    
    if (newPart > currentPart) return true;
    if (newPart < currentPart) return false;
  }
  
  return false;
}

/**
 * Download update file with progress tracking
 */
export async function downloadUpdate(
  updateInfo: UpdateInfo,
  onProgress?: (progress: UpdateProgress) => void
): Promise<UpdateResult> {
  const config = getDeploymentConfig();
  
  if (config.mode !== 'standalone') {
    return {
      success: false,
      error: 'Updates are only available for standalone deployments',
    };
  }
  
  try {
    const updatesDir = path.join(process.cwd(), 'updates');
    const fileName = `chalkboard-v${updateInfo.version}.exe`;
    const downloadPath = path.join(updatesDir, fileName);
    
    // Ensure updates directory exists
    if (!fs.existsSync(updatesDir)) {
      fs.mkdirSync(updatesDir, { recursive: true });
    }
    
    // Remove existing file if it exists
    if (fs.existsSync(downloadPath)) {
      fs.unlinkSync(downloadPath);
    }
    
    onProgress?.({
      phase: 'downloading',
      progress: 0,
      message: `Downloading update v${updateInfo.version}...`,
    });
    
    const response = await fetch(updateInfo.downloadUrl);
    
    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`);
    }
    
    const total = updateInfo.size || parseInt(response.headers.get('content-length') || '0');
    let downloaded = 0;
    
    const writer = fs.createWriteStream(downloadPath);
    const reader = response.body?.getReader();
    
    if (!reader) {
      throw new Error('Failed to get response reader');
    }
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      downloaded += value.length;
      writer.write(value);
      
      const progress = total > 0 ? Math.round((downloaded / total) * 100) : 0;
      onProgress?.({
        phase: 'downloading',
        progress,
        message: `Downloaded ${formatBytes(downloaded)}${total > 0 ? ` of ${formatBytes(total)}` : ''}`,
      });
    }
    
    writer.end();
    
    // Verify checksum if provided
    if (updateInfo.checksum) {
      onProgress?.({
        phase: 'downloading',
        progress: 100,
        message: 'Verifying download integrity...',
      });
      
      const crypto = require('crypto');
      const fileBuffer = fs.readFileSync(downloadPath);
      const fileChecksum = crypto.createHash('sha256').update(fileBuffer).digest('hex');
      
      if (fileChecksum !== updateInfo.checksum) {
        fs.unlinkSync(downloadPath);
        throw new Error('Download verification failed: checksum mismatch');
      }
    }
    
    console.log(`Update downloaded successfully: ${downloadPath}`);
    
    return {
      success: true,
      downloadPath,
      restartRequired: true,
    };
  } catch (error) {
    console.error('Download failed:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown download error',
    };
  }
}

/**
 * Install update and restart application
 */
export async function installUpdateAndRestart(
  downloadPath: string,
  updateInfo: UpdateInfo,
  onProgress?: (progress: UpdateProgress) => void
): Promise<UpdateResult> {
  const config = getDeploymentConfig();
  
  if (config.mode !== 'standalone') {
    return {
      success: false,
      error: 'Updates can only be installed in standalone mode',
    };
  }
  
  try {
    onProgress?.({
      phase: 'installing',
      progress: 10,
      message: 'Preparing to install update...',
    });
    
    // Check if database migration is needed
    const migrationStatus = await checkMigrationStatus(updateInfo.version);
    
    if (migrationStatus.needsMigration) {
      onProgress?.({
        phase: 'migrating',
        progress: 30,
        message: 'Migrating database...',
      });
      
      const migrationResult = await runMigrations(updateInfo.version);
      
      if (!migrationResult.success) {
        throw new Error(`Database migration failed: ${migrationResult.error}`);
      }
      
      console.log(`Database migrated successfully to version ${updateInfo.version}`);
    }
    
    onProgress?.({
      phase: 'installing',
      progress: 70,
      message: 'Installing update...',
    });
    
    // Create update script
    const scriptPath = path.join(path.dirname(downloadPath), 'update-script.bat');
    const currentExe = process.execPath;
    const backupExe = currentExe + '.backup';
    
    const updateScript = `
@echo off
echo Updating Chalkboard.id...
timeout /t 3 /nobreak >nul
echo Backing up current version...
move "${currentExe}" "${backupExe}"
echo Installing new version...
move "${downloadPath}" "${currentExe}"
echo Starting updated application...
start "" "${currentExe}"
echo Update complete!
del "%~f0"
    `.trim();
    
    fs.writeFileSync(scriptPath, updateScript);
    
    onProgress?.({
      phase: 'restarting',
      progress: 90,
      message: 'Restarting application...',
    });
    
    // Execute update script and exit
    spawn('cmd', ['/c', scriptPath], {
      detached: true,
      stdio: 'ignore',
    }).unref();
    
    // Give script time to start
    setTimeout(() => {
      process.exit(0);
    }, 2000);
    
    return {
      success: true,
      restartRequired: false, // We're handling restart automatically
    };
  } catch (error) {
    console.error('Update installation failed:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Installation failed',
    };
  }
}

/**
 * Perform complete update process
 */
export async function performUpdate(
  updateInfo: UpdateInfo,
  onProgress?: (progress: UpdateProgress) => void
): Promise<UpdateResult> {
  try {
    onProgress?.({
      phase: 'checking',
      progress: 0,
      message: 'Initializing update...',
    });
    
    // Download update
    const downloadResult = await downloadUpdate(updateInfo, onProgress);
    
    if (!downloadResult.success || !downloadResult.downloadPath) {
      return downloadResult;
    }
    
    // Install and restart
    return await installUpdateAndRestart(downloadResult.downloadPath, updateInfo, onProgress);
  } catch (error) {
    console.error('Update process failed:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Update process failed',
    };
  }
}

/**
 * Schedule automatic update check
 */
export function scheduleUpdateCheck(intervalHours: number = 24): NodeJS.Timeout | null {
  const config = getDeploymentConfig();
  
  if (!config.features.autoUpdate || config.mode !== 'standalone') {
    return null;
  }
  
  const intervalMs = intervalHours * 60 * 60 * 1000;
  
  const checkAndNotify = async () => {
    try {
      const updateInfo = await checkForUpdates();
      
      if (updateInfo) {
        console.log(`Update available: v${updateInfo.version}`);
        console.log(`Release notes: ${updateInfo.releaseNotes}`);
        
        // Emit update notification (can be picked up by UI)
        (process as any).emit('update-available', updateInfo);
        
        // Auto-install critical updates
        if (updateInfo.isRequired) {
          console.log('Critical update detected, auto-installing...');
          await performUpdate(updateInfo, (progress) => {
            console.log(`${progress.phase}: ${progress.message} (${progress.progress}%)`);
          });
        }
      }
    } catch (error) {
      console.error('Scheduled update check failed:', error);
    }
  };
  
  // Check immediately on startup
  setTimeout(checkAndNotify, 30000); // Wait 30 seconds after startup
  
  // Schedule recurring checks
  return setInterval(checkAndNotify, intervalMs);
}

/**
 * Format bytes for display
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

