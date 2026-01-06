import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
    './src/utils/i18n.ts'
);

/**
 * Get deployment mode from environment variable
 * @returns {'railway' | 'standalone' | 'edge' | 'node' | 'auto'}
 */
function getDeploymentMode() {
    return process.env.DEPLOYMENT_MODE || detectDeploymentMode();
}

/**
 * Auto-detect deployment mode based on environment
 * @returns {'railway' | 'standalone' | 'edge' | 'auto'}
 */
function detectDeploymentMode() {
    // Check for Railway environment
    if (process.env.RAILWAY_ENVIRONMENT_NAME) {
        return 'railway';
    }
    
    // Check for standalone Windows deployment
    if (process.env.IS_STANDALONE_WINDOWS === 'true' || process.env.NODE_ENV === 'standalone') {
        return 'standalone';
    }
    
    // Check for edge environments
    if (process.env.VERCEL === '1' || process.env.NEXT_RUNTIME === 'edge') {
        return 'edge';
    }
    
    return 'auto';
}

/**
 * Determine if we should use edge runtime based on deployment mode
 * @returns {boolean}
 */
function shouldUseEdgeRuntime() {
    const mode = getDeploymentMode();
    
    if (mode === 'edge') {
        return true;
    }
    
    if (mode === 'railway' || mode === 'standalone' || mode === 'node') {
        return false;
    }
    
    // Auto mode: use edge runtime if deploying to Vercel
    return process.env.VERCEL === '1';
}

/**
 * Determine output configuration based on deployment mode
 * @returns {'standalone' | 'export' | undefined}
 */
function getOutputMode() {
    const mode = getDeploymentMode();
    
    // Railway and standalone always use standalone output
    if (mode === 'railway' || mode === 'standalone') {
        return 'standalone';
    }
    
    // Edge deployments typically don't need standalone
    if (mode === 'edge') {
        return undefined;
    }
    
    // Default to standalone for better compatibility
    return 'standalone';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true, // Temporarily disable ESLint during builds
    },
    typescript: {
        ignoreBuildErrors: true, // Temporarily ignore TypeScript errors
    },
    images: { 
        unoptimized: true,
        // Optimize for local files in standalone mode
        ...(getDeploymentMode() === 'standalone' && {
            domains: ['localhost', '127.0.0.1'],
        }),
    },
    output: getOutputMode(),
    
    // Experimental features for edge runtime support
    experimental: {
        ...(shouldUseEdgeRuntime() && {
            runtime: 'edge',
        }),
    },
    
    // Configure webpack for conditional imports and deployment optimizations
    webpack: (config, { isServer }) => {
        const mode = getDeploymentMode();
        
        if (shouldUseEdgeRuntime()) {
            // Alias postgres imports to neon for edge runtime
            config.resolve.alias = {
                ...config.resolve.alias,
                'postgres': '@neondatabase/serverless',
                'drizzle-orm/postgres-js': 'drizzle-orm/neon-http',
            };
        }
        
        // Standalone mode optimizations
        if (mode === 'standalone') {
            // Bundle additional Node.js modules for standalone
            if (isServer) {
                config.externals = config.externals || [];
                // Don't externalize these for better standalone compatibility
                config.externals.push = new Proxy(config.externals.push, {
                    apply(target, thisArg, argumentsList) {
                        const [item] = argumentsList;
                        // Keep these modules bundled for standalone
                        if (typeof item === 'string' && 
                            (item.includes('postgres') || 
                             item.includes('@neondatabase') || 
                             item.includes('drizzle'))) {
                            return thisArg.length; // Don't add to externals
                        }
                        return target.apply(thisArg, argumentsList);
                    }
                });
            }
        }
        
        // Railway optimizations
        if (mode === 'railway') {
            // Optimize bundle size for Railway deployment
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                crypto: false,
            };
        }
        
        return config;
    },
    
    // Environment variables to be included in the build
    env: {
        DEPLOYMENT_MODE: getDeploymentMode(),
    },
    
    // Server configuration for different deployment modes
    ...(getDeploymentMode() === 'standalone' && {
        serverRuntimeConfig: {
            // Runtime config for standalone mode
            DATABASE_URL: process.env.DATABASE_URL,
            UPDATE_SERVER_URL: process.env.UPDATE_SERVER_URL,
            IS_STANDALONE_WINDOWS: 'true',
        },
    }),
};

export default withNextIntl(nextConfig);