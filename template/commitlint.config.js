/**
 * 提交信息规范（Conventional Commits）
 * 格式：<type>(<scope>): <subject>，例如 feat(edit): 新增题目拖拽排序
 * 常用 type：feat 新功能 / fix 修复 / docs 文档 / style 格式 / refactor 重构 /
 *            perf 性能 / test 测试 / build 构建 / ci / chore 杂项 / revert 回滚
 */
export default {
  extends: ['@commitlint/config-conventional'],
}
