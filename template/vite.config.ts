import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'

// 全局 Less 变量文件的绝对路径（Windows 反斜杠转成正斜杠，Less @import 才认）
const lessVars = fileURLToPath(
  new URL('./src/styles/variables.less', import.meta.url),
).replace(/\\/g, '/')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  resolve: {
    alias: {
      // 路径别名 @ 指向 src 目录，需与 tsconfig.app.json 的 paths 保持一致
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 把全局变量自动注入每个 .less，各文件直接用 @masterColor，无需逐个 @import
        additionalData: `@import "${lessVars}";`,
      },
    },
  },
  server: {
    port: 5173,
    // 后端联调时可开启代理（此处用 MSW 做本地 Mock，一般无需代理）
    // proxy: {
    //   '/api': { target: 'http://localhost:8080', changeOrigin: true },
    // },
  },
})
