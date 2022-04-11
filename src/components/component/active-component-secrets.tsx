import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SecretStatus } from '../secret-status';
import { EnvironmentModelValidationMap } from '../../models/environment';
import { getComponentSecret, getEnvironment } from '../../state/environment';
import { getSecretUrl } from '../../utils/routing';
import { SecretTitle } from './secret-title';
import { ConfigurationStatus } from '../../models/configuration-status';

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
              {envSecret.status !== ConfigurationStatus.External ? (
                <Link
                  to={getSecretUrl(appName, envName, componentName, secretName)}
                >
                  <SecretTitle envSecret={envSecret} secretName={secretName} />
                </Link>
              ) : (
                <Typography as="span">
                  <SecretTitle envSecret={envSecret} secretName={secretName} />
                </Typography>
              )}
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
  environment: PropTypes.shape(EnvironmentModelValidationMap),
};

const mapStateToProps = (state) => ({
  environment: getEnvironment(state),
});

export default connect(mapStateToProps)(ActiveComponentSecrets);
