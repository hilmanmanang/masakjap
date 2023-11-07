/** @type {import('next').NextConfig} */
const nextConfig = {
    optimizeFonts: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'files.edgestore.dev',
                port: '',
                pathname: '/**',
            }
        ]
    }
}

module.exports = nextConfig
