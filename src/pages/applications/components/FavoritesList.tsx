import { Typography } from '@equinor/eds-core-react'
import { clsx } from 'clsx'
import type { FavoriteApplication } from '../hooks/useFavoriteApplications'
import { AppListItemWithStatuses } from './app-list-item/AppListItemWithStatuses'
import styles from './applications.module.css'

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
    <div className={clsx('grid grid--gap-medium', styles.section)}>
      <div className={styles.list}>
        {favoriteApplications.map(({ name, details, isDeleted }) => (
          <AppListItemWithStatuses
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
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  )
}
