import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

// regex filter for dev.* components
const devComponentRegex =
  /\.\.\/(components|pages)\/([A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)?)\/dev\.(tsx|jsx|js)/i;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      failOnError: true,
      failOnWarning: false,
      useEslintrc: true,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    sourcemap: false,
    outDir: 'build',
    rollupOptions: {
      external: (source) => !!devComponentRegex.exec(source),
    },
  },
  appType: 'spa',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
