import { useAccount, useMsal } from '@azure/msal-react'
import { Button, Card, Icon, Popover, Tabs, TopBar, Typography } from '@equinor/eds-core-react'
import { account_circle, close, info_circle, log_in, log_out, menu } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { type FunctionComponent, forwardRef, type PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import { clusterBases } from '../../clusterBases'
import { externalUrls } from '../../externalUrls'
import { routes } from '../../routes'
import { configVariables } from '../../utils/config'
import { HomeLogo } from '../home-logo'
import { radixApiConfig } from '../msal-auth-context/config'
import { StyledToastContainer } from './styled-toaster'

import './style.css'

export const GlobalTopNav: FunctionComponent = () => {
  const [menuIsClosed, setOpenMenu] = useState(false)
  const handleClick = () => setOpenMenu(!menuIsClosed)
  const radixClusterBase = configVariables.RADIX_CLUSTER_BASE

  return (
    <TopBar className="global-top-nav">
      <TopBar.Header className="home">
        <HomeLogo />
      </TopBar.Header>
      <TopBar.CustomContent>
        <Tabs>
          <Tabs.List className={menuIsClosed ? 'nav-links active' : 'nav-links'}>
            {(configVariables.RADIX_CLUSTER_TYPE === 'development' && (
              <TabItemTemplate href={routes.home} mark>
                Development
              </TabItemTemplate>
            )) || <></>}
            <TabItemTemplate
              href={externalUrls.playgroundWebConsole}
              mark={radixClusterBase === clusterBases.playgroundWebConsole}
            >
              Playground
            </TabItemTemplate>
            <TabItemTemplate
              href={externalUrls.radixPlatformWebConsole}
              mark={radixClusterBase === clusterBases.radixPlatformWebConsole}
            >
              Platform (North Europe)
            </TabItemTemplate>
            <TabItemTemplate
              href={externalUrls.radixPlatform2WebConsole}
              mark={radixClusterBase === clusterBases.radixPlatform2WebConsole}
            >
              Platform 2 (West Europe)
            </TabItemTemplate>
            <TabItemTemplate href={externalUrls.documentation} mark={!radixClusterBase}>
              Documentation
            </TabItemTemplate>
          </Tabs.List>
        </Tabs>
      </TopBar.CustomContent>
      <TopBar.Actions className="nav-icon-links">
        <AboutButton />
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

const AboutButton: FunctionComponent = () => (
  <Typography
    link
    as={Link}
    to={routes.about}
    token={{
      color: 'var(--eds_interactive_primary__resting)',
      textDecoration: 'none',
    }}
  >
    <Icon data={info_circle} />
  </Typography>
)

const UserInfo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const account = useAccount()
  const msal = useMsal()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const signIn = async () => {
    await msal.instance.loginRedirect({
      scopes: radixApiConfig.scopes,
      prompt: 'select_account',
    })
  }

  const signOut = async () => {
    await msal.instance.logout()
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
