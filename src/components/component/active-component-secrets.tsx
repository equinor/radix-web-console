import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { SecretTitle } from './secret-title';

import { SecretStatus } from '../secret-status';
import { RootState } from '../../init/store';
import { ConfigurationStatus } from '../../models/configuration-status';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/environment';
import { getComponentSecret, getEnvironment } from '../../state/environment';
import { getSecretUrl } from '../../utils/routing';

interface ActiveComponentSecretsData {
  environment?: EnvironmentModel;
}

export interface ActiveComponentSecretsProps
  extends ActiveComponentSecretsData {
  appName: string;
  envName: string;
  componentName: string;
  secrets?: Array<string>;
}

export const ActiveComponentSecrets = ({
  appName,
  envName,
  componentName,
  secrets,
  environment,
}: ActiveComponentSecretsProps): JSX.Element =>
  secrets.length > 0 ? (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={secrets.length !== 0}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Secrets
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <List className="o-indent-list">
            {secrets
              .map((name) => ({
                name: name,
                secret: getComponentSecret(environment, name, componentName),
              }))
              .map(({ name, secret }) => (
                <List.Item key={name}>
                  <div className="secret-item">
                    {secret.status !== ConfigurationStatus.External ? (
                      <Link
                        className="secret-item__link"
                        to={getSecretUrl(appName, envName, componentName, name)}
                      >
                        <Typography
                          link
                          as="span"
                          token={{ textDecoration: 'none' }}
                        >
                          <SecretTitle envSecret={secret} secretName={name} />
                        </Typography>
                      </Link>
                    ) : (
                      <Typography
                        link
                        as="span"
                        token={{ textDecoration: 'none' }}
                      >
                        <SecretTitle envSecret={secret} secretName={name} />
                      </Typography>
                    )}
                    <SecretStatus secret={secret} />
                  </div>
                </List.Item>
              ))}
          </List>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ) : (
    <Typography>This component has no secrets</Typography>
  );

ActiveComponentSecrets.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  secrets: PropTypes.arrayOf(PropTypes.string),
  environment: PropTypes.shape(EnvironmentModelValidationMap),
} as PropTypes.ValidationMap<ActiveComponentSecretsProps>;

const mapStateToProps = (state: RootState): ActiveComponentSecretsData => ({
  environment: getEnvironment(state),
});

export default connect(mapStateToProps)(ActiveComponentSecrets);
