import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import PropTypes from 'prop-types';

import DefaultAlias from './default-alias';

import { Alert } from '../alert';
import ComponentPorts from '../component/component-ports';
import DockerImage from '../docker-image';
import { StatusBadge } from '../status-badge';
import componentModel from '../../models/component';

import './style.css';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

const Overview = ({ appAlias, envName, component }) => (
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
      </div>
      <div className="grid grid--gap-medium">
        <div className="component-status">
          <Typography>Status</Typography>
          <StatusBadge type={component.status}>{component.status}</StatusBadge>
        </div>
        {component.variables[URL_VAR_NAME] && (
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
  appAlias: PropTypes.exact({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  envName: PropTypes.string.isRequired,
  component: PropTypes.shape(componentModel),
};

export default Overview;
