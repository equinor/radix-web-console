import * as PropTypes from 'prop-types';
import { Fragment } from 'react';

import { SecretModel, SecretModelValidationMap } from '../../../models/secret';
import { SecretType } from '../../../models/secret-type';

const secretTypeDescription: {
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

export const SecretListItemTitle = ({
  secret,
}: {
  secret: SecretModel;
}): JSX.Element => (
  <>
    {[secretTypeDescription[secret.type]].map((x, i) => (
      <Fragment key={i}>{x} </Fragment>
    ))}
    {secret.displayName && secret.displayName !== secret.name
      ? secret.displayName
      : secret.name}
    {secret.resource && <> for {secret.resource}</>}
  </>
);

SecretListItemTitle.propTypes = {
  secret: PropTypes.shape(SecretModelValidationMap).isRequired,
} as PropTypes.ValidationMap<{
  secret: SecretModel;
}>;
