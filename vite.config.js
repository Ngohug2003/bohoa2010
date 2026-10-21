import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// Match the production URL in both the dev and local build preview servers.
function teachersRoute(server) {
  server.middlewares.use((request, _response, next) => {
    if (/^\/2011(?:\?|$)/.test(request.url || '')) {
      request.url = request.url.replace('/2011', '/2011/index.html');
    }
    next();
  });
}

export default defineConfig({
  plugins: [{
    name: 'teachers-day-route',
    configureServer: teachersRoute,
    configurePreviewServer: teachersRoute,
  }],
  build: {
    rollupOptions: {
      input: {
        friend: fileURLToPath(new URL('./index.html', import.meta.url)),
        family: fileURLToPath(new URL('./giadinh.html', import.meta.url)),
        teachers: fileURLToPath(new URL('./2011/index.html', import.meta.url)),
      },
    },
  },
});
