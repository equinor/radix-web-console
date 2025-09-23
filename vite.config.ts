import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import packageJson from './package.json';

// regex filter for dev.* components
const devComponentRegex =
  /\.\.\/(components|pages)\/([A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)?)\/dev\.(tsx|jsx|js)/i;

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['web'],
  },
  build: {
    sourcemap: true,
    outDir: 'build',
    rollupOptions: {
      external: (source) => !!devComponentRegex.exec(source),
    },
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
    'import.meta.env.PACKAGE_NAME': JSON.stringify(packageJson.name),
  },
  plugins: [
    react(),
  ],
});
