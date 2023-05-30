import * as PropTypes from 'prop-types';
import { Fragment } from 'react';

import {
  SecretModel,
  SecretModelValidationMap,
} from '../../../models/radix-api/secrets/secret';
import { SecretType } from '../../../models/radix-api/secrets/secret-type';

const secretTypeDescription: Record<SecretType, string> = {
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
  [SecretType.SecretTypeGeneric]: undefined,
};

export const SecretListItemTitle = ({
  secret: { name, displayName, resource, type },
}: {
  secret: SecretModel;
}): JSX.Element => (
  <>
    {[secretTypeDescription[type]].map((x, i) => (
      <Fragment key={i}>{x} </Fragment>
    ))}
    {displayName && displayName !== name ? displayName : name}
    {resource && ` for ${resource}`}
  </>
);

SecretListItemTitle.propTypes = {
  secret: PropTypes.shape(SecretModelValidationMap).isRequired,
} as PropTypes.ValidationMap<{
  secret: SecretModel;
}>;
