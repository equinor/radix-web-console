import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { DefaultAlias } from './default-alias';

import { ComponentIdentity } from '../component/component-identity';
import { ComponentPorts } from '../component/component-ports';
import { DockerImage } from '../docker-image';
import { ComponentStatusBadge } from '../status-badges';

import type {
  ApplicationAlias,
  Component,
  Deployment,
  DnsAlias as DnsAliasModel,
  ExternalDns,
} from '../../store/radix-api';
import './style.css';
import { IngressAllowList } from '../component/ingress-allow-list';
import { ExternalLink } from '../link/external-link';
import { ResourceRequirements } from '../resource-requirements';
import { Runtime } from '../runtime';
import { DNSAliases } from './dns-aliases';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

type Props = {
  appAlias?: ApplicationAlias;
  dnsAliases?: DnsAliasModel[];
  dnsExternalAliases?: ExternalDns[];
  envName: string;
  component: Component;
  deployment?: Deployment;
};
export const Overview = ({
  appAlias,
  dnsAliases,
  dnsExternalAliases,
  envName,
  component,
  deployment,
}: Props) => {
  const dnsAliasUrls = dnsAliases ? dnsAliases.map((alias) => alias.url) : [];
  const dnsExternalAliasUrls = dnsExternalAliases
    ? dnsExternalAliases.map((alias) => alias.fqdn)
    : [];

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h4">Overview</Typography>
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <Typography>
            Component <strong>{component.name}</strong>
          </Typography>
          <Typography>
            Image <DockerImage path={component.image} />
          </Typography>
          {component.identity && deployment && (
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
              <ExternalLink
                href={`https://${component.variables[URL_VAR_NAME]}`}
              >
                link
              </ExternalLink>
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
          {component.ports?.some(({ isPublic }) => isPublic) && (
            <IngressAllowList
              allowedIpRanges={component.network?.ingress?.public?.allow}
            />
          )}
          <ComponentPorts ports={component.ports ?? []} />
          {component.runtime && (
            <div className="grid grid--gap-medium">
              <Runtime runtime={component.runtime!} />
            </div>
          )}
          {component.resources && (
            <div className="grid grid--gap-medium">
              <ResourceRequirements resources={component.resources} />
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
