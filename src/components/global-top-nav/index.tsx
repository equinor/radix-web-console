import {
  Button,
  Icon,
  Tabs,
  TopBar,
  Typography,
} from '@equinor/eds-core-react';
import { close, info_circle, menu } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import {
  type FunctionComponent,
  forwardRef,
  type PropsWithChildren,
  useState,
} from 'react';
import { clusterBases } from '../../clusterBases';
import { externalUrls } from '../../externalUrls';
import { routes } from '../../routes';
import { configVariables } from '../../utils/config';
import { HomeLogo } from '../home-logo';
import { StyledToastContainer } from './styled-toaster';

import './style.css';
import { Link } from 'react-router-dom';

interface TabItemTemplateProps {
  href: string;
  mark?: boolean;
}

const TabItemTemplate = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<TabItemTemplateProps>
>(({ href, mark, children }, ref) => (
  <Tabs.Tab className={clsx({ active: mark })} ref={ref}>
    <Button variant="ghost" href={href}>
      {children}
    </Button>
  </Tabs.Tab>
));

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
);

export const GlobalTopNav: FunctionComponent = () => {
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
              Platform (North Europe)
            </TabItemTemplate>
            <TabItemTemplate
              href={externalUrls.radixPlatform2WebConsole}
              mark={radixClusterBase === clusterBases.radixPlatform2WebConsole}
            >
              Platform 2 (West Europe)
            </TabItemTemplate>
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
