import type { ReactNode } from 'react'
import styles from './PagePlaceholder.module.less'

/** 各占位页面共用容器。间距/配色走全局 Less 变量，改 variables.less 即全站生效。 */
export function PagePlaceholder({ children }: { children: ReactNode }) {
  return <div className={styles.placeholder}>{children}</div>
}
