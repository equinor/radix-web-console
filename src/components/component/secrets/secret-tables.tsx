import { Typography, Table, Icon } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import { LinkProps, Link } from 'react-router-dom';

import { SecretListItemTitleAzureKeyVaultItem } from './secret-list-item-title-azure-key-vault-item';

import { ExternalDnsAliasHelp } from '../../external-dns-alias-help';
import { SecretStatusMessages } from '../../secret-status-messages';
import { ComponentSecretStatusBadge } from '../../status-badges';
import { TLSCertificateList } from '../../tls-certificate-list';
import { SecretModel } from '../../../models/radix-api/secrets/secret';
import { SecretStatus } from '../../../models/radix-api/secrets/secret-status';
import { SecretType } from '../../../models/radix-api/secrets/secret-type';
import { getSecretUrl } from '../../../utils/routing';
import { sortDirection, sortCompareString } from '../../../utils/sort-utils';
import { tableDataSorter } from '../../../utils/table-sort-utils';

import './style.css';

export type SecretComponent = FunctionComponent<{
  appName: string;
  componentName: string;
  envName: string;
  secrets: Array<SecretModel>;
}>;

const chevronIcons = [chevron_down, chevron_up];

const SecretLink: FunctionComponent<
  { title: string } & Pick<LinkProps, 'className' | 'to'>
> = ({ title, ...linkProps }) => (
  <Link {...linkProps}>
    <Typography link as="span" token={{ textDecoration: 'none' }}>
      {title}
    </Typography>
  </Link>
);

function getDisplayName({
  displayName,
  name,
}: Pick<SecretModel, 'displayName' | 'name'>): string {
  return displayName || name;
}

function useGetSortedSecrets(
  secrets: Array<SecretModel>,
  nameSort?: sortDirection | null,
  resourceSort?: sortDirection | null
): Array<SecretModel> {
  const [sortedData, setSortedData] = useState(secrets);

  useEffect(() => {
    setSortedData(
      tableDataSorter(secrets, [
        (x, y) =>
          sortCompareString(
            getDisplayName(x),
            getDisplayName(y),
            nameSort,
            true,
            () => !!nameSort
          ),
        (x, y) =>
          sortCompareString(
            x.resource,
            y.resource,
            resourceSort,
            true,
            () => !!resourceSort
          ),
      ])
    );
  }, [nameSort, resourceSort, secrets]);

  return sortedData;
}

export const GenericSecrets: SecretComponent = ({
  appName,
  envName,
  componentName,
  secrets,
}) => {
  const sortedSecrets = useGetSortedSecrets(secrets, 'ascending');

  const getLink = useCallback<(name: string) => string>(
    (name) => getSecretUrl(appName, envName, componentName, name),
    [appName, componentName, envName]
  );

  return (
    <Table className="secret-table">
      <Table.Head>
        <Table.Row>
          <Table.Cell width={40} />
          <Table.Cell>Name</Table.Cell>
          <Table.Cell width={150}>Status</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedSecrets.map((x) => (
          <Table.Row key={x.name}>
            <Table.Cell className="fitwidth padding-right-0" />
            <Table.Cell>
              <SecretLink
                className="secret-table__link"
                title={getDisplayName(x)}
                to={getLink(x.name)}
              />
            </Table.Cell>
            <Table.Cell>
              <ComponentSecretStatusBadge status={x.status} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const KeyVaultSecrets: SecretComponent = ({
  appName,
  envName,
  componentName,
  secrets,
}) => {
  const sortedSecrets = useGetSortedSecrets(secrets, null, 'ascending');

  const getLink = useCallback<(name: string) => string>(
    (name) => getSecretUrl(appName, envName, componentName, name),
    [appName, componentName, envName]
  );

  return (
    <Table className="secret-table">
      <Table.Head>
        <Table.Row>
          <Table.Cell width={40} />
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>KeyVault</Table.Cell>
          <Table.Cell width={150}>Status</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedSecrets.map((x) => (
          <Table.Row key={x.name}>
            <Table.Cell className="fitwidth padding-right-0" />
            <Table.Cell>
              {x.type === SecretType.SecretTypeCsiAzureKeyVaultItem ? (
                <SecretListItemTitleAzureKeyVaultItem
                  title={getDisplayName(x)}
                  secret={x}
                  {...{ appName, envName, componentName }}
                />
              ) : (
                <SecretLink
                  className="secret-table__link"
                  title={getDisplayName(x)}
                  to={getLink(x.name)}
                />
              )}
            </Table.Cell>
            <Table.Cell>{x.resource}</Table.Cell>
            <Table.Cell>
              <ComponentSecretStatusBadge status={x.status} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const TLSSecrets: SecretComponent = ({
  appName,
  envName,
  componentName,
  secrets,
}) => {
  const [ssecrets] = useState([
    {
      name: 'techstars.equinor.com-cert',
      displayName: 'test-Certificate',
      type: SecretType.SecretTypeClientCert,
      resource: 'techstars.equinor.com',
      id: 'cert',
      component: 'web',
      status: SecretStatus.Consistent,
      statusMessages: ['abcdefghijklmnopqrstuvwxyz', '0123456789'],
      tlsCertificates: [
        {
          subject: 'CN=www.equinor.com,O=Equinor ASA,L=Stavanger,C=NO',
          issuer: 'CN=DigiCert TLS RSA SHA256 2020 CA1,O=DigiCert Inc,C=US',
          notBefore: new Date('2022-10-18T00:00:00Z'),
          notAfter: new Date('2023-11-07T23:59:59Z'),
          dnsNames: ['equinor.no', 'equinor.com', 'statoil.com'],
        },
        {
          subject: 'CN=DigiCert TLS RSA SHA256 2020 CA1,O=DigiCert Inc,C=US',
          issuer:
            'CN=DigiCert Global Root CA,OU=www.digicert.com,O=DigiCert Inc,C=US',
          notBefore: new Date('2021-04-14T00:00:00Z'),
          notAfter: new Date('2031-04-13T23:59:59Z'),
        },
      ],
    },
    ...secrets,
  ]);

  const sortedSecrets = useGetSortedSecrets(ssecrets, 'ascending', 'ascending');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  );
  const getLink = useCallback<(name: string) => string>(
    (name) => getSecretUrl(appName, envName, componentName, name),
    [appName, componentName, envName]
  );

  return (
    <Table className="secret-table">
      <Table.Head>
        <Table.Row>
          <Table.Cell width={40} />
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>DNS Name</Table.Cell>
          <Table.Cell width={150}>Status</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedSecrets
          .map((x) => ({
            secret: x,
            hasCertificates: x.tlsCertificates?.length > 0,
            hasMessages: x.statusMessages?.length > 0,
          }))
          .map(({ secret, hasCertificates, hasMessages }) => (
            <Fragment key={secret.name}>
              <Table.Row
                className={clsx({
                  'border-bottom-transparent': expandedRows[secret.name],
                })}
              >
                <Table.Cell className="fitwidth padding-right-0">
                  {(hasCertificates || hasMessages) && (
                    <Typography
                      link
                      as="span"
                      onClick={() => expandRow(secret.name)}
                    >
                      <Icon
                        data={chevronIcons[+!!expandedRows[secret.name]]}
                        role="button"
                        title="Toggle more information"
                      />
                    </Typography>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <SecretLink
                    className="secret-table__link"
                    title={getDisplayName(secret)}
                    to={getLink(secret.name)}
                  />
                </Table.Cell>
                <Table.Cell>{secret.resource}</Table.Cell>
                <Table.Cell>
                  <ComponentSecretStatusBadge status={secret.status} />
                </Table.Cell>
              </Table.Row>

              {expandedRows[secret.name] && (
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell colSpan={3}>
                    <div className="secret-table__details grid grid--gap-medium">
                      {secret.status === SecretStatus.Invalid && (
                        <ExternalDnsAliasHelp />
                      )}

                      {hasMessages && (
                        <SecretStatusMessages
                          status={secret.status}
                          messages={secret.statusMessages}
                        />
                      )}

                      {hasCertificates && (
                        <TLSCertificateList
                          tlsCertificates={secret.tlsCertificates}
                        />
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Fragment>
          ))}
      </Table.Body>
    </Table>
  );
};

export const VolumeMountSecrets: SecretComponent = ({
  appName,
  envName,
  componentName,
  secrets,
}) => {
  const sortedSecrets = useGetSortedSecrets(secrets, 'ascending', 'ascending');

  const getLink = useCallback<(name: string) => string>(
    (name) => getSecretUrl(appName, envName, componentName, name),
    [appName, componentName, envName]
  );

  return (
    <Table className="secret-table">
      <Table.Head>
        <Table.Row>
          <Table.Cell width={40} />
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Volume Mount</Table.Cell>
          <Table.Cell width={150}>Status</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedSecrets.map((x) => (
          <Table.Row key={x.name}>
            <Table.Cell className="fitwidth padding-right-0" />
            <Table.Cell>
              <SecretLink
                className="secret-table__link"
                title={getDisplayName(x)}
                to={getLink(x.name)}
              />
            </Table.Cell>
            <Table.Cell>{x.resource}</Table.Cell>
            <Table.Cell>
              <ComponentSecretStatusBadge status={x.status} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
