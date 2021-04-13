import Alert from '../alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import DefaultAlias from './default-alias';
import DockerImage from '../docker-image';
import React from 'react';
import componentModel from '../../models/component';
import PropTypes from 'prop-types';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

const Overview = ({ appAlias, envName, component }) => {
  return (
    <React.Fragment>
      <h2 className="o-heading-section">Overview</h2>
      <p>
        Component <strong>{component.name}</strong>
      </p>
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
      <p>
        Status <strong>{component.status}</strong>
      </p>
      {component.variables[URL_VAR_NAME] && (
        <p>
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
      <p>
        Image <DockerImage path={component.image} />
      </p>
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
