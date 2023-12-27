import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { ComponentReplicaList } from './component-replica-list';
import { ComponentReplicaLogAccordion } from './component-replica-log-accordion';
import { ComponentVulnerabilityDetails } from './component-vulnerability-details';
import { HorizontalScalingSummary } from './horizontal-scaling-summary';
import { OAuthService } from './oauth-service';
import { Overview } from './overview';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { ActiveComponentSecrets } from '../component/secrets/active-component-secrets';
import { Toolbar } from '../component/toolbar';
import { EnvironmentVariables } from '../environment-variables';
import { routes } from '../../routes';
import {
  useGetApplicationQuery,
  useGetEnvironmentQuery,
} from '../../store/radix-api';
import { getEnvsUrl } from '../../utils/routing';

import { routeWithParams } from '../../utils/string';
import './style.css';

export const ActiveComponentOverview: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
}> = ({ appName, envName, componentName }) => {
  const { data: application } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval: 15000 }
  );
  // import { getAppAlias, getDNSAlias } from '../../state/application';
  const { data: environment, ...envState } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval: 15000 }
  );

  const { appAlias } = application || {};
  const deployment = environment?.activeDeployment;
  const component = deployment?.components?.find(
    ({ name }) => name === componentName
  );

    const componentDNSAliases = dnsAliases?.filter(
      (dnsAlias) =>
        dnsAlias.componentName === componentName &&
        dnsAlias.environmentName == envName
    );

  return (
    <>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments', to: getEnvsUrl(appName) },
          {
            label: envName,
            to: routeWithParams(routes.appEnvironment, { appName, envName }),
          },
          { label: componentName },
        ]}
      />

      <AsyncResource asyncState={envState}>
        {component && (
          <>
            <Toolbar
              appName={appName}
              envName={envName}
              component={component}
              startEnabled
              stopEnabled
            />
            <Overview
              appAlias={appAlias}
                dnsAliases={componentDNSAliases}
              envName={envName}
              component={component}
              deployment={deployment}
            />

            <div className="grid grid--gap-large">
              <ComponentReplicaList
                title={'Replicas'}
                appName={appName}
                envName={envName}
                componentName={componentName}
                replicaList={component.replicaList}
                isExpanded
              />

              <ComponentReplicaLogAccordion
                title={'Replica Logs'}
                appName={appName}
                envName={envName}
                componentName={componentName}
              />

              {component.oauth2 && (
                <OAuthService
                  appName={appName}
                  envName={envName}
                  componentName={componentName}
                  oauth2={component.oauth2}
                />
              )}

              <ComponentVulnerabilityDetails
                appName={appName}
                envName={envName}
                componentName={componentName}
              />

              <ActiveComponentSecrets
                appName={appName}
                componentName={componentName}
                envName={envName}
                secretNames={component.secrets}
              />

              <EnvironmentVariables
                appName={appName}
                envName={envName}
                componentName={componentName}
                componentType={component.type}
              />

              {component.horizontalScalingSummary && (
                <HorizontalScalingSummary
                  {...component.horizontalScalingSummary}
                />
              )}
            </div>
          </>
        )}
      </AsyncResource>
    </>
  );
};

ActiveComponentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};
