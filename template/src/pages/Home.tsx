import styles from './Home.module.less'

function Home() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        列表页
        <span className={styles.badge}>示例</span>
      </h3>
      <p className={styles.desc}>这里是列表页的占位内容。</p>
    </div>
  )
}

export default Home
