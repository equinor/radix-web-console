import { Accordion, Typography } from '@equinor/eds-core-react';
import { FunctionComponent, useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  SecretComponent,
  GenericSecrets,
  TLSSecrets,
  VolumeMountSecrets,
  KeyVaultSecrets,
} from './secret-tables';

import { RootState } from '../../../init/store';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../../models/radix-api/environments/environment';
import { SecretModel } from '../../../models/radix-api/secrets/secret';
import { SecretStatus } from '../../../models/radix-api/secrets/secret-status';
import { SecretType } from '../../../models/radix-api/secrets/secret-type';
import {
  getComponentSecret,
  getMemoizedEnvironment,
} from '../../../state/environment';

type SecretTable = { title: string; Component: SecretComponent };
type SecretTableGroup = SecretTable & { types: Array<SecretType> };
type SecretTableItem = SecretTable & { secrets: Array<SecretModel> };

interface ActiveComponentSecretsState {
  environment?: EnvironmentModel;
}

export interface ActiveComponentSecretsProps
  extends ActiveComponentSecretsState {
  appName: string;
  envName: string;
  componentName: string;
  secretNames?: Array<string>;
}

const secretGrouping = Object.freeze<Array<SecretTableGroup>>([
  {
    title: 'Secrets',
    Component: GenericSecrets,
    types: [SecretType.SecretTypeGeneric],
  },
  {
    title: 'External DNS',
    Component: TLSSecrets,
    types: [SecretType.SecretTypeClientCert],
  },
  {
    title: 'TLS Client Certificate',
    Component: GenericSecrets,
    types: [SecretType.SecretTypeClientCertificateAuth],
  },
  {
    title: 'Volume Mounts',
    Component: VolumeMountSecrets,
    types: [
      SecretType.SecretTypeCsiAzureBlobVolume,
      SecretType.SecretTypeAzureBlobFuseVolume,
    ],
  },
  {
    title: 'Key Vaults',
    Component: KeyVaultSecrets,
    types: [
      SecretType.SecretTypeCsiAzureKeyVaultCreds,
      SecretType.SecretTypeCsiAzureKeyVaultItem,
    ],
  },
  {
    title: 'OAuth2',
    Component: GenericSecrets,
    types: [SecretType.SecretTypeOAuth2Proxy],
  },
]);

function groupSecrets(
  secrets: Array<SecretModel>,
  groups: Readonly<Array<SecretTableGroup>>
): Array<SecretTableItem> {
  const groupTypes = groups.flatMap(({ types }) => types);
  const grouped = groups.map<SecretTableItem>(({ types, ...rest }) => ({
    secrets: secrets.filter(({ type }) => types.includes(type)),
    ...rest,
  }));

  // add any non-grouped secrets to an ungrouped list
  const uncategorized = secrets.filter((x) => !groupTypes.includes(x.type));
  if (uncategorized.length > 0) {
    grouped.push({
      title: 'Uncategorized',
      Component: GenericSecrets,
      secrets: uncategorized,
    });
  }

  return grouped;
}

export const ActiveComponentSecrets: FunctionComponent<
  ActiveComponentSecretsProps
> = ({ componentName, secretNames, environment, ...rest }) => {
  const [secrets, setSecrets] = useState<Array<SecretTableItem>>([]);

  useEffect(() => {
    const componentSecrets = [
      ...(secretNames || [])
        .map((name) => getComponentSecret(environment, name, componentName))
        .filter((x) => !!x),
    ];

    setSecrets(groupSecrets(componentSecrets, secretGrouping));
  }, [secretNames, componentName, environment]);

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={secrets.length > 0}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Configuration Items (
              {secrets.reduce(
                (sum, { secrets }) => sum + (secrets?.length ?? 0),
                0
              )}
              )
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          {secrets.length > 0 ? (
            <div className="grid grid--gap-medium">
              {secrets.map(({ Component, title, secrets }, i) => (
                <Accordion key={i} chevronPosition="right">
                  <Accordion.Item
                    isExpanded={secrets.some(
                      (x) => x.status !== SecretStatus.Consistent
                    )}
                  >
                    <Accordion.Header>
                      <Accordion.HeaderTitle>
                        <Typography className="whitespace-nowrap" variant="h4">
                          {title || 'Secrets'} ({secrets.length})
                        </Typography>
                      </Accordion.HeaderTitle>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="grid">
                        <Component {...{ componentName, secrets }} {...rest} />
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              ))}
            </div>
          ) : (
            <Typography>This component has no secrets</Typography>
          )}
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

export default connect<ActiveComponentSecretsState, {}, {}, RootState>(
  (state) => ({ environment: { ...getMemoizedEnvironment(state) } })
)(ActiveComponentSecrets);
