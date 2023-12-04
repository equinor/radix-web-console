import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { DefaultAlias } from './default-alias';
import { DNSAliases } from './dns-aliases';

import { Alert } from '../alert';
import { ComponentIdentity } from '../component/component-identity';
import { ComponentPorts } from '../component/component-ports';
import { DockerImage } from '../docker-image';
import { ComponentStatusBadge } from '../status-badges';
import {
  ApplicationAliasModel,
  ApplicationAliasModelValidationMap,
} from '../../models/radix-api/applications/application-alias';
import { DNSAliasModel } from '../../models/radix-api/applications/dns-alias';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/radix-api/deployments/component';
import { ComponentStatus } from '../../models/radix-api/deployments/component-status';

import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/radix-api/deployments/deployment';
import './style.css';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

export interface OverviewProps {
  appAlias?: ApplicationAliasModel;
  dnsAliases?: DNSAliasModel[];
  envName: string;
  component: ComponentModel;
  deployment: DeploymentModel;
}

export const Overview: FunctionComponent<OverviewProps> = ({
  appAlias,
  dnsAliases,
  envName,
  component,
  deployment,
}) => (
  <div className="grid grid--gap-medium">
    <Typography variant="h4">Overview</Typography>

    {component.status === ComponentStatus.StoppedComponent && (
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
        {dnsAliases && (
          <DNSAliases
            dnsAliases={dnsAliases}
            componentName={component.name}
            envName={envName}
          />
        )}
        <ComponentPorts ports={component.ports} />
      </div>
    </div>
  </div>
);

Overview.propTypes = {
  appAlias: PropTypes.shape(
    ApplicationAliasModelValidationMap
  ) as PropTypes.Validator<ApplicationAliasModel>,
  envName: PropTypes.string.isRequired,
  component: PropTypes.shape(ComponentModelValidationMap)
    .isRequired as PropTypes.Validator<ComponentModel>,
  deployment: PropTypes.shape(DeploymentModelValidationMap)
    .isRequired as PropTypes.Validator<DeploymentModel>,
};
