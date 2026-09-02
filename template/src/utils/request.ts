import axios, { type AxiosRequestConfig } from 'axios'
import { message } from 'antd'

/** 后端统一响应结构（按实际接口调整字段名） */
export interface ApiResult<T = unknown> {
  code: number
  message: string
  data: T
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
})

// 请求拦截器：注入 token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器：统一处理网络层错误
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg =
      error?.response?.data?.message ?? error?.message ?? '网络异常，请稍后重试'
    message.error(msg)
    return Promise.reject(error)
  },
)

/**
 * 统一请求方法：自动解包 res.data.data，业务层直接拿到 T。
 * 用法：const list = await request<Item[]>({ url: '/api/items' })
 */
export async function request<T = unknown>(
  config: AxiosRequestConfig,
): Promise<T> {
  const res = await instance.request<ApiResult<T>>(config)
  const body = res.data
  if (body.code !== 0 && body.code !== 200) {
    message.error(body.message || '请求出错')
    throw new Error(body.message || 'Request Error')
  }
  return body.data
}

export default instance
