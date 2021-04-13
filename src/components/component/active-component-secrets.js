import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import SecretStatus from '../secret-status';
import React from 'react';
import { getEnvironment, getComponentSecret } from '../../state/environment';
import { connect } from 'react-redux';
import environmentModel from '../../models/environment';

const ActiveComponentSecrets = ({
  appName,
  envName,
  componentName,
  secrets,
  environment,
}) => {
  return (
    <React.Fragment>
      <h2 className="o-heading-section">Secrets</h2>
      {secrets.length === 0 && <p>This component uses no secrets</p>}
      {secrets.length > 0 && (
        <ul className="o-indent-list">
          {secrets.map((secretName) => {
            let envSecret = getComponentSecret(
              environment,
              secretName,
              componentName
            );
            return (
              <li key={secretName}>
                <Link
                  to={routing.getSecretUrl(
                    appName,
                    envName,
                    componentName,
                    secretName
                  )}
                >
                  {secretName}
                </Link>{' '}
                <SecretStatus secret={envSecret} />
              </li>
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

ActiveComponentSecrets.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  secrets: PropTypes.arrayOf(PropTypes.string),
  environment: PropTypes.shape(environmentModel),
};

const mapStateToProps = (state) => ({
  environment: getEnvironment(state),
});

export default connect(mapStateToProps)(ActiveComponentSecrets);
