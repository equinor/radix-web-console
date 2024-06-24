import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { DefaultAlias } from './default-alias';

import { Alert } from '../alert';
import { ComponentIdentity } from '../component/component-identity';
import { ComponentPorts } from '../component/component-ports';
import { DockerImage } from '../docker-image';
import { ComponentStatusBadge } from '../status-badges';

import {
  ApplicationAlias,
  Component,
  Deployment,
  DnsAlias as DnsAliasModel,
  ExternalDns,
} from '../../store/radix-api';
import './style.css';
import { DNSAliases } from './dns-aliases';
import { ResourceRequirements } from '../resource-requirements';
import { externalUrls } from '../../externalUrls';
import { Runtime } from '../runtime';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

export const Overview: FunctionComponent<{
  appAlias?: ApplicationAlias;
  dnsAliases?: DnsAliasModel[];
  dnsExternalAliases?: ExternalDns[];
  envName: string;
  component: Component;
  deployment: Deployment;
}> = ({
  appAlias,
  dnsAliases,
  dnsExternalAliases,
  envName,
  component,
  deployment,
}) => {
  const dnsAliasUrls = dnsAliases ? dnsAliases.map((alias) => alias.url) : [];
  const dnsExternalAliasUrls = dnsExternalAliases
    ? dnsExternalAliases.map((alias) => alias.fqdn)
    : [];

  const isStopped = component.status == 'Stopped';
  const isScaledDown =
    component.horizontalScalingSummary?.desiredReplicas === 0 && isStopped;

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h4">Overview</Typography>

      {isStopped && !isScaledDown && (
        <Alert>
          Component has been manually stopped; please note that a new deployment
          will cause it to be restarted unless you set <code>replicas</code> of
          the component to <code>0</code> in{' '}
          <Typography
            link
            href={new URL('#replicas', externalUrls.referenceRadixConfig)}
          >
            radixconfig.yaml
          </Typography>
        </Alert>
      )}
      {isScaledDown && <Alert>Component has been stopped by autoscaler.</Alert>}

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
          {dnsAliasUrls?.length > 0 && (
            <DNSAliases urls={dnsAliasUrls} title={'DNS aliases'} />
          )}
          {dnsExternalAliasUrls?.length > 0 && (
            <DNSAliases
              urls={dnsExternalAliasUrls}
              title={'DNS external aliases'}
            />
          )}
          <ComponentPorts ports={component.ports} />
          {component.resources && (
            <div className="grid grid--gap-medium">
              <ResourceRequirements resources={component.resources} />
            </div>
          )}
          {component.runtime && (
            <div className="grid grid--gap-medium">
              <Runtime runtime={component.runtime!} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  appAlias: PropTypes.object as PropTypes.Validator<ApplicationAlias>,
  dnsExternalAliases: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ExternalDns>
  ),
  envName: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired as PropTypes.Validator<Component>,
  deployment: PropTypes.object.isRequired as PropTypes.Validator<Deployment>,
};
