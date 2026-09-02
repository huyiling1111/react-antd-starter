import { create } from 'zustand'

interface UserInfo {
  name: string
}

interface UserState {
  token: string
  userInfo: UserInfo | null
  setToken: (token: string) => void
  setUserInfo: (info: UserInfo | null) => void
  logout: () => void
}

/** 用户态示例 store：token 同步到 localStorage，供请求拦截器读取 */
export const useUserStore = create<UserState>((set) => ({
  token: localStorage.getItem('token') ?? '',
  userInfo: null,
  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token })
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  logout: () => {
    localStorage.removeItem('token')
    set({ token: '', userInfo: null })
  },
}))
