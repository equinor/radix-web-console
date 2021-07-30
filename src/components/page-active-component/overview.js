import Alert from '../alert';
import DefaultAlias from './default-alias';
import DockerImage from '../docker-image';
import React from 'react';
import componentModel from '../../models/component';
import ComponentPorts from '../component/component-ports';
import PropTypes from 'prop-types';
import './style.css';
import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

const Overview = ({ appAlias, envName, component }) => {
  return (
    <div className="component__overview">
      <Typography variant="h4">Overview</Typography>
      {component.status === 'Stopped' && (
        <Alert>
          Component has been manually stopped; please note that a new deployment
          will cause it to be restarted unless you set <code>replicas</code> of
          the component to <code>0</code> in{' '}
          <a href="https://www.radix.equinor.com/docs/reference-radix-config/#replicas">
            radixconfig.yaml
          </a>
        </Alert>
      )}
      <div>
        <div>
          <Typography variant="body_short">
            Component <strong>{component.name}</strong>
          </Typography>
          <Typography variant="body_short">
            Image <DockerImage path={component.image} />
          </Typography>
        </div>
        <div>
          <Typography variant="body_short">
            Status <strong>{component.status}</strong>
          </Typography>
          {component.variables[URL_VAR_NAME] && (
            <Typography variant="body_short">
              Publicly available{' '}
              <a
                href={`https://${component.variables[URL_VAR_NAME]}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                link <Icon data={external_link} size="16" />
              </a>
            </Typography>
          )}
          {appAlias && (
            <DefaultAlias
              appAlias={appAlias}
              componentName={component.Name}
              envName={envName}
            ></DefaultAlias>
          )}
          <ComponentPorts ports={component.ports} />
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  appAlias: PropTypes.exact({
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  envName: PropTypes.string.isRequired,
  component: PropTypes.shape(componentModel),
};

export default Overview;
