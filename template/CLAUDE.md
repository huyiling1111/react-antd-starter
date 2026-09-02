# 项目说明（React + antd 起手模板）

React 18 + TypeScript + Vite 的中后台前端起手模板。给 AI 的约定写在这里，会话自动加载。

## 技术栈

| 领域     | 选型                                                                             |
| -------- | -------------------------------------------------------------------------------- |
| 框架     | React 18.3 + react-router **v7**（`createBrowserRouter` 数据路由）               |
| 构建     | Vite 8（rolldown）+ `@vitejs/plugin-react` v6（**oxc 版，无 babel 选项**）       |
| UI       | antd **5.29.3** + `@ant-design/pro-components`（ProLayout）+ `@ant-design/icons` |
| 样式     | Less + CSS Modules；UnoCSS（presetWind3，`g-` 前缀）                             |
| 数据请求 | `@tanstack/react-query` v5 + axios 封装                                          |
| 状态     | zustand                                                                          |
| 工具库   | ahooks、dayjs                                                                    |
| Mock     | MSW（仅开发环境）                                                                |
| 规范     | ESLint 10 + Prettier + husky + lint-staged + commitlint                          |

## 常用命令

```bash
pnpm dev       # 启动开发（端口 5173，MSW 自动拦截接口）
pnpm build     # tsc -b 类型检查 + vite 构建
pnpm lint      # ESLint 全量检查
pnpm format    # Prettier 格式化
```

包管理器固定 **pnpm 11.25.0**，不要用 npm/yarn。

## 目录结构

```
src/
  App.tsx            # ProLayout 布局外壳（顶栏/侧栏/<Outlet/>）
  router.tsx         # 路由表；页面挂在 App 的 children 下
  main.tsx           # 入口：QueryClient、RouterProvider、MSW 启动
  pages/             # 页面组件（Home / Center / Edit）
  components/        # 可复用组件（Logo、PagePlaceholder…）
  store/             # zustand store（useUserStore）
  utils/request.ts   # axios 实例 + 统一 request<T>()
  mocks/             # MSW handlers（接口 Mock）
  styles/            # variables.less / global.less / theme.ts
uno.config.ts        # UnoCSS 配置
```

## 写 antd 组件前，先查 antd MCP

本项目通过 [.mcp.json](.mcp.json) 接入了 antd 官方 MCP（`@ant-design/cli mcp`）。涉及 antd 组件时**先查官方、再动手**，不要凭记忆写 props（antd 各版本 API 差异大）：

- 有哪些组件 / 选型 → `antd_list`
- props、类型、默认值 → `antd_info`
- 完整文档、注意事项 → `antd_doc`
- 官方推荐写法 / 复杂用法 → `antd_demo`（照示例结构写）
- 改组件内部结构的 className/style → `antd_semantic`
- 设计变量（主题色/圆角/间距）→ `antd_token`（工具名固定，此处指 antd 设计变量，勿与登录 token 混淆）
- 升级 / API 存疑 → `antd_changelog`

优先照 `antd_demo` 的官方示例写。表单、表格、弹窗等复杂交互一律先查 demo。

## 样式约定（Less + CSS Modules）

- **变量唯一数据源**：[src/styles/variables.less](src/styles/variables.less)（`@masterColor`、`@space-*`、`@radius-*`、`@textColor--*` 等）。Vite 的 `additionalData` 已把它自动注入每个 `.less`，直接写 `@变量` 即可，**无需手动 `@import`**。
- **组件样式**：写 `*.module.less`，`import styles from './x.module.less'` 后用 `className={styles.foo}`。伪类/嵌套/媒体查询都在 `.module.less` 里写。
- **JS/内联 style、UnoCSS 需要变量**：用 `var(--xxx)`——[src/styles/global.less](src/styles/global.less) 的 `:root` 已把 Less 变量镜像成 CSS 变量。`.less` 内部则直接 `@xxx`。
- **AntD / ProLayout / 侧栏配色**：集中在 [src/styles/theme.ts](src/styles/theme.ts)（JS 配置读不到 Less 变量，用字面量常量 `brand`/`white`/`whiteA`/`blackA`）。
- **改主色**：必须同时改 `variables.less` 的 `@masterColor` 和 `theme.ts` 的 `brand`。
- 不要用 styled-components（已移除；工具链是 oxc 版 plugin-react，无 babel 选项，装不了它的 babel 插件）。
- 快速原子样式可用 UnoCSS，注意**带 `g-` 前缀**（`g-mt-8`、`g-flex`）。

## 数据请求约定

- 组件里取数据用 **React Query**（`useQuery`/`useMutation`），不要在 `useEffect` 里手写 fetch。
- 实际请求走 [src/utils/request.ts](src/utils/request.ts) 的 `request<T>()`：已自动解包 `res.data.data`，业务层直接拿 `T`；`code` 非 `0/200` 会自动 `message.error` 并抛错。

  ```ts
  const { data } = useQuery({
    queryKey: ['items'],
    queryFn: () => request<Item[]>({ url: '/api/items' }),
  })
  ```

- 后端响应结构见 `ApiResult<T>`（`{ code, message, data }`）。
- 新接口的 Mock 加到 [src/mocks/handlers.ts](src/mocks/handlers.ts)，返回结构对齐 `ApiResult`。
- token 由 `request` 拦截器从 localStorage 读取；用户态在 [src/store/useUserStore.ts](src/store/useUserStore.ts)。

## 路由约定

- 路由表在 [src/router.tsx](src/router.tsx)，新页面加到 `App` 的 `children` 里；同时在 [src/App.tsx](src/App.tsx) 的 `route.routes` 加菜单项（`path` 即路由 `path`）。

## TypeScript / 代码规范

- `verbatimModuleSyntax` 已开：只用作类型的导入**必须** `import type { X }`，否则报错。
- `noUnusedLocals` / `noUnusedParameters` 已开：**不留未使用的变量/参数**（会直接编译报错，不是警告）。
- 路径别名 `@/` 指向 `src/`（`vite.config.ts` 与 `tsconfig.app.json` 两处，改动要同步）。
- 提交遵循 **Conventional Commits**（`feat:`/`fix:`/`refactor:` 等），commitlint 会校验；lint-staged 在提交时自动 `eslint --fix` + `prettier`。

## 改完自检

改 `.tsx`/`.ts` 后跑 `npx tsc -b` 确认类型通过（严格模式下未用变量、类型导入都会报错）。
