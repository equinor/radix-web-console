import { Typography } from '@equinor/eds-core-react'
import { AppListItemContainer } from '../app-list-item'
import CreateApplication from '../create-application'
import { LoadingCards } from './LoadingCards'

interface KnownApplication {
  readonly name: string
  readonly isFavourite?: boolean
}

interface KnownApplicationsListProps {
  readonly apps: KnownApplication[]
  readonly hasKnownApps: boolean
  readonly hasLoadedOnce: boolean
  readonly onToggleFavourite: (appName: string, isFavourite: boolean) => void
}

export const KnownApplicationsList = (props: KnownApplicationsListProps) => {
  const { apps, hasKnownApps, hasLoadedOnce, onToggleFavourite } = props

  if (hasKnownApps) {
    return (
      <div className="app-list__list">
        {apps.map((app) => (
          <AppListItemContainer
            key={app.name}
            appName={app.name}
            handler={(event) => {
              onToggleFavourite(app.name, !app.isFavourite)
              event.preventDefault()
            }}
            isFavorite={app.isFavourite}
            isLoading={false}
          />
        ))}
      </div>
    )
  }

  if (!hasLoadedOnce) {
    return <LoadingCards amount={6} />
  }

  return (
    <div className="app-list--empty">
      <Typography variant="h3">No applications yet</Typography>
      <Typography>Applications that you create (or have access to) appear here</Typography>
      <CreateApplication />
    </div>
  )
}
