import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import requireTransform from 'vite-plugin-require-transform';
import optimizer from 'vite-plugin-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    requireTransform({
    fileRegex: /.js$|.vue$/}),
    optimizer({ 
      child_process: () => ({
        find: /^(node:)?child_process$/, 
        code: `const child_process = import.meta.glob('child_process'); export { child_process as default }`
       })
      })
   ],
   
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
