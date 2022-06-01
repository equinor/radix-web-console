import * as PropTypes from 'prop-types';
import { Fragment } from 'react';

import { SecretModel, SecretModelValidationMap } from '../../models/secret';
import { SecretType } from '../../models/secret-type';

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

export const SecretTitle = ({
  secretName,
  envSecret,
}: {
  secretName: string;
  envSecret: SecretModel;
}): JSX.Element => (
  <>
    {[SecretTypeDescription[envSecret.type]].map((x, i) => (
      <Fragment key={i}>{x} </Fragment>
    ))}
    {envSecret.displayName && envSecret.displayName !== secretName
      ? envSecret.displayName
      : secretName}
    {envSecret.resource && <> for {envSecret.resource}</>}
  </>
);

SecretTitle.propTypes = {
  envSecret: PropTypes.shape(SecretModelValidationMap).isRequired,
  secretName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<{
  secretName: string;
  envSecret: SecretModel;
}>;
