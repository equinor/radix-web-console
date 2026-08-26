import { Button, Icon } from '@equinor/eds-core-react'
import { log_in, log_out } from '@equinor/eds-icons'
import { NAV_ACTIONS } from '../../globalTopNav.const'
import { useAuthActions } from '../../hooks/useAuthActions'
import { NavActionButton } from '../NavActionButton'
import styles from './mobileMenuActions.module.css'

interface MobileMenuActionsProps {
  onNavigate: () => void
}

// Same actions as the desktop bar, but shown with icon and full label.
export const MobileMenuActions = (props: MobileMenuActionsProps) => {
  const { onNavigate } = props
  const { signIn, signOut } = useAuthActions()
  const mobileActions = NAV_ACTIONS.filter((action) => action.showInMobileMenu)

  return (
    <section className={styles.actions}>
      {mobileActions.map((action) => (
        <NavActionButton key={action.id} action={action} onClick={onNavigate} />
      ))}
      <div className={styles.authActions}>
        <Button variant="ghost" onClick={() => signIn()}>
          <Icon data={log_in} />
          Sign in with a different account
        </Button>
        <Button variant="ghost" onClick={() => signOut()}>
          <Icon data={log_out} />
          Sign out
        </Button>
      </div>
    </section>
  )
}
