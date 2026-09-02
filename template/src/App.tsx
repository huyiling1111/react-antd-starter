import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { ProLayout } from '@ant-design/pro-components'
import { App as AntApp, Badge, ConfigProvider, Dropdown, Tooltip } from 'antd'
import type { MenuProps } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {
  AppstoreOutlined,
  BellOutlined,
  FontSizeOutlined,
  FormOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Logo } from './components/Logo'
import { antdTheme, proLayoutTheme, white, whiteA } from './styles/theme'

const FONT_SCALES = [0.9, 1, 1.15]

/** ProLayout 菜单数据：三个一级菜单，key 即路由 path */
const route = {
  path: '/',
  routes: [
    { path: '/', name: '列表页', icon: <UnorderedListOutlined /> },
    { path: '/center', name: '工作台', icon: <AppstoreOutlined /> },
    { path: '/edit', name: '表单页', icon: <FormOutlined /> },
  ],
}

const avatarMenuItems: MenuProps['items'] = [
  { key: 'profile', icon: <UserOutlined />, label: '个人中心' },
  { type: 'divider' },
  { key: 'logout', icon: <LogoutOutlined />, label: '退出登录' },
]

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [fontLevel, setFontLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen()
  }

  // 内联 style 用 CSS 变量引用全局色（由 global.less 的 :root 镜像自 Less 变量）
  const actionIconStyle: CSSProperties = {
    fontSize: 18,
    color: 'var(--text-second)',
  }

  return (
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <AntApp>
        <ProLayout
          title="React Admin Starter"
          logo={<Logo size={28} />}
          layout="mix"
          splitMenus={false}
          fixSiderbar
          fixedHeader
          siderWidth={220}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          collapsedButtonRender={false}
          route={route}
          location={{ pathname }}
          token={proLayoutTheme}
          menuItemRender={(item, dom) => (
            <a onClick={() => item.path && navigate(item.path)}>{dom}</a>
          )}
          menuExtraRender={({ collapsed }) =>
            collapsed ? null : (
              <div style={{ padding: '4px 4px 8px' }}>
                <div
                  style={{
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: whiteA[65],
                    marginBottom: 8,
                  }}
                >
                  Your Company
                </div>
                <button
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12,
                    color: white,
                    background: whiteA[12],
                    border: 'none',
                    borderRadius: 6,
                    padding: '4px 10px',
                    cursor: 'pointer',
                  }}
                >
                  <SwapOutlined /> 切换团队
                </button>
              </div>
            )
          }
          menuFooterRender={() => (
            <div
              onClick={() => setCollapsed((v) => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: 8,
                padding: '10px 4px',
                cursor: 'pointer',
                color: whiteA[65],
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              {!collapsed && <span style={{ fontSize: 13 }}>收起菜单</span>}
            </div>
          )}
          avatarProps={{
            icon: <UserOutlined />,
            size: 'small',
            title: '管理员',
            render: (_, dom) => (
              <Dropdown
                menu={{ items: avatarMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                {dom}
              </Dropdown>
            ),
          }}
          actionsRender={() => [
            <Tooltip
              key="fullscreen"
              title={isFullscreen ? '退出全屏' : '全屏'}
            >
              <span style={{ cursor: 'pointer' }} onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <FullscreenExitOutlined style={actionIconStyle} />
                ) : (
                  <FullscreenOutlined style={actionIconStyle} />
                )}
              </span>
            </Tooltip>,
            <Tooltip key="font" title="切换字号">
              <span
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setFontLevel((v) => (v + 1) % FONT_SCALES.length)
                }
              >
                <FontSizeOutlined style={actionIconStyle} />
              </span>
            </Tooltip>,
            <Tooltip key="bell" title="通知">
              <Badge count={1} size="small">
                <BellOutlined style={actionIconStyle} />
              </Badge>
            </Tooltip>,
          ]}
          contentStyle={{ fontSize: `calc(14px * ${FONT_SCALES[fontLevel]})` }}
        >
          <Outlet />
        </ProLayout>
      </AntApp>
    </ConfigProvider>
  )
}

export default App
