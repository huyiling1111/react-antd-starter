import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/** 浏览器端 MSW worker，仅在开发环境由 main.tsx 启动 */
export const worker = setupWorker(...handlers)
