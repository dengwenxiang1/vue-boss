import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    requireTransform({
    fileRegex: /.js$|.vue$/
  }),],
  server:{
    proxy:{
      '/api':{
        target:"http://localhost:4000",
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});
