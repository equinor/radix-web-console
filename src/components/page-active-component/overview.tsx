import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { DefaultAlias } from './default-alias';
import { DnsAlias as DnsAliasComponent } from './dns-alias';

import { Alert } from '../alert';
import { ComponentIdentity } from '../component/component-identity';
import { ComponentPorts } from '../component/component-ports';
import { DockerImage } from '../docker-image';
import { ComponentStatusBadge } from '../status-badges';
import {
  ApplicationAlias,
  Component,
  Deployment,
  DnsAlias,
} from '../../store/radix-api';

import './style.css';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

export const Overview: FunctionComponent<{
  appAlias?: ApplicationAlias;
  dnsAliases?: DnsAlias[];
  envName: string;
  component: Component;
  deployment: Deployment;
}> = ({ appAlias, dnsAliases, envName, component, deployment }) => (
  <div className="grid grid--gap-medium">
    <Typography variant="h4">Overview</Typography>

    {component.status === 'Stopped' && (
      <Alert>
        Component has been manually stopped; please note that a new deployment
        will cause it to be restarted unless you set <code>replicas</code> of
        the component to <code>0</code> in{' '}
        <Typography
          link
          href="https://radix.equinor.com/references/reference-radix-config/#replicas"
        >
          radixconfig.yaml
        </Typography>
      </Alert>
    )}

    <div className="grid grid--gap-medium grid--overview-columns">
      <div className="grid grid--gap-medium">
        <Typography>
          Component <strong>{component.name}</strong>
        </Typography>
        <Typography>
          Image <DockerImage path={component.image} />
        </Typography>
        {component.identity && (
          <ComponentIdentity
            identity={component.identity}
            deployment={deployment}
          />
        )}
      </div>

      <div className="grid grid--gap-medium">
        <div className="grid grid--gap-small grid--auto-columns">
          <Typography>Status</Typography>
          <ComponentStatusBadge status={component.status} />
        </div>
        {component.variables?.[URL_VAR_NAME] && (
          <Typography>
            Publicly available{' '}
            <Typography
              link
              href={`https://${component.variables[URL_VAR_NAME]}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              link <Icon data={external_link} size={16} />
            </Typography>
          </Typography>
        )}
        {appAlias && (
          <DefaultAlias
            appAlias={appAlias}
            componentName={component.name}
            envName={envName}
          />
        )}
        {dnsAliases?.length > 0 && (
          <>
            <DnsAliasComponent dnsAliases={dnsAliases} />
          </>
        )}
        <ComponentPorts ports={component.ports} />
      </div>
    </div>
  </div>
);

Overview.propTypes = {
  appAlias: PropTypes.object as PropTypes.Validator<ApplicationAlias>,
  envName: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired as PropTypes.Validator<Component>,
  deployment: PropTypes.object.isRequired as PropTypes.Validator<Deployment>,
};
