import { Button, Card, Icon, Popover, Typography } from '@equinor/eds-core-react'
import { account_circle, log_in, log_out } from '@equinor/eds-icons'
import { useState } from 'react'
import { useAuthActions } from '../hooks/useAuthActions'
import styles from './topNavUserInfo.module.css'

export const TopNavUserInfo = () => {
  const { account, signIn, signOut } = useAuthActions()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const getUsernameWithoutDomain = (username?: string): string => username?.split('@')[0] ?? ''

  return (
    <>
      <Button
        className={styles.topNavUserInfo}
        variant="ghost"
        ref={setAnchorEl}
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="menu-default"
      >
        <Icon data={account_circle} />
        {getUsernameWithoutDomain(account?.username)}
      </Button>
      <Popover open={isOpen} anchorEl={anchorEl} placement="bottom-end" onClose={toggleMenu}>
        <Card>
          <Card.Header>
            <Icon data={account_circle} size={40} />
            <Card.HeaderTitle>
              <Typography variant="h4">{account?.username}</Typography>
              <Typography variant="body_short">{account?.name}</Typography>
            </Card.HeaderTitle>
          </Card.Header>
          <Card.Actions>
            <Button onClick={() => signIn()}>
              <Icon data={log_in} />
              Sign in with a different account
            </Button>
            <Button onClick={() => signOut()} variant="outlined">
              <Icon data={log_out} />
              Sign out
            </Button>
          </Card.Actions>
        </Card>
      </Popover>
    </>
  )
}
