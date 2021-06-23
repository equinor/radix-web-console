import * as React from 'react';
import { TopBar, Tabs, Button, Icon } from '@equinor/eds-core-react';
import externalUrls from '../../externalUrls';
import HomeLogo from '../home-logo';
import {
  info_circle,
  notifications,
  accessible,
  account_circle,
  menu,
  close,
} from '@equinor/eds-icons';
import './style.css';
// TODO: Make responsive.
export const GlobalTopNav = () => {
  const [menuIsClosed, setOpenMenu] = React.useState(false);
  const handleClick = () => setOpenMenu(!menuIsClosed);
  return (
    <>
      <TopBar className="global-top-nav">
        <TopBar.Header>
          <HomeLogo />
        </TopBar.Header>
        <Tabs.List className={menuIsClosed ? 'nav-links active' : 'nav-links'}>
          <a href={externalUrls.playgroundWebConsole}>
            <Tabs.Tab active>Playground</Tabs.Tab>
          </a>
          <a href={externalUrls.radixPlatformWebConsole}>
            <Tabs.Tab>Radix Platform</Tabs.Tab>
          </a>
          <a href={externalUrls.documentation}>
            <Tabs.Tab>Documentation</Tabs.Tab>
          </a>
          <div className="mobile-icon-links">
            <Button variant="ghost_icon">
              <Icon data={info_circle} />
            </Button>
            <Button variant="ghost_icon">
              <Icon data={notifications} />
            </Button>
            <Button variant="ghost_icon">
              <Icon data={accessible} />
            </Button>
            <Button variant="ghost_icon">
              <Icon data={account_circle} />
            </Button>
          </div>
        </Tabs.List>
        <TopBar.Actions className="nav-icon-links">
          <Button variant="ghost_icon">
            <Icon data={info_circle} />
          </Button>
          <Button variant="ghost_icon">
            <Icon data={notifications} />
          </Button>
          <Button variant="ghost_icon">
            <Icon data={accessible} />
          </Button>
          <Button variant="ghost_icon">
            <Icon data={account_circle} />
          </Button>
        </TopBar.Actions>
        {menuIsClosed && (
          <div className="mobile-menu">
            <Button variant="ghost_icon" onClick={handleClick}>
              <Icon data={close} />
            </Button>
          </div>
        )}
        {!menuIsClosed && (
          <div className="mobile-menu">
            <Button variant="ghost_icon" onClick={handleClick}>
              <Icon data={menu} />
            </Button>
          </div>
        )}
      </TopBar>
    </>
  );
};

export default GlobalTopNav;
