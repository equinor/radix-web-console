import { clsx } from 'clsx'
import { AppListItem } from './app-list-item/AppListItem'
import styles from './applications.module.css'

interface LoadingCardsProps {
  readonly amount: number
}

export const LoadingCards = (props: LoadingCardsProps) => {
  const { amount } = props
  const skeletonKeys = Array.from({ length: amount || 1 }, (_, index) => `app-list-skeleton-${index}`)

  return (
    <div className={clsx(styles.list, styles.loading)}>
      {skeletonKeys.map((key) => (
        <AppListItem key={key} appName="" handler={() => {}} isPlaceholder />
      ))}
    </div>
  )
}
