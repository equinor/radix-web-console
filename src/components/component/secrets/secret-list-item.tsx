import * as PropTypes from 'prop-types';
import { Icon, Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';

import { SecretModel, SecretModelValidationMap } from '../../../models/secret';
import { SecretType } from '../../../models/secret-type';
import { getSecretUrl } from '../../../utils/routing';
import { SecretListItemTitle } from './secret-list-item-title';
import { SecretListItemTitleAzureKeyVaultItem } from './secret-list-item-title-azure-key-vault-item';
import { ComponentSecretStatusBadge } from '../../status-badges';
import { useState } from 'react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { TLSCertificateList } from '../../tls-certificate-list';
import { SecretStatusMessages } from '../../secret-status-messages';
import { ExternalDnsAliasHelp } from '../../external-dns-alias-help';
import { SecretStatus } from '../../../models/secret-status';

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
}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasStatusMessages = secret.statusMessages?.length > 0;
  const hasTlsCertificateInfo = secret.tlsCertificates?.length > 0;
  const showCheveron = hasStatusMessages || hasTlsCertificateInfo;

  return (
    <>
      <div>
        {showCheveron && (
          <Typography link as="span">
            <Icon
              size={24}
              data={isExpanded ? chevron_up : chevron_down}
              role="button"
              title="Toggle more information"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </Typography>
        )}
      </div>
      <div className="grid grid--gap-medium">
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
          <ComponentSecretStatusBadge status={secret.status} />
        </div>
        {isExpanded && (
          <>
            {hasStatusMessages && <SecretStatusMessages secret={secret} />}
            {secret.type === SecretType.SecretTypeClientCert &&
              secret.status === SecretStatus.Invalid && (
                <ExternalDnsAliasHelp />
              )}
            {hasTlsCertificateInfo && (
              <TLSCertificateList tlsCertificates={secret.tlsCertificates} />
            )}
          </>
        )}
      </div>
    </>
  );
};

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
