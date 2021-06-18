import * as React from 'react';
import { TopBar, Tabs, Button, Icon } from '@equinor/eds-core-react';
import externalUrls from '../../externalUrls';
import HomeLogo from '../home-logo';
import routes from '../../routes';
import { NavLink } from 'react-router-dom';
import { urlToMonitoring } from '../../utils/monitoring';
import {
  info_circle,
  notifications,
  accessible,
  account_circle,
} from '@equinor/eds-icons';
import './style.css';

export const GlobalTopNav = () => {
  return (
    <>
      <TopBar className="global-top-nav">
        <TopBar.Header>
          <HomeLogo />
        </TopBar.Header>
        <Tabs.List style={{ display: 'block', textAlign: 'center' }}>
          <Tabs.Tab active>
            <a href={externalUrls.playgroundWebConsole}>Playground</a>
          </Tabs.Tab>
          <Tabs.Tab>
            <a href={externalUrls.radixPlatformWebConsole}>Radix Platform</a>
          </Tabs.Tab>
          <Tabs.Tab>
            <a href={externalUrls.documentation}>Documentation</a>
          </Tabs.Tab>
        </Tabs.List>
        <TopBar.Actions className="nav-icon-links">
          <Button variant="ghost_icon" href={routes.about}>
            <Icon data={info_circle} />
          </Button>
          <Button variant="ghost_icon" href={externalUrls.documentation}>
            <Icon data={notifications} />
          </Button>
          <Button variant="ghost_icon" href={externalUrls.community}>
            <Icon data={accessible} />
          </Button>
          <Button variant="ghost_icon" href={urlToMonitoring()}>
            <Icon data={account_circle} />
          </Button>
        </TopBar.Actions>
      </TopBar>
    </>
  );
};

export default GlobalTopNav;
