import { clsx } from 'clsx'
import styles from '../appListItem.module.css'

/**
 * Loading placeholder that mirrors the AppListItem layout.
 *
 * @internal Skeleton should only be used in AppListItem, do not use it directly in other components. Use AppListItem with isPlaceholder prop instead.
 */
export const AppListItemSkeleton = () => (
  <div className={clsx('skeleton', styles.skeleton)}>
    <div className={clsx('wrapper', styles.skeletonItem)}>
      <span className={styles.icon} />
      <div className={clsx('wrapper', styles.skeletonDetails)}>
        <span className={clsx(styles.bar, styles.title)} />
      </div>
    </div>
  </div>
)
