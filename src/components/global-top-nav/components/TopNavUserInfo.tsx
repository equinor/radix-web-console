import { Button, Card, Icon, Popover, Typography } from '@equinor/eds-core-react'
import { account_circle, log_in, log_out } from '@equinor/eds-icons'
import { useState } from 'react'
import { useAuthActions } from '../hooks/useAuthActions'

export const TopNavUserInfo = () => {
  const { account, signIn, signOut } = useAuthActions()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <Button
        variant="ghost"
        ref={setAnchorEl}
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="menu-default"
      >
        {account?.username}
        <Icon data={account_circle} />
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
