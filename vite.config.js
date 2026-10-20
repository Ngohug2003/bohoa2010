import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        friend: fileURLToPath(new URL('./index.html', import.meta.url)),
        family: fileURLToPath(new URL('./giadinh.html', import.meta.url)),
      },
    },
  },
});
