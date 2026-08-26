import { useAccount, useMsal } from '@azure/msal-react'
import { Button, Card, Icon, Popover, Tabs, TopBar, Typography } from '@equinor/eds-core-react'
import {
  account_circle,
  chevron_left,
  chevron_right,
  close,
  comment_discussion,
  info_circle,
  library_books,
  log_in,
  log_out,
  menu,
} from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { type ReactNode, useState } from 'react'
import { Link } from 'react-router'
import { externalUrls } from '../../externalUrls'
import { routes } from '../../router/routes'
import { configVariables } from '../../utils/config'
import { HomeLogo } from '../home-logo'
import { radixApiConfig } from '../msal-auth-context/config'
import { StyledToastContainer } from './styled-toaster'
import { useHorizontalScroll } from './use-horizontal-scroll'

import './style.css'

const DOCUMENTATION_TAB_VALUE = 'documentation'

export const GlobalTopNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const radixClusterBase = configVariables.RADIX_DNS_ZONE
  const CLUSTERS = Object.entries(configVariables.CLUSTERS)

  const activeCluster = CLUSTERS.find(([, cluster]) => cluster.baseUrl === radixClusterBase)
  const activeTabValue = activeCluster ? activeCluster[0] : DOCUMENTATION_TAB_VALUE

  const { scrollContainerRef, scrollBy, isStartReached, isEndReached, canScroll } = useHorizontalScroll()

  return (
    <TopBar className="global-top-nav">
      <TopBar.Header className="home">
        <HomeLogo />
      </TopBar.Header>
      <TopBar.CustomContent className="tabs-cell">
        <div className="tabs-wrapper">
          {canScroll && (
            <Button
              className="tab-scroll-button"
              variant="ghost_icon"
              onClick={() => scrollBy('left')}
              aria-hidden="true"
              tabIndex={-1}
              disabled={isStartReached}
            >
              <Icon data={chevron_left} />
            </Button>
          )}
          <Tabs className="tabs-scroll-area" activeTab={activeTabValue} scrollable>
            <Tabs.List className={clsx('nav-links', { 'mobile-menu-open': isMobileMenuOpen })} ref={scrollContainerRef}>
              {CLUSTERS.map(([name, cluster]) => {
                const isDev = cluster.isDev && configVariables.RADIX_CLUSTER_TYPE !== 'development'
                const isActive = radixClusterBase === cluster.baseUrl
                if (isDev && !isActive) {
                  return null
                }

                return (
                  <TabItemTemplate href={cluster.href} value={name} key={name}>
                    {name}
                  </TabItemTemplate>
                )
              })}
            </Tabs.List>
          </Tabs>
          {canScroll && (
            <Button
              className="tab-scroll-button"
              variant="ghost_icon"
              onClick={() => scrollBy('right')}
              aria-hidden="true"
              tabIndex={-1}
              disabled={isEndReached}
            >
              <Icon data={chevron_right} />
            </Button>
          )}
        </div>
      </TopBar.CustomContent>
      <TopBar.Actions className="nav-icon-links">
        <DocumentationButton />
        <AboutButton />
        <FeedbackButton />
        <UserInfo />
        <div className="mobile-menu">
          <Button variant="ghost_icon" onClick={toggleMobileMenu}>
            <Icon data={isMobileMenuOpen ? close : menu} />
          </Button>
        </div>
      </TopBar.Actions>
      <StyledToastContainer />
    </TopBar>
  )
}

interface TabItemTemplateProps {
  href: string
  value: string
  children: ReactNode
}

const TabItemTemplate = ({ href, value, children, ...injectedTabProps }: TabItemTemplateProps) => (
  <Tabs.Tab as={Link} to={href} value={value} {...injectedTabProps}>
    {children}
  </Tabs.Tab>
)

const AboutButton = () => (
  <Button variant="ghost" as={Link} to={routes.about}>
    <Icon data={info_circle} />
    About
  </Button>
)

const DocumentationButton = () => (
  <Button variant="ghost" as={Link} to={externalUrls.documentation} target="_blank" rel="noopener noreferrer">
    <Icon data={library_books} />
    Docs
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
    Feedback
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
    await instance.logoutRedirect({ account, idTokenHint: account?.idToken })
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
