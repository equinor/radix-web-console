import { Typography } from '@equinor/eds-core-react'
import CreateApplication from '../../../components/create-application'
import { AppListItem } from './app-list-item/AppListItem'
import styles from './applications.module.css'
import { LoadingCards } from './LoadingCards'

interface ApplicationListItem {
  readonly name: string
  readonly isFavorite?: boolean
}

interface AllApplicationsListProps {
  readonly apps: ApplicationListItem[]
  readonly hasLoadedOnce: boolean
  readonly setFavorite: (appName: string, isFavorite: boolean) => void
}

export const AllApplicationsList = (props: AllApplicationsListProps) => {
  const { apps, hasLoadedOnce, setFavorite } = props

  const noAppsAvailable = apps.length === 0 && hasLoadedOnce

  if (noAppsAvailable) {
    return (
      <div className={styles.empty}>
        <Typography variant="h3">No applications yet</Typography>
        <Typography>Applications that you create (or have access to) appear here</Typography>
        <CreateApplication />
      </div>
    )
  }

  if (!hasLoadedOnce) {
    return <LoadingCards amount={6} />
  }

  return (
    <div className={styles.list}>
      {apps.map((app) => (
        <AppListItem
          key={app.name}
          appName={app.name}
          handler={(event) => {
            setFavorite(app.name, !app.isFavorite)
            event.preventDefault()
          }}
          isFavorite={app.isFavorite}
        />
      ))}
    </div>
  )
}
