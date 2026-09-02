# React Admin Starter

React 18 + TypeScript + Vite 的中后台前端起手模板。

## 技术栈

- **框架**：React 18 + react-router v7（`createBrowserRouter` 数据路由）
- **构建**：Vite（rolldown）+ `@vitejs/plugin-react`
- **UI**：antd + `@ant-design/pro-components`（ProLayout）+ `@ant-design/icons`
- **样式**：Less + CSS Modules；UnoCSS（presetWind3，`g-` 前缀）
- **数据请求**：`@tanstack/react-query` + axios 封装
- **状态**：zustand
- **Mock**：MSW（仅开发环境）
- **规范**：ESLint + Prettier + husky + lint-staged + commitlint

## 快速开始

```bash
pnpm install
pnpm dev       # 开发（默认 5173，MSW 自动拦截接口）
```

## 常用命令

```bash
pnpm dev       # 启动开发
pnpm build     # tsc -b 类型检查 + vite 构建
pnpm preview   # 预览构建产物
pnpm lint      # ESLint 全量检查
pnpm format    # Prettier 格式化
```

## 目录结构

```
src/
  App.tsx            # ProLayout 布局外壳（顶栏/侧栏/<Outlet/>）
  router.tsx         # 路由表
  main.tsx           # 入口：QueryClient、RouterProvider、MSW 启动
  pages/             # 页面组件
  components/        # 可复用组件
  store/             # zustand store
  utils/request.ts   # axios 实例 + 统一 request<T>()
  mocks/             # MSW handlers（接口 Mock）
  styles/            # variables.less / global.less / theme.ts
```

## 约定

项目的样式、数据请求、路由、代码规范等约定集中写在 [CLAUDE.md](CLAUDE.md)，也作为 AI 协作的项目上下文。改主色、加页面、写 antd 组件前建议先看它。

> 本模板接入了 antd 官方 MCP（见 `.mcp.json`），配合支持 MCP 的编辑器可实时查询组件 API / 官方示例。
