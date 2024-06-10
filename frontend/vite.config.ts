import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.join(__dirname, 'src', 'styles')],
        additionalData: `
          @use 'variables' as *;
          @use 'mixins' as *;
          @use 'functions' as *;
        `,
      },
    },
  },
});
