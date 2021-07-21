import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { minifyHtml, injectHtml } from 'vite-plugin-html';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),

    minifyHtml(),
    injectHtml({
      injectData: {
        title: 'vite-plugin-html-example',
        injectScript: '<script src="./inject.js"></script>',
      },
    }),
  ],

  server: {
    port: 8080
  },
})
