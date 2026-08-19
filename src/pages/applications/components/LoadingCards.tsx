import { AppListItem } from './app-list-item/AppListItem'

interface LoadingCardsProps {
  readonly amount: number
}

export const LoadingCards = (props: LoadingCardsProps) => {
  const { amount } = props
  const skeletonKeys = Array.from({ length: amount || 1 }, (_, index) => `app-list-skeleton-${index}`)

  return (
    <div className="app-list__list loading">
      {skeletonKeys.map((key) => (
        <AppListItem key={key} appName="" handler={() => {}} isPlaceholder />
      ))}
    </div>
  )
}
