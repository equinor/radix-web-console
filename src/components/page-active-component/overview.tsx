import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import { DefaultAlias } from './default-alias';

import { Alert } from '../alert';
import { ComponentIdentity } from '../component/component-identity';
import { ComponentPorts } from '../component/component-ports';
import { DockerImage } from '../docker-image';
import { ComponentStatusBadge } from '../status-badges';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';
import { ComponentStatus } from '../../models/component-status';
import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/deployment';

import './style.css';

const URL_VAR_NAME: string = 'RADIX_PUBLIC_DOMAIN_NAME';

export interface OverviewProps {
  appAlias?: {
    componentName: string;
    environmentName: string;
    url: string;
  };
  envName: string;
  component: ComponentModel;
  deployment: DeploymentModel;
}

export const Overview = ({
  appAlias,
  envName,
  component,
  deployment,
}: OverviewProps): JSX.Element => (
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
        <ComponentIdentity component={component} deployment={deployment} />
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
        <ComponentPorts ports={component.ports} />
      </div>
    </div>
  </div>
);

Overview.propTypes = {
  appAlias: PropTypes.shape({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  envName: PropTypes.string.isRequired,
  component: PropTypes.shape(ComponentModelValidationMap).isRequired,
  deployment: PropTypes.shape(DeploymentModelValidationMap).isRequired,
} as PropTypes.ValidationMap<OverviewProps>;
