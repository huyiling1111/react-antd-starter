# create-react-antd-starter

React 18 + TypeScript + Vite 的中后台前端起手模板脚手架。

技术栈：React 18 · react-router v7 · Vite（rolldown）· antd + pro-components · react-query · zustand · MSW · Less + CSS Modules · UnoCSS · ESLint/Prettier/husky/commitlint，并接入 antd 官方 MCP。

## 使用

发布到 npm 之后：

```bash
pnpm create react-antd-starter my-app
# 或
npm create react-antd-starter my-app
```

然后：

```bash
cd my-app
pnpm install
pnpm dev
```

CLI 会把 `template/` 拷贝到 `my-app/`，还原 `.gitignore` / `.npmrc`，并把生成项目的 `package.json` 的 `name` 改成目录名。

### 尚未发布 npm 时

在本仓库根目录直接跑，或用 `pnpm dlx`：

```bash
node index.js my-app                 # 本地
pnpm dlx github:huyiling1111/react-antd-starter my-app   # 从（私有仓需已配置访问）GitHub 直接跑
```

## 发布到 npm（维护者）

```bash
npm login                                   # 首次发布前登录
npm view create-react-antd-starter version  # 查包名是否被占用（报 404 = 可用）
# 每次发布前记得升 package.json 的 version（npm 不允许重复版本号）
npm publish --access public                 # 非 scoped 包本就是公开的，加该参数最稳妥
```

发布后任何人都能 `pnpm create react-antd-starter <目录名>`。

> 若包名已被占用，可改成 scoped 包名（如 `@huyiling1111/create-react-antd-starter`），
> 对应 `pnpm create @huyiling1111/react-antd-starter <目录名>`。

## 结构

```
create-react-antd-starter/
  index.js       # 零依赖脚手架 CLI
  package.json   # bin + files:["index.js","template"]
  template/      # 脚手架本体（生成到用户项目）
  PLAN.md        # 建立与发布方案存档
```

> 模板里的 dotfile 以 `_gitignore` / `_npmrc` 保存（npm 发布会剥离真名 dotfile），由 CLI 生成时还原。
