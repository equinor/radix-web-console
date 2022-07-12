import * as PropTypes from 'prop-types';
import { Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';

import { SecretModel, SecretModelValidationMap } from '../../../models/secret';
import { SecretType } from '../../../models/secret-type';
import { getSecretUrl } from '../../../utils/routing';
import { SecretListItemTitle } from './secret-list-item-title';
import { SecretListItemTitleAzureKeyVaultItem } from './secret-list-item-title-azure-key-vault-item';
import { ComponentSecretStatusBadge } from '../../status-badges';

export const SecretListItem = ({
  appName,
  envName,
  componentName,
  secret,
}: {
  appName: string;
  envName: string;
  componentName: string;
  secret: SecretModel;
}): JSX.Element => (
  <div className="secret-item">
    {secret.type === SecretType.SecretTypeCsiAzureKeyVaultItem ? (
      <SecretListItemTitleAzureKeyVaultItem
        appName={appName}
        envName={envName}
        componentName={componentName}
        secret={secret}
      />
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
    <ComponentSecretStatusBadge
      status={secret.status}
    ></ComponentSecretStatusBadge>
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
