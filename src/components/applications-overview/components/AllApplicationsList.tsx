import { Typography } from '@equinor/eds-core-react'
import { AppListItemContainer } from '../../app-list-item'
import CreateApplication from '../../create-application'
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
      <div className="app-list--empty">
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
    <div className="app-list__list">
      {apps.map((app) => (
        <AppListItemContainer
          key={app.name}
          appName={app.name}
          handler={(event) => {
            setFavorite(app.name, !app.isFavorite)
            event.preventDefault()
          }}
          isFavorite={app.isFavorite}
          isLoading={false}
        />
      ))}
    </div>
  )
}
