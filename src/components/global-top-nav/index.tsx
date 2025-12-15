import { useAccount, useMsal } from '@azure/msal-react'
import { Button, Card, Icon, Popover, Tabs, TopBar, Typography } from '@equinor/eds-core-react'
import { account_circle, close, comment_discussion, info_circle, log_in, log_out, menu } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { forwardRef, type PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import { externalUrls } from '../../externalUrls'
import { routes } from '../../routes'
import { configVariables } from '../../utils/config'
import { HomeLogo } from '../home-logo'
import { radixApiConfig } from '../msal-auth-context/config'
import { StyledToastContainer } from './styled-toaster'

import './style.css'

export const GlobalTopNav = () => {
  const [menuIsClosed, setOpenMenu] = useState(false)
  const handleClick = () => setOpenMenu(!menuIsClosed)
  const radixClusterBase = configVariables.RADIX_CLUSTER_BASE
  const CLUSTERS = Object.entries(configVariables.CLUSTERS)

  return (
    <TopBar className="global-top-nav">
      <TopBar.Header className="home">
        <HomeLogo />
      </TopBar.Header>
      <TopBar.CustomContent>
        <Tabs>
          <Tabs.List className={menuIsClosed ? 'nav-links active' : 'nav-links'}>
            {CLUSTERS.map(([name, cluster]) => {
              const isDev = cluster.isDev && configVariables.RADIX_CLUSTER_TYPE !== 'development'
              const isActive = radixClusterBase === cluster.baseUrl
              if (isDev && !isActive) {
                return null
              }

              return (
                <TabItemTemplate href={cluster.href} mark={isActive} key={name}>
                  {name}
                </TabItemTemplate>
              )
            })}
            <TabItemTemplate href={externalUrls.documentation} mark={!radixClusterBase}>
              Documentation
            </TabItemTemplate>
          </Tabs.List>
        </Tabs>
      </TopBar.CustomContent>
      <TopBar.Actions className="nav-icon-links">
        <AboutButton />
        <FeedbackButton />
        <UserInfo />
        <div className="mobile-menu">
          <Button variant="ghost_icon" onClick={handleClick}>
            <Icon data={menuIsClosed ? close : menu} />
          </Button>
        </div>
      </TopBar.Actions>
      <StyledToastContainer />
    </TopBar>
  )

  function clusters() {
    return Object.entries(CLUSTERS)
  }
}

interface TabItemTemplateProps {
  href: string
  mark?: boolean
}

const TabItemTemplate = forwardRef<HTMLButtonElement, PropsWithChildren<TabItemTemplateProps>>(
  ({ href, mark, children }, ref) => (
    <Tabs.Tab className={clsx({ active: mark })} ref={ref}>
      <Button variant="ghost" href={href}>
        {children}
      </Button>
    </Tabs.Tab>
  )
)

const AboutButton = () => (
  <Button variant="ghost" as={Link} to={routes.about}>
    <Icon data={info_circle} />
  </Button>
)

const FeedbackButton = () => (
  <Button
    variant="ghost"
    className="feedback-button"
    href={'https://github.com/equinor/radix/issues'}
    target="_blank"
    rel="noopener noreferrer"
    title="Give us feedback"
  >
    <Icon data={comment_discussion} />
  </Button>
)

const UserInfo = () => {
  const { instance } = useMsal()
  const account = useAccount()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const signIn = async () => {
    await instance.loginRedirect({
      scopes: radixApiConfig.scopes,
      prompt: 'select_account',
    })
  }

  const signOut = async () => {
    await instance.logout({ account })
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
