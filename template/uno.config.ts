import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  // 注意：一旦显式写了 presets，unocss/vite 内置的默认 presetWind3 就不再注入了，
  // 必须自己加回来，否则所有类名会全部失效。
  presets: [
    presetWind3({
      // 所有工具类和 shortcut 统一加 g- 前缀：g-text-red-500、g-mt-8
      // 想让带前缀和不带前缀同时生效，改成 prefix: ['g-', '']
      prefix: 'g-',
    }),
  ],
})
