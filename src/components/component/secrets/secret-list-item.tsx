import { Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';

import { SecretListItemTitle } from './secret-list-item-title';
import { SecretListItemTitleAzureKeyVaultItem } from './secret-list-item-title-azure-key-vault-item';

import { ExternalDnsAliasHelp } from '../../external-dns-alias-help';
import { SecretStatusMessages } from '../../secret-status-messages';
import { ComponentSecretStatusBadge } from '../../status-badges';
import { TLSCertificateList } from '../../tls-certificate-list';
import {
  SecretModel,
  SecretModelValidationMap,
} from '../../../models/radix-api/secrets/secret';
import { SecretStatus } from '../../../models/radix-api/secrets/secret-status';
import { SecretType } from '../../../models/radix-api/secrets/secret-type';
import { getSecretUrl } from '../../../utils/routing';

export interface SecretListItemProps {
  appName: string;
  envName: string;
  componentName: string;
  secret: SecretModel;
}

export const SecretListItem: FunctionComponent<SecretListItemProps> = ({
  appName,
  envName,
  componentName,
  secret,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasStatusMessages = secret.statusMessages?.length > 0;
  const hasTlsCertificateInfo = secret.tlsCertificates?.length > 0;
  const showChevron = hasStatusMessages || hasTlsCertificateInfo;

  return (
    <>
      <div>
        {showChevron && (
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
            {hasStatusMessages && (
              <SecretStatusMessages
                status={secret.status}
                messages={secret.statusMessages}
              />
            )}

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
  secret: PropTypes.shape(SecretModelValidationMap)
    .isRequired as PropTypes.Validator<SecretModel>,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};
