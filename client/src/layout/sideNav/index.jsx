import React from 'react'
import styles from './styles.module.css'

const SideNav = () => {
  return (
    <div className={styles.sideNavContainer}>
      <div className={styles.sideNavHeader}><h1>QUIZZIE</h1></div>
      <div className={styles.sidenavOptions}>
        <div className={`${styles.options} ${styles.active}`}>Dashboard</div>
        <div className={styles.options}>Analytics</div>
        <div className={styles.options}>Create Quiz</div>
      </div>
      <div className={styles.sideNavFooter}>
        <hr />
        <div className={styles.options}>Log Out</div>
      </div>
    </div>
  )
}

export default SideNav