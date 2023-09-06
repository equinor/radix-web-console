import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { SecretListItem } from './secret-list-item';

import { RootState } from '../../../init/store';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../../models/radix-api/environments/environment';
import { SecretModel } from '../../../models/radix-api/secrets/secret';
import {
  getComponentSecret,
  getMemoizedEnvironment,
} from '../../../state/environment';
import { sortCompareString } from '../../../utils/sort-utils';
import { SecretType } from '../../../models/radix-api/secrets/secret-type';

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

export const ActiveComponentSecrets: FunctionComponent<
  ActiveComponentSecretsProps
> = ({ appName, envName, componentName, secretNames, environment }) => {
  const [secrets, setSecrets] = useState<Array<SecretModel>>([]);
  useEffect(() => {
    const componentSecrets = (secretNames || []).map((secretName) =>
      getComponentSecret(environment, secretName, componentName)
    );

    const sortedData = componentSecrets.sort((x, y) =>
      sortCompareString(x.name, y.name)
    );

    type GroupedSecretMap = Record<SecretType, Array<SecretModel>>;
    const groupedSecrets = sortedData.reduce<GroupedSecretMap>(
      (obj, secret) => {
        const key = secret.type || SecretType.SecretTypeGeneric;
        return { ...obj, ...{ [key]: [...obj[key], secret] } };
      },
      Object.values(SecretType)
        .sort((x, y) => sortCompareString(x, y))
        .reduce((obj, key) => ({ ...obj, [key]: [] }), {} as GroupedSecretMap)
    );

    const minimized = Object.keys(groupedSecrets).reduce<Array<SecretModel>>(
      (obj, key) => [...obj, ...groupedSecrets[key]],
      []
    );

    console.log('sortedData', sortedData);
    console.log('groupedSecrets', groupedSecrets);
    console.log('moshpit', minimized);

    setSecrets(minimized);
  }, [secretNames, componentName, environment]);

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={secretNames.length > 0}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Secrets ({secrets.length ?? '…'})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="secret-list">
            {secretNames.length > 0 ? (
              secrets.map((secret) => (
                <SecretListItem
                  key={secret.name}
                  appName={appName}
                  envName={envName}
                  componentName={componentName}
                  secret={secret}
                />
              ))
            ) : (
              <Typography>This component has no secrets</Typography>
            )}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ActiveComponentSecrets.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  secretNames: PropTypes.arrayOf(PropTypes.string),
  environment: PropTypes.shape(
    EnvironmentModelValidationMap
  ) as PropTypes.Validator<EnvironmentModel>,
};

function mapStateToProps(state: RootState): ActiveComponentSecretsData {
  return { environment: { ...getMemoizedEnvironment(state) } };
}

export default connect(mapStateToProps)(ActiveComponentSecrets);
