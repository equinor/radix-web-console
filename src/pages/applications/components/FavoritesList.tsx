import { Typography } from '@equinor/eds-core-react'
import { AppListItemContainer } from '../../../components/app-list-item'
import type { FavoriteApplication } from '../hooks/useFavoriteApplications'

interface FavoritesListProps {
  readonly favoriteApplications: FavoriteApplication[]
  readonly isLoading: boolean
  readonly onRemoveFavorite: (appName: string) => void
}

export const FavoritesList = (props: FavoritesListProps) => {
  const { favoriteApplications, isLoading, onRemoveFavorite } = props

  if (favoriteApplications.length === 0) {
    return <Typography>No favorites</Typography>
  }

  return (
    <div className="grid grid--gap-medium app-list--section">
      <div className="app-list__list">
        {favoriteApplications.map(({ name, details, isDeleted }) => (
          <AppListItemContainer
            key={name}
            appName={name}
            isDeleted={isDeleted}
            environments={details?.environments}
            latestJob={details?.latestJob}
            handler={(event) => {
              onRemoveFavorite(name)
              event.preventDefault()
            }}
            isFavorite
            showStatus
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  )
}
