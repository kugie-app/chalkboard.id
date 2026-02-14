/**
 * Deployment configuration for multi-mode support
 * Supports Railway deployment, Windows standalone, and traditional deployments
 */

export type DeploymentMode = 'desktop' | 'railway' | 'standalone' | 'edge' | 'node' | 'auto';
export type RuntimeEnvironment = 'edge' | 'node';
export type DatabaseProvider = 'pglite' | 'railway' | 'local' | 'neon' | 'standard';

export interface DeploymentConfig {
  mode: DeploymentMode;
  runtime: RuntimeEnvironment;
  provider: DatabaseProvider;
  database: {
    useServerless: boolean;
    pooling: boolean;
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
  };
  features: {
    streamingSSR: boolean;
    dynamicImports: boolean;
    autoUpdate: boolean;
    localFiles: boolean;
    embeddedDatabase: boolean;
    offlineMode: boolean;
  };
  versioning: {
    currentVersion: string;
    updateServerUrl?: string;
    autoMigration: boolean;
  };
}

/**
 * Detects the runtime environment based on available globals
 */
export function detectRuntime(): RuntimeEnvironment {
  // Check for edge runtime indicators
  if (typeof (globalThis as any).EdgeRuntime !== 'undefined') {
    return 'edge';
  }
  
  // Check for Vercel Edge Runtime
  if (process.env.NEXT_RUNTIME === 'edge') {
    return 'edge';
  }
  
  // Check for Cloudflare Workers
  if (typeof globalThis !== 'undefined' && 'caches' in globalThis) {
    const hasNodeGlobals = typeof process !== 'undefined' && process.versions?.node;
    if (!hasNodeGlobals) {
      return 'edge';
    }
  }
  
  // Default to Node.js runtime
  return 'node';
}

/**
 * Detects deployment mode from environment
 */
export function detectDeploymentMode(): DeploymentMode {
  // Check for desktop Tauri app
  if (typeof window !== 'undefined' && '__TAURI__' in window) {
    return 'desktop';
  }

  // Check for Railway environment
  if (process.env.RAILWAY_ENVIRONMENT_NAME) {
    return 'railway';
  }

  // Check for standalone Windows deployment
  if (process.env.IS_STANDALONE_WINDOWS === 'true') {
    return 'standalone';
  }

  // Check for edge environments
  if (process.env.VERCEL === '1' || process.env.NEXT_RUNTIME === 'edge') {
    return 'edge';
  }

  // Default to auto detection
  return 'auto';
}

/**
 * Detects database provider from environment
 */
export function detectDatabaseProvider(): DatabaseProvider {
  // Desktop mode always uses PGlite
  if (typeof window !== 'undefined' && '__TAURI__' in window) {
    return 'pglite';
  }

  // Explicit desktop mode via environment
  if (process.env.DEPLOYMENT_MODE === 'desktop') {
    return 'pglite';
  }

  const dbUrl = process.env.DATABASE_URL || '';

  // Railway PostgreSQL detection
  if (process.env.RAILWAY_ENVIRONMENT_NAME || dbUrl.includes('railway.app')) {
    return 'railway';
  }

  // Local PostgreSQL detection (for standalone)
  if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1') || dbUrl.includes('postgres://postgres:')) {
    return 'local';
  }

  // Neon database detection
  if (dbUrl.includes('neon.tech')) {
    return 'neon';
  }

  // Default to standard PostgreSQL
  return 'standard';
}

/**
 * Gets the deployment configuration based on environment variables
 */
export function getDeploymentConfig(): DeploymentConfig {
  const mode = (process.env.DEPLOYMENT_MODE || detectDeploymentMode()) as DeploymentMode;
  const provider = detectDatabaseProvider();
  
  let runtime: RuntimeEnvironment;
  
  if (mode === 'auto') {
    runtime = detectRuntime();
  } else if (mode === 'edge') {
    runtime = 'edge';
  } else {
    // Railway and standalone both use Node.js runtime
    runtime = 'node';
  }

  const version = process.env.npm_package_version || '4.0.0';
  
  return {
    mode,
    runtime,
    provider,
    database: {
      useServerless: runtime === 'edge' || provider === 'neon',
      pooling: runtime === 'node' && provider !== 'pglite' && process.env.DB_POOLING !== 'false',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    features: {
      streamingSSR: runtime === 'edge',
      dynamicImports: runtime === 'node',
      autoUpdate: mode === 'standalone' || mode === 'desktop',
      localFiles: mode === 'standalone' || mode === 'desktop',
      embeddedDatabase: provider === 'pglite',
      offlineMode: provider === 'pglite',
    },
    versioning: {
      currentVersion: version,
      updateServerUrl: process.env.UPDATE_SERVER_URL,
      autoMigration: process.env.AUTO_MIGRATION !== 'false',
    },
  };
}

/**
 * Validates deployment configuration
 */
export function validateDeploymentConfig(): void {
  const config = getDeploymentConfig();

  // Desktop mode doesn't require DATABASE_URL (uses PGlite)
  if (config.provider !== 'pglite' && !process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  // Desktop-specific validations
  if (config.mode === 'desktop') {
    if (config.provider !== 'pglite') {
      console.warn('Warning: Desktop mode detected but database provider is not PGlite');
    }
  }

  // Railway-specific validations
  if (config.mode === 'railway') {
    if (!process.env.RAILWAY_ENVIRONMENT_NAME) {
      console.warn('Warning: Railway mode detected but RAILWAY_ENVIRONMENT_NAME is not set');
    }
  }

  // Standalone-specific validations
  if (config.mode === 'standalone') {
    if (!config.versioning.updateServerUrl && config.features.autoUpdate) {
      console.warn('Warning: Auto-update enabled but UPDATE_SERVER_URL is not configured');
    }

    if (config.provider === 'local' && !process.env.DATABASE_URL?.includes('localhost')) {
      console.warn('Warning: Standalone mode with local database but DATABASE_URL is not localhost');
    }
  }

  // Edge runtime validations
  if (config.runtime === 'edge' && config.provider !== 'neon') {
    console.warn(
      'Warning: Edge runtime detected but database provider is not Neon. ' +
      'Consider using Neon for optimal edge performance.'
    );
  }

  if (config.mode === 'edge' && config.runtime === 'node') {
    console.warn(
      'Warning: DEPLOYMENT_MODE is set to "edge" but running in Node.js runtime. ' +
      'This may indicate a misconfiguration.'
    );
  }
}

// Export convenience functions
export const isEdgeRuntime = () => getDeploymentConfig().runtime === 'edge';
export const isNodeRuntime = () => getDeploymentConfig().runtime === 'node';
export const isDesktopMode = () => getDeploymentConfig().mode === 'desktop';
export const isRailwayMode = () => getDeploymentConfig().mode === 'railway';
export const isStandaloneMode = () => getDeploymentConfig().mode === 'standalone';
export const useServerlessDB = () => getDeploymentConfig().database.useServerless;
export const useEmbeddedDB = () => getDeploymentConfig().features.embeddedDatabase;