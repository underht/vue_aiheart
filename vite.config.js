import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vite.dev/config/
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig({
  plugins: [vue(),
    // viteMockServe({
    //   mockPath: 'mock',  // mock文件放在根目录的mock文件夹
    //   enable: true
    // })
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://159.75.169.224:1235',
        changeOrigin: true,
      }
    }
  }
  
})
