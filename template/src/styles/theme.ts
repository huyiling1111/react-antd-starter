// AntD / ProLayout 的主题色（JS 配置读不到 Less 变量，颜色统一集中在此）。
// 主色 brand 需与 src/styles/variables.less 的 @masterColor 保持一致。

// —— 基础色 ——
export const brand = '#2b6cff' // = @masterColor
export const white = '#ffffff'
const pageBg = '#f5f5f5' // = @pageColor
const headerTitle = '#1f2329' // 顶栏标题色
const iconText = '#5b6b7c' // 顶栏图标/次要文字
const siderBg = '#001529' // 深色侧边栏底色

// 深色侧边栏用的白色透明度层级（数字即不透明度百分比）
export const whiteA = {
  6: 'rgba(255, 255, 255, 0.06)',
  8: 'rgba(255, 255, 255, 0.08)',
  12: 'rgba(255, 255, 255, 0.12)',
  65: 'rgba(255, 255, 255, 0.65)',
  75: 'rgba(255, 255, 255, 0.75)',
}
// 黑色透明度层级
const blackA = {
  4: 'rgba(0, 0, 0, 0.04)',
  45: 'rgba(0, 0, 0, 0.45)',
}

// —— 对外导出 ——

/** ConfigProvider 全局主题 */
export const antdTheme = {
  token: {
    colorPrimary: brand,
    borderRadius: 8, // = @radius-md
    colorBgLayout: pageBg,
  },
}

/** ProLayout 顶栏 / 侧边栏配色（传给 ProLayout 的 token prop） */
export const proLayoutTheme = {
  header: {
    colorBgHeader: white,
    colorHeaderTitle: headerTitle,
    colorTextRightActionsItem: iconText,
    colorBgRightActionsItemHover: blackA[4],
  },
  sider: {
    colorMenuBackground: siderBg,
    colorMenuItemDivider: whiteA[6],
    colorBgMenuItemHover: whiteA[8],
    colorBgMenuItemSelected: brand,
    colorTextMenuSelected: white,
    colorTextMenuItemHover: white,
    colorTextMenuActive: white,
    colorTextMenu: whiteA[75],
    colorTextMenuSecondary: whiteA[65],
    colorTextMenuTitle: white,
    colorBgCollapsedButton: white,
    colorTextCollapsedButton: blackA[45],
    colorTextCollapsedButtonHover: brand,
  },
}
