import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import { DefaultAlias } from './default-alias';

import { Alert } from '../alert';
import { ComponentIdentity } from '../component/component-identity';
import { ComponentPorts } from '../component/component-ports';
import { DockerImage } from '../docker-image';
import { ComponentStatusBadge } from '../status-badges';

import {
  type ApplicationAlias,
  type Component,
  type Deployment,
  type DnsAlias as DnsAliasModel,
  type ExternalDns,
  useResetScaledComponentMutation,
} from '../../store/radix-api';
import './style.css';
import { sleep } from '../../utils/sleep';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { ResourceRequirements } from '../resource-requirements';
import { Runtime } from '../runtime';
import { DNSAliases } from './dns-aliases';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

type Props = {
  appName: string;
  appAlias?: ApplicationAlias;
  dnsAliases?: DnsAliasModel[];
  dnsExternalAliases?: ExternalDns[];
  envName: string;
  component: Component;
  deployment: Deployment;
  refetch: () => unknown;
};
export const Overview = ({
  appName,
  appAlias,
  dnsAliases,
  dnsExternalAliases,
  envName,
  component,
  deployment,
  refetch,
}: Props) => {
  const dnsAliasUrls = dnsAliases ? dnsAliases.map((alias) => alias.url) : [];
  const dnsExternalAliasUrls = dnsExternalAliases
    ? dnsExternalAliases.map((alias) => alias.fqdn)
    : [];
  const [resetTrigger, { isLoading: isLoadingReset }] =
    useResetScaledComponentMutation();

  const isStopped = component.status == 'Stopped';
  const isManuallyStopped = component.replicasOverride === 0 && isStopped;
  const isManuallyScaled =
    component.replicasOverride != null && !isManuallyStopped;
  const isScaledDown = isStopped && !isManuallyStopped;

  const onReset = handlePromiseWithToast(async () => {
    await resetTrigger({
      appName,
      envName,
      componentName: component.name,
    }).unwrap();
    await sleep(1000);
    await refetch();
  });

  return (
    <div className="grid grid--gap-medium">
      {isManuallyStopped && (
        <Alert type={'warning'}>
          Component has been manually stopped; Click reset to resume regular
          scaling.
          <br />
          <Button
            variant="outlined"
            color="primary"
            disabled={isLoadingReset}
            onClick={onReset}
          >
            Reset
          </Button>
        </Alert>
      )}
      {isManuallyScaled && (
        <Alert type={'warning'}>
          Component has been manually scaled; Click reset to resume regular
          scaling.
          <br />
          <Button
            variant="outlined"
            color="primary"
            disabled={isLoadingReset}
            onClick={onReset}
          >
            Reset
          </Button>
        </Alert>
      )}
      {isScaledDown && <Alert>Component has been stopped by autoscaler.</Alert>}

      <Typography variant="h4">Overview</Typography>
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
