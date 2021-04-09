import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const DefaultAlias = (props) => {
  const { appAlias, envName, componentName } = props;
  const isDefaultAlias =
    appAlias &&
    appAlias.componentName === componentName &&
    appAlias.environmentName === envName;
  return (
    <span>
      {isDefaultAlias && (
        <React.Fragment>
          This component is the application{' '}
          <a href={`https://${appAlias.url}`}>
            default alias <FontAwesomeIcon icon={faLink} size="lg" />
          </a>
        </React.Fragment>
      )}
    </span>
  );
};

DefaultAlias.propTypes = {
  appAlias: PropTypes.exact({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default DefaultAlias;
