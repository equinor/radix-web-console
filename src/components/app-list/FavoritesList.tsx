import { Typography } from '@equinor/eds-core-react'

import type { ApplicationSummary } from '../../store/radix-api'
import { AppListItemContainer } from '../app-list-item'

interface FavoritesListProps {
  readonly favoriteNames: string[]
  readonly favoriteApps?: ApplicationSummary[]
  readonly isLoading: boolean
  readonly onRemoveFavorite: (appName: string) => void
}

export const FavoritesList = (props: FavoritesListProps) => {
  const { favoriteNames, favoriteApps, isLoading, onRemoveFavorite } = props

  if (favoriteNames.length === 0) {
    return <Typography>No favorites</Typography>
  }

  return (
    <div className="grid grid--gap-medium app-list--section">
      <div className="app-list__list">
        {favoriteNames.map((appName) => {
          const app = favoriteApps?.find((application) => application.name === appName)
          return (
            <AppListItemContainer
              key={appName}
              appName={appName}
              isDeleted={!app}
              environments={app?.environments}
              latestJob={app?.latestJob}
              handler={(event) => {
                onRemoveFavorite(appName)
                event.preventDefault()
              }}
              isFavorite
              showStatus
              isLoading={isLoading}
            />
          )
        })}
      </div>
    </div>
  )
}
