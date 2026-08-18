import { AppListItemContainer } from '../../../components/app-list-item'

interface LoadingCardsProps {
  readonly amount: number
}

export const LoadingCards = (props: LoadingCardsProps) => {
  const { amount } = props
  return (
    <div className="app-list__list loading">
      {[...Array(amount || 1)].map((_, index) => (
        <AppListItemContainer
          key={index}
          appName={''}
          handler={(event) => event.preventDefault()}
          isPlaceholder
          isLoading={false}
        />
      ))}
    </div>
  )
}
