import * as React from 'react';
import { TopBar, Tabs, Button, Icon } from '@equinor/eds-core-react';
import externalUrls from '../../externalUrls';
import HomeLogo from '../home-logo';
import {
  info_circle,
  notifications,
  accessible,
  account_circle,
} from '@equinor/eds-icons';
import './style.css';
// TODO: Make responsive.
export const GlobalTopNav = () => {
  return (
    <>
      <TopBar className="global-top-nav">
        <TopBar.Header>
          <HomeLogo />
        </TopBar.Header>
        <Tabs.List style={{ display: 'block', textAlign: 'center' }}>
          <a href={externalUrls.playgroundWebConsole}>
            <Tabs.Tab active>Playground</Tabs.Tab>
          </a>
          <a href={externalUrls.radixPlatformWebConsole}>
            <Tabs.Tab>Radix Platform</Tabs.Tab>
          </a>
          <a href={externalUrls.documentation}>
            <Tabs.Tab>Documentation</Tabs.Tab>
          </a>
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
      </TopBar>
    </>
  );
};

export default GlobalTopNav;
