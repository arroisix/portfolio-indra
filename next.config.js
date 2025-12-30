/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    reactStrictMode: true,
    allowedDevOrigins: [
        '192.168.1.84'
    ],
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            // Ignore cache files and generated files from file watching
            config.watchOptions = {
                ...config.watchOptions,
                ignored: [
                    '**/node_modules/**',
                    '**/.next/**',
                    '**/.sourcebit-nextjs-cache.json',
                    '**/.stackbit/**',
                    '**/.cache/**'
                ]
            };
        }
        return config;
    }
};

module.exports = nextConfig;
