import path from 'path';
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import reactSWC from '@vitejs/plugin-react-swc';



// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    reactSWC(),

    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'IP Query',
          injectScript: '<script src="./inject.js"></script>',
        },
      },
    }),
  ],

  server: {
    port: 8080
  },

  css: {
    modules: {
      //generateScopedName: "[name]__[local]___[hash:base64:5]",
      generateScopedName: "[hash:base64:4]",
    }
  }
})
