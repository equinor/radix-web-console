import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { SecretListItem } from './secret-list-item';

import { RootState } from '../../../init/store';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../../models/environment';
import { SecretModel } from '../../../models/secret';
import {
  getComponentSecret,
  getMemoizedEnvironment,
} from '../../../state/environment';

interface ActiveComponentSecretsData {
  environment?: EnvironmentModel;
}

export interface ActiveComponentSecretsProps
  extends ActiveComponentSecretsData {
  appName: string;
  envName: string;
  componentName: string;
  secretNames?: Array<string>;
}

function buildSecrets(
  secretNames: Array<string>,
  componentName: string,
  environment?: EnvironmentModel
): Array<{ name: string; secret: SecretModel }> {
  return secretNames.map((name) => ({
    name: name,
    secret: getComponentSecret(environment, name, componentName),
  }));
}

export const ActiveComponentSecrets = function ({
  appName,
  envName,
  componentName,
  secretNames,
  environment,
}: ActiveComponentSecretsProps): JSX.Element {
  const [secrets, setSecrets] = useState(
    buildSecrets(secretNames, componentName, environment)
  );

  useEffect(
    () => setSecrets(buildSecrets(secretNames, componentName, environment)),
    [secretNames, componentName, environment]
  );

  return secretNames.length > 0 ? (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Secrets
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="secret-list">
            {secrets.map(({ name, secret }) => (
              <SecretListItem
                key={name}
                appName={appName}
                envName={envName}
                componentName={componentName}
                secret={secret}
              />
            ))}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ) : (
    <Typography>This component has no secrets</Typography>
  );
};

ActiveComponentSecrets.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  secretNames: PropTypes.arrayOf(PropTypes.string),
  environment: PropTypes.shape(EnvironmentModelValidationMap),
} as PropTypes.ValidationMap<ActiveComponentSecretsProps>;

function mapStateToProps(state: RootState): ActiveComponentSecretsData {
  return { environment: { ...getMemoizedEnvironment(state) } };
}

export default connect(mapStateToProps)(ActiveComponentSecrets);
