import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { close, type IconData, info_circle, warning_outlined } from '@equinor/eds-icons'
import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './banner.module.css'

type BannerVariant = 'info' | 'warning'

export interface BannerProps {
  /** Visual style of the banner. */
  variant?: BannerVariant
  /** Banner content. Compose with `Banner.Title`, `Banner.Message` and `Banner.Actions`. */
  children?: ReactNode
  /** When provided, a dismiss button is rendered and this is called when it is clicked. */
  onDismiss?: () => void
  className?: string
}

const bannerVariants: Record<BannerVariant, { className: string; icon: IconData }> = {
  warning: { className: styles.warning, icon: warning_outlined },
  info: { className: styles.info, icon: info_circle },
}

const BannerRoot = ({ className, variant = 'info', children, onDismiss }: BannerProps) => {
  const selectedVariant = bannerVariants[variant]

  return (
    <div className={clsx(styles.banner, selectedVariant.className, className)}>
      <Icon data={selectedVariant.icon} className={styles.icon} />
      <div className={styles.content}>{children}</div>
      {onDismiss && (
        <Button variant="ghost_icon" onClick={onDismiss} className={styles.closeButton} aria-label="Dismiss banner">
          <Icon data={close} />
        </Button>
      )}
    </div>
  )
}
BannerRoot.displayName = 'Banner'

export interface BannerTitleProps {
  children: ReactNode
}

/** Bold heading shown at the top of the banner. */
export const BannerTitle = ({ children }: BannerTitleProps) => (
  <Typography className={styles.title} variant="body_short_bold" group="paragraph" color="inherit">
    {children}
  </Typography>
)
BannerTitle.displayName = 'Banner.Title'

export interface BannerMessageProps {
  children: ReactNode
}

/** Body text of the banner. Can contain links and other inline elements. */
export const BannerMessage = ({ children }: BannerMessageProps) => (
  <Typography variant="body_short" color="inherit">
    {children}
  </Typography>
)
BannerMessage.displayName = 'Banner.Message'

export interface BannerActionsProps {
  children: ReactNode
}

/** Container for action buttons, rendered below the message. */
export const BannerActions = ({ children }: BannerActionsProps) => <div className={styles.actions}>{children}</div>
BannerActions.displayName = 'Banner.Actions'

/**
 * Composite component for displaying a banner.
 * This component mimics EDS 2.0 Banner component which doesn't seem to be ready yet.
 * https://storybook.eds.equinor.com/?path=/docs/eds-2-0-beta-feedback-banner--docs
 */
export const Banner = Object.assign(BannerRoot, {
  Title: BannerTitle,
  Message: BannerMessage,
  Actions: BannerActions,
})
