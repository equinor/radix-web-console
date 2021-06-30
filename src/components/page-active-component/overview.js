import Alert from '../alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import DefaultAlias from './default-alias';
import DockerImage from '../docker-image';
import React from 'react';
import componentModel from '../../models/component';
import ComponentPorts from '../component/component-ports';
import PropTypes from 'prop-types';
import './style.css';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

const Overview = ({ appAlias, envName, component }) => {
  return (
    <React.Fragment>
      <h4>Overview</h4>
      <div className="env__overview">
        <div>
          <p className="body_short">
            Component <strong>{component.name}</strong>
          </p>
          {component.status === 'Stopped' && (
            <Alert>
              Component has been manually stopped; please note that a new
              deployment will cause it to be restarted unless you set
              <code>replicas</code> of the component to <code>0</code> in{' '}
              <a href="https://www.radix.equinor.com/docs/reference-radix-config/#replicas">
                radixconfig.yaml
              </a>
            </Alert>
          )}
          <p className="body_short">
            Image <DockerImage path={component.image} />
          </p>
        </div>
        <div>
          <p className="body_short">
            Status <strong>{component.status}</strong>
          </p>
          {component.variables[URL_VAR_NAME] && (
            <p className="body_short">
              Publicly available{' '}
              <a href={`https://${component.variables[URL_VAR_NAME]}`}>
                link <FontAwesomeIcon icon={faLink} size="lg" />
              </a>
            </p>
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
    </React.Fragment>
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
