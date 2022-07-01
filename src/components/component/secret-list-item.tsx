import * as PropTypes from 'prop-types';
import { Fragment } from 'react';

import { SecretModel, SecretModelValidationMap } from '../../models/secret';
import { SecretType } from '../../models/secret-type';
import { Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { getSecretUrl } from '../../utils/routing';
import SecretStatus from '../secret-status';
import { SecretListItemTitle } from './secret-list-item-title';

const SecretTypeDescription: {
  [key: string]: string;
} = {
  [SecretType.SecretTypeClientCert]: 'TLS',
  [SecretType.SecretTypeAzureBlobFuseVolume]:
    'Azure Blobfuse volume mount credential',
  [SecretType.SecretTypeCsiAzureBlobVolume]:
    'Azure Blob volume mount credential',
  [SecretType.SecretTypeCsiAzureKeyVaultCreds]: 'Azure Key vault credential',
  [SecretType.SecretTypeCsiAzureKeyVaultItem]: 'Azure Key vault',
  [SecretType.SecretTypeClientCertificateAuth]:
    'Authentication Client Certificate',
  [SecretType.SecretTypeOAuth2Proxy]: 'OAuth2 Proxy',
  [SecretType.SecretTypeOrphaned]: 'Orphaned',
};

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
      <SecretTitleCsiAzureKeyVaultItem secret={secret} />
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
