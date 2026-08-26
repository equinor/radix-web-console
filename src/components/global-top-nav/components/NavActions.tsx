import { clsx } from 'clsx'
import { NAV_ACTIONS } from '../globalTopNav.const'
import { NavActionButton } from './NavActionButton'
import styles from './navActions.module.css'
import { UserInfo } from './UserInfo'

export const NavActions = () => (
  <>
    {NAV_ACTIONS.map((action) => (
      <NavActionButton
        key={action.id}
        action={action}
        compact
        className={clsx({ [styles.hideOnMobile]: action.showInMobileMenu })}
      />
    ))}
    <UserInfo />
  </>
)
