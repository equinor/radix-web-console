import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import packageJson from './package.json'

// regex filter for dev.* components
const devComponentRegex = /\.\.\/(components|pages)\/([A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)?)\/dev\.(tsx|jsx|js)/i

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['web'],
    proxy: {
      '/api': 'https://api.dev.radix.equinor.com',
      '/cost-api/': {
        target: 'https://server-radix-cost-allocation-api-qa.dev.radix.equinor.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cost-api/, '/api/v1'),
      },
      '/uptime': 'https://uptime.dev.radix.equinor.com',
      '/log-api/': {
        target: 'https://server-radix-log-api-qa.dev.radix.equinor.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/log-api/, '/api/v1'),
      },
      '/scan-api/': {
        target: 'https://server-radix-vulnerability-scanner-api-qa.dev.radix.equinor.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/scan-api/, '/api/v1'),
      },
    },
  },
  build: {
    sourcemap: true,
    outDir: 'build',
    rolldownOptions: {
      // Exclude dev.* components from the main bundle, as they are only used in development and should be lazy-loaded when accessed
      external: (source) => !!devComponentRegex.exec(source),
    },
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
    'import.meta.env.PACKAGE_NAME': JSON.stringify(packageJson.name),
  },
  plugins: [react()],
})
