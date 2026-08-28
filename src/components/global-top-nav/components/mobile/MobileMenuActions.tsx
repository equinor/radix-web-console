import { log_in, log_out } from '@equinor/eds-icons'
import { useLocation } from 'react-router'
import { NAV_ACTIONS } from '../../globalTopNav.const'
import { useAuthActions } from '../../hooks/useAuthActions'
import { MobileMenuItem } from './MobileMenuItem'
import styles from './mobileMenu.module.css'

interface MobileMenuActionsProps {
  readonly onNavigate: () => void
}

// Same actions as the desktop bar, but shown with icon and full label.
export const MobileMenuActions = (props: MobileMenuActionsProps) => {
  const { onNavigate } = props
  const { account, signIn, signOut } = useAuthActions()

  const { pathname } = useLocation()

  const isActionActive = (to: string | undefined) => {
    return to?.startsWith('/') === true && pathname === to
  }

  return (
    <section className={styles.actions}>
      {NAV_ACTIONS.map((action) => (
        <MobileMenuItem
          key={action.id}
          icon={action.icon}
          to={action.isExternal ? undefined : action.href}
          href={action.isExternal ? action.href : undefined}
          onClick={onNavigate}
          active={isActionActive(action.isExternal ? undefined : action.href)}
        >
          {action.label}
        </MobileMenuItem>
      ))}
      <div className={styles.authActions}>
        <MobileMenuItem>
          <b>{account?.username}</b>
        </MobileMenuItem>
        <MobileMenuItem icon={log_in} onClick={() => signIn()}>
          Sign in with a different account
        </MobileMenuItem>
        <MobileMenuItem icon={log_out} onClick={() => signOut()}>
          Sign out
        </MobileMenuItem>
      </div>
    </section>
  )
}
