# create-react-antd-starter 建立与发布方案

## Context

本脚手架抽取自一个内部中后台项目的**工程骨架**（React18 + TS + Vite8 + antd5/pro-components + react-query + zustand + MSW + UnoCSS + husky/commitlint + antd MCP 接入），做成通用起手模板，最终以「脚手架命令」拉取。

已确认的决策：
- **交付方式**：`create-*` 包模式（`pnpm create react-antd-starter my-app`）——先建好 CLI 结构并推到私有仓，`npm publish` 之后再执行（说明已写在 README）。
- **仓库可见性**：私有。
- **内容处理**：完全脱敏，去掉原产品品牌、公司名、业务文案、作者个人信息、内部 Git 远端，做成纯净通用模板。
- **建库方式**：在浏览器建**空的私有仓库**，再 `git remote add` + push。

**关键约束**：源项目是内部在用、远端指向内部 Git 的**真实产品仓库**，绝不能原地改造/重指向远端。改造在**独立目录**完成，源仓库保持原样。

## 目标产物

一个独立的 create-* 包仓库（create-vite 同款布局）：

```
react-antd-starter/            # 私有 GitHub，全新 git 历史
  index.js                     # 零依赖 CLI：拷贝 template/ → 目标目录、还原 dotfile、改名、提示 next steps
  package.json                 # name: "create-react-antd-starter"，bin，files:["index.js","template"]
  README.md                    # 用法（pnpm create …）+ 如何 npm publish
  PLAN.md                      # 本方案存档（不列入 npm files，不进 template/）
  LICENSE                      # MIT
  template/                    # 脱敏后的脚手架本体
    _gitignore  _npmrc         # 由 CLI 还原为 .gitignore / .npmrc（npm 发布会剥离真名 dotfile）
    package.json  index.html  vite.config.ts  tsconfig*.json  uno.config.ts
    eslint.config.js  .prettierrc.json  commitlint.config.js  .husky/  .env.*
    .mcp.json  skills-lock.json  .agents/  CLAUDE.md
    public/  src/
```

## 实施步骤

### 1. 建独立构建目录（不动源仓库）
- 新目录在源项目目录之外，标示为独立开源件。
- 用 `git archive HEAD | tar -x` 从源项目导出已跟踪文件到 `template/`（天然排除 `.git`/`node_modules`/`dist`/gitignored 内容）。

### 2. 脱敏
删除业务/内部件：产品设计稿、内部依赖文档（含本机路径等）。

替换/清理专属字符串，代表位置：
- `uno.config.ts` 顶部 header 注释（含作者姓名 + 邮箱）→ 删除
- `src/App.tsx` — 站点标题、公司名、业务菜单名、机构切换、角色文案 → 通用占位
- `src/components/Logo.tsx` — 品牌相关注释与图形 → 中性占位 logo
- `src/pages/*`、`src/mocks/handlers.ts`、`src/utils/request.ts` 的 JSDoc — 业务文案与旧接口路径 → 通用资源（`/api/items`、示例数据）
- `index.html` `<title>` → 通用
- `package.json` — `name` 设占位（CLI 生成时按目标目录名覆盖）；补 `description`、`license: MIT`
- `CLAUDE.md` — 业务名 → 通用脚手架说明；示例接口 → 通用（保留 MCP/样式/请求等约定，这些是模板卖点）

保留（通用）：全部构建/规范配置、`src/styles/*`、`request.ts`、store、`.mcp.json` + skills（antd MCP 工具，模板亮点）。

### 3. 改造成 create-* 布局
- 脱敏后内容搬进 `template/`。
- npm 会剥离的 dotfile：`.gitignore` → `_gitignore`、`.npmrc` → `_npmrc`（CLI 里还原）。
- 新建根 `package.json`（`name:"create-react-antd-starter"`、`type:"module"`、`bin`、`files:["index.js","template"]`、`engines.node>=18`）。
- 新建根 `index.js`（零依赖 ESM，`#!/usr/bin/env node`）：取 `process.argv[2]` 作目标目录名（缺省用 `node:readline/promises` 提示）；`fs.cp(templateDir, dest, {recursive:true})`；还原 dotfile；改写 `dest/package.json` 的 `name`；打印 `cd / pnpm install / pnpm dev`。
- 新建根 `README.md`、`LICENSE`（MIT），把本方案存为根 `PLAN.md`（不进 `template/`、不列入 `files`，故不进 npm 包，也不带进生成的项目）。
- `template/README.md` 描述生成项目的技术栈。

### 4. 本地验证（推之前）
- `node index.js demo-app` → 确认生成、dotfile 还原、`package.json name` 已改。
- `cd demo-app && pnpm install && pnpm build`（`tsc -b` + vite）通过；`pnpm dev` 能起。
- 清理 demo-app。

### 5. 初始化历史并推送
- 在脚手架目录：`git init -b main` → `git add -A` → 首个提交（全新干净历史）。
- 拿到浏览器新建的空私有仓地址 → `git remote add origin <url>` → `git push -u origin main`。
- 源仓库全程不动。

### 6. npm 发布（延后，写说明不执行）
- README 写清：`npm login` → 确认包名未被占用 → `npm publish --access public` → 之后 `pnpm create react-antd-starter <目录名>` 全局可用。

## 验证方式
1. `node index.js demo-app` 成功生成项目，dotfile/包名正确。
2. 生成项目 `pnpm install && pnpm build` 通过、`pnpm dev` 可起。
3. 仓库无原品牌/公司/个人敏感串，无内部 Git 远端。
4. 源仓库远端与工作区未受影响。
