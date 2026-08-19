import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { star_filled, star_outlined } from '@equinor/eds-icons'
import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import { AppBadge } from '../../../../components/app-badge'
import { routes } from '../../../../router/routes'
import { routeWithParams } from '../../../../utils/string'

import styles from './appListItem.module.css'
import { AppListItemSkeleton } from './components/AppListItemSkeleton'
import { AppListItemStatus } from './components/AppListItemStatus'

export interface AppListItemProps {
  appName: string
  handler: (event: MouseEvent<HTMLButtonElement>, name: string) => void
  isFavorite?: boolean
  isPlaceholder?: boolean
  /** Optional status slot, typically an `<AppListItemStatus />` supplied by `AppListItemContainer`. */
  children?: ReactNode
}

const AppListItemRoot = (props: AppListItemProps) => {
  const { appName, handler, isFavorite, isPlaceholder, children } = props

  if (isPlaceholder) {
    return <AppListItemSkeleton />
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
            <div className={styles.detailsFavourite}>
              <Button variant="ghost_icon" onClick={(e) => handler(e, appName)}>
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

export const AppListItem = Object.assign(AppListItemRoot, {
  Statuses: AppListItemStatus,
})
