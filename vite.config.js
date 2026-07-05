import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // 提取 resolve 方法用于别名
// https://vite.dev/config/
import { viteMockServe } from 'vite-plugin-mock'

// 关键逻辑：必须引入 unplugin-icons 相关的核心模块与解析器
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  plugins: [
    vue(),
    // viteMockServe({
    //   mockPath: 'mock',  // mock文件放在根目录的mock文件夹
    //   enable: true
    // }),

    // 1. 自动引入组件插件（IconsResolver 必须放在这里面）
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'i', 
          enabledCollections: ['local'] // 允许识别本地图标集
        }),
      ],
    }),

    // 2. 图标核心插件（去掉冒号，改为直接调用函数）
    Icons({
      autoInstall: true, // 如果使用开源图标库，检测到没安装会自动帮你下载
      compiler: 'vue3',  // 指定编译器为 Vue 3
      customCollections: {
        // 核心算法：定义本地图标文件夹，把 ./src/assets/icons 映射为 'local' 图标集
        'local': FileSystemIconLoader(
          resolve(__dirname, 'src/assets/icons'), // 这里直接使用上面 import 的 resolve
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" ') // 将 svg 颜色替换为当前文本颜色
        ),
      },
    }),
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    // ⚠️ IconsResolver 已经从这里移走
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