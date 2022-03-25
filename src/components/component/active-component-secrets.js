import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { SecretStatus } from '../secret-status';
import environmentModel from '../../models/environment';
import { getSecretUrl } from '../../utils/routing';
import { getComponentSecret, getEnvironment } from '../../state/environment';

const ActiveComponentSecrets = ({
  appName,
  envName,
  componentName,
  secrets,
  environment,
}) => (
  <>
    <Typography variant="h4">Secrets</Typography>
    {secrets.length > 0 ? (
      <List className="o-indent-list secrets">
        {secrets.map((secretName) => {
          const envSecret = getComponentSecret(
            environment,
            secretName,
            componentName
          );
          return (
            <List.Item key={secretName}>
              {envSecret.status !== 'External' ? (
                <Link
                  to={getSecretUrl(appName, envName, componentName, secretName)}
                >
                  <Typography link as="span">
                    {secretName}
                  </Typography>
                </Link>
              ) : (
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
    ) : (
      <Typography>This component uses no secrets</Typography>
    )}
  </>
);

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
