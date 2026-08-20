import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { star_filled, star_outlined } from '@equinor/eds-icons'
import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import { AppBadge } from '../../../../components/app-badge'
import { routes } from '../../../../router/routes'
import { routeWithParams } from '../../../../utils/string'

import styles from './appListItem.module.css'
import { AppListItemSkeleton } from './components/AppListItemSkeleton'

export interface AppListItemProps {
  readonly appName: string
  readonly onToggleFavorite: (event: MouseEvent<HTMLButtonElement>) => void
  readonly isFavorite?: boolean
  readonly isPlaceholder?: boolean
  /** Optional status slot, typically an `<AppListItemStatus />` supplied by `AppListItemWithStatuses`. */
  readonly children?: ReactNode
}

export const AppListItem = (props: AppListItemProps) => {
  const { appName, onToggleFavorite, isFavorite, isPlaceholder, children } = props

  if (isPlaceholder) {
    return <AppListItemSkeleton />
  }

  const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onToggleFavorite(event)
  }

  return (
    <Link className={styles.appListItem} to={routeWithParams(routes.app, { appName })}>
      <div className={styles.area}>
        <div>
          <AppBadge appName={appName} size={40} />
        </div>
        <div className="grid">
          <div className={styles.details}>
            <Typography className={styles.detailsTitle} variant="h6">
              {appName}
            </Typography>
            <div className={styles.detailsFavorite}>
              <Button variant="ghost_icon" onClick={handleToggleFavorite}>
                <Icon data={isFavorite ? star_filled : star_outlined} />
              </Button>
            </div>
          </div>

          {children}
        </div>
      </div>
    </Link>
  )
}
