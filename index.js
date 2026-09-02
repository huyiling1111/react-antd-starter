#!/usr/bin/env node
// 零依赖脚手架 CLI：拷贝 template/ 到目标目录，还原 dotfile，改写 package.json name。
// 用法：pnpm create react-antd-starter <目录名>   或   node index.js <目录名>
import {
  cp,
  rename,
  readFile,
  writeFile,
  readdir,
  mkdir,
} from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve, basename } from 'node:path'
import { createInterface } from 'node:readline/promises'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const templateDir = join(scriptDir, 'template')

// npm 发布时会剥离这些 dotfile，模板里以 _ 前缀保存，生成时还原
const DOTFILE_RENAMES = [
  ['_gitignore', '.gitignore'],
  ['_npmrc', '.npmrc'],
]

async function main() {
  let target = process.argv[2]
  if (!target) {
    const rl = createInterface({ input: process.stdin, output: process.stdout })
    target = (await rl.question('项目目录名 (project name): ')).trim()
    rl.close()
  }
  if (!target) {
    console.error(
      '✖ 需要一个项目目录名。用法：pnpm create react-antd-starter <目录名>',
    )
    process.exit(1)
  }

  const destDir = resolve(process.cwd(), target)
  const appName = basename(destDir)

  if (existsSync(destDir)) {
    const files = await readdir(destDir)
    if (files.length > 0) {
      console.error(`✖ 目录 "${target}" 已存在且非空，已中止。`)
      process.exit(1)
    }
  } else {
    await mkdir(destDir, { recursive: true })
  }

  await cp(templateDir, destDir, { recursive: true })

  for (const [from, to] of DOTFILE_RENAMES) {
    const fromPath = join(destDir, from)
    if (existsSync(fromPath)) await rename(fromPath, join(destDir, to))
  }

  // 用目录名覆盖生成项目的 package.json name
  const pkgPath = join(destDir, 'package.json')
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'))
  pkg.name = appName
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

  console.log(
    `\n✔ 已创建 ${target}\n\n后续步骤：\n  cd ${target}\n  pnpm install\n  pnpm dev\n`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
