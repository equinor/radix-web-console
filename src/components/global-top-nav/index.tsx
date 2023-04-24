import { Button, Icon, Tabs, TopBar } from '@equinor/eds-core-react';
import { close, info_circle, menu } from '@equinor/eds-icons';
import { forwardRef, ReactNode, useState } from 'react';

import { StyledToastContainer } from './styled-toaster';

import { HomeLogo } from '../home-logo';
import { clusterBases } from '../../clusterBases';
import { externalUrls } from '../../externalUrls';
import { routes } from '../../routes';
import { configVariables } from '../../utils/config';

import './style.css';

interface TabItemTemplateProps {
  href: string;
  mark?: boolean;
  children?: ReactNode;
}

const TabItemTemplate = forwardRef<HTMLButtonElement, TabItemTemplateProps>(
  ({ href, mark, ...rest }, ref) => (
    <Tabs.Tab ref={ref} {...(mark && { className: 'active' })}>
      <Button variant="ghost" href={href}>
        {rest.children}
      </Button>
    </Tabs.Tab>
  )
);

const AboutButton = (): JSX.Element => (
  <Button variant="ghost_icon" href={routes.about}>
    <Icon data={info_circle} />
  </Button>
);

export const GlobalTopNav = (): JSX.Element => {
  const [menuIsClosed, setOpenMenu] = useState(false);
  const handleClick = () => setOpenMenu(!menuIsClosed);
  const radixClusterBase = configVariables.RADIX_CLUSTER_BASE;

  return (
    <TopBar className="global-top-nav">
      <TopBar.Header className="home">
        <HomeLogo />
      </TopBar.Header>
      <TopBar.CustomContent>
        <Tabs>
          <Tabs.List
            className={menuIsClosed ? 'nav-links active' : 'nav-links'}
          >
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
              Radix Platform
            </TabItemTemplate>
            {(radixClusterBase === clusterBases.radixPlatform2WebConsole && (
              <TabItemTemplate
                href={externalUrls.radixPlatform2WebConsole}
                mark
              >
                Radix Platform 2
              </TabItemTemplate>
            )) || <></>}
            <TabItemTemplate
              href={externalUrls.documentation}
              mark={!radixClusterBase}
            >
              Documentation
            </TabItemTemplate>
            <Tabs.Tab className="icon-links" disabled>
              <AboutButton />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </TopBar.CustomContent>
      <TopBar.Actions className="nav-icon-links">
        <AboutButton />
      </TopBar.Actions>
      <div className="mobile-menu">
        <Button variant="ghost_icon" onClick={handleClick}>
          <Icon data={menuIsClosed ? close : menu} />
        </Button>
      </div>
      <StyledToastContainer />
    </TopBar>
  );
};

export default GlobalTopNav;
