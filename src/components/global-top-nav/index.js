import * as React from 'react';
import { TopBar, Tabs, Button, Icon } from '@equinor/eds-core-react';
import externalUrls from '../../externalUrls';
import { HomeLogo } from '../home-logo';
import routes from '../../routes';
import { keys as configKeys } from '../../utils/config/keys';
import configHandler from '../../utils/config';
import { info_circle, menu, close } from '@equinor/eds-icons';
import './style.css';

export const GlobalTopNav = () => {
  const [menuIsClosed, setOpenMenu] = React.useState(false);
  const handleClick = () => setOpenMenu(!menuIsClosed);
  const radixClusterType = configHandler.getConfig(
    configKeys.RADIX_CLUSTER_TYPE
  );
  return (
    <>
      <TopBar className="global-top-nav">
        <TopBar.Header className="home">
          <HomeLogo />
        </TopBar.Header>
        <Tabs.List className={menuIsClosed ? 'nav-links active' : 'nav-links'}>
          {radixClusterType === 'development' ? (
            <Tabs.Tab className="active">
              <Button variant="ghost" href={routes.home}>
                Development
              </Button>
            </Tabs.Tab>
          ) : (
            <></>
          )}
          <Tabs.Tab
            className={radixClusterType === 'playground' ? 'active' : ''}
          >
            <Button variant="ghost" href={externalUrls.playgroundWebConsole}>
              Playground
            </Button>
          </Tabs.Tab>
          <Tabs.Tab
            className={radixClusterType === 'production' ? 'active' : ''}
          >
            <Button variant="ghost" href={externalUrls.radixPlatformWebConsole}>
              Radix Platform
            </Button>
          </Tabs.Tab>
          <Tabs.Tab className={!radixClusterType ? 'active' : ''}>
            <Button variant="ghost" href={externalUrls.documentation}>
              Documentation
            </Button>
          </Tabs.Tab>
          <Tabs.Tab disabled className="icon-links">
            <Button variant="ghost_icon" href={routes.about}>
              <Icon data={info_circle} />
            </Button>
          </Tabs.Tab>
        </Tabs.List>
        <TopBar.Actions className="nav-icon-links">
          <Button variant="ghost_icon" href={routes.about}>
            <Icon data={info_circle} />
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
