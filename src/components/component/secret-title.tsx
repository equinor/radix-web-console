import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { SecretType } from '../../models/secret-type';
import { SecretModel, SecretModelValidationMap } from '../../models/secret';

const SecretTypeDescription: {
  [key: string]: JSX.Element;
} = {
  [SecretType.SecretTypeClientCert]: <Typography as="span">TLS</Typography>,
  [SecretType.SecretTypeAzureBlobFuseVolume]: (
    <Typography as="span">Azure Blobfuse volume mount credential</Typography>
  ),
  [SecretType.SecretTypeCsiAzureBlobVolume]: (
    <Typography as="span">Azure Blob volume mount credential</Typography>
  ),
  [SecretType.SecretTypeCsiAzureKeyVaultCreds]: (
    <Typography as="span">Azure Key vault credential</Typography>
  ),
  [SecretType.SecretTypeCsiAzureKeyVaultItem]: (
    <Typography as="span">Azure Key vault</Typography>
  ),
  [SecretType.SecretTypeClientCertificateAuth]: (
    <Typography as="span">Authentication Client Certificate</Typography>
  ),
  [SecretType.SecretTypeOAuth2Proxy]: (
    <Typography as="span">OAuth2 Proxy</Typography>
  ),
  [SecretType.SecretTypeOrphaned]: <Typography as="span">Orphaned</Typography>,
};

export const SecretTitle = ({
  secretName,
  envSecret,
}: {
  secretName: string;
  envSecret: SecretModel;
}): JSX.Element => (
  <>
    {SecretTypeDescription[envSecret.type] || <></>}{' '}
    {envSecret.displayName && envSecret.displayName !== secretName ? (
      <Typography as="span">{envSecret.displayName}</Typography>
    ) : (
      <Typography as="span">{secretName}</Typography>
    )}
    {envSecret.resource && (
      <>
        {' '}
        for <Typography as="span">{envSecret.resource}</Typography>
      </>
    )}
  </>
);

SecretTitle.propTypes = {
  envSecret: PropTypes.shape(SecretModelValidationMap).isRequired,
  secretName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<{
  secretName: string;
  envSecret: SecretModel;
}>;
