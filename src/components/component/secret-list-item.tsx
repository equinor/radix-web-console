import * as PropTypes from 'prop-types';

import { SecretModel, SecretModelValidationMap } from '../../models/secret';
import { SecretType } from '../../models/secret-type';
import { Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { getSecretUrl } from '../../utils/routing';
import SecretStatus from '../secret-status';
import { SecretListItemTitle } from './secret-list-item-title';
import { SecretListItemTitleCsiAzureKeyVaultItem } from './secret-list-item-title-csi-azure-key-vault-item';

export const SecretListItem = ({
  appName,
  envName,
  componentName,
  secret,
}: {
  appName: string;
  envName: string;
  componentName: string;
  secretName: string;
  secret: SecretModel;
}): JSX.Element => (
  <div className="secret-item">
    {secret.type === SecretType.SecretTypeCsiAzureKeyVaultItem ? (
      <SecretListItemTitleCsiAzureKeyVaultItem secret={secret} />
    ) : (
      <Link
        className="secret-item__link"
        to={getSecretUrl(appName, envName, componentName, secret.name)}
      >
        <Typography link as="span" token={{ textDecoration: 'none' }}>
          <SecretListItemTitle secret={secret} />
        </Typography>
      </Link>
    )}
    <SecretStatus secret={secret} />
  </div>
);

SecretListItem.propTypes = {
  secret: PropTypes.shape(SecretModelValidationMap).isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<{
  appName: string;
  envName: string;
  componentName: string;
  secret: SecretModel;
}>;
