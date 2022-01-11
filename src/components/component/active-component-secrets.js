import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import SecretStatus from '../secret-status';
import React from 'react';
import { getEnvironment, getComponentSecret } from '../../state/environment';
import { connect } from 'react-redux';
import environmentModel from '../../models/environment';
import { List, Typography } from '@equinor/eds-core-react';

const ActiveComponentSecrets = ({
  appName,
  envName,
  componentName,
  secrets,
  environment,
}) => {
  return (
    <React.Fragment>
      <Typography variant="h4">Secrets</Typography>
      {secrets.length === 0 && (
        <Typography variant="body_short">
          This component uses no secrets
        </Typography>
      )}
      {secrets.length > 0 && (
        <List className="o-indent-list secrets">
          {secrets.map((secretName) => {
            let envSecret = getComponentSecret(
              environment,
              secretName,
              componentName
            );
            return (
              <List.Item key={secretName}>
                {envSecret.status !== 'External' && (
                  <Link
                    to={routing.getSecretUrl(
                      appName,
                      envName,
                      componentName,
                      secretName
                    )}
                  >
                    <Typography link as="span">
                      {secretName}
                    </Typography>
                  </Link>
                )}
                {envSecret.status === 'External' && (
                  <Typography as="span">{secretName}</Typography>
                )}{' '}
                {envSecret.resource && (
                  <Typography italic as="span">
                    {envSecret.resource}
                  </Typography>
                )}{' '}
                {envSecret.displayName &&
                  envSecret.displayName !== secretName && (
                    <Typography as="span">{envSecret.displayName}</Typography>
                  )}{' '}
                <SecretStatus secret={envSecret} />
              </List.Item>
            );
          })}
        </List>
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
