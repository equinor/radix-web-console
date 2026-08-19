import { clsx } from 'clsx'
import styles from '../environmentCard.module.css'

/**
 * Loading placeholder that mirrors the EnvironmentCard layout.
 */
export const EnvironmentCardSkeleton = () => (
  <div className={clsx('skeleton', styles.skeleton)}>
    <div className={clsx('wrapper', styles.environmentCard)}>
      <div className={clsx('wrapper', styles.header)}>
        <span className={clsx(styles.skeletonBar, styles.short)} />
        <div className={clsx('wrapper', styles.skeletonStatuses)}>
          <span className={styles.skeletonIcon} />
          <span className={styles.skeletonIcon} />
          <span className={styles.skeletonIcon} />
        </div>
      </div>
      <div className={clsx('wrapper', styles.body)}>
        <div className={clsx('wrapper', styles.skeletonSection)}>
          <span className={clsx(styles.skeletonBar, styles.caption)} />
          <div className={clsx('wrapper', styles.skeletonRow)}>
            <span className={styles.skeletonIcon} />
            <span className={clsx(styles.skeletonBar, styles.medium)} />
          </div>
          <div className={clsx('wrapper', styles.skeletonRow)}>
            <span className={styles.skeletonIcon} />
            <span className={clsx(styles.skeletonBar, styles.short)} />
          </div>
        </div>
        <div className={clsx('wrapper', styles.skeletonSection)}>
          <span className={clsx(styles.skeletonBar, styles.caption)} />
          <div className={clsx('wrapper', styles.skeletonRow)}>
            <span className={styles.skeletonIcon} />
            <span className={clsx(styles.skeletonBar, styles.medium)} />
          </div>
        </div>
        <div className={clsx('wrapper', styles.skeletonSection)}>
          <span className={clsx(styles.skeletonBar, styles.caption)} />
          <div className={clsx('wrapper', styles.skeletonRow)}>
            <span className={styles.skeletonIcon} />
            <span className={clsx(styles.skeletonBar, styles.medium)} />
          </div>
        </div>
      </div>
      <div className={clsx('wrapper', styles.footer)}>
        <span className={styles.skeletonButton} />
      </div>
    </div>
  </div>
)
