import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import * as PropTypes from 'prop-types';
import {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link, LinkProps } from 'react-router-dom';

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
import { sortCompareString, sortDirection } from '../../../utils/sort-utils';
import { tableDataSorter } from '../../../utils/table-sort-utils';

import './style.css';

export type SecretComponent<T extends object = object> = FunctionComponent<
  T & {
    appName: string;
    componentName: string;
    envName: string;
    secrets: Array<SecretModel>;
  }
>;

const secretPropTypes = Object.freeze<SecretComponent['propTypes']>({
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  secrets: PropTypes.arrayOf(
    PropTypes.shape(
      SecretModelValidationMap
    ) as PropTypes.Validator<SecretModel>
  ).isRequired,
});

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

GenericSecrets.propTypes = { ...secretPropTypes };

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

KeyVaultSecrets.propTypes = { ...secretPropTypes };

export const TLSSecrets: SecretComponent = ({
  appName,
  envName,
  componentName,
  secrets,
}) => {
  const sortedSecrets = useGetSortedSecrets(secrets, 'ascending', 'ascending');
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
            expanded: !!expandedRows[x.name],
            hasCertificates: x.tlsCertificates?.length > 0,
            hasMessages: x.statusMessages?.length > 0,
          }))
          .map(({ secret, expanded, hasCertificates, hasMessages }) => (
            <Fragment key={secret.name}>
              <Table.Row
                className={clsx({ 'border-bottom-transparent': expanded })}
              >
                <Table.Cell className="fitwidth padding-right-0">
                  {(hasCertificates || hasMessages) && (
                    <Typography
                      link
                      as="span"
                      onClick={() => expandRow(secret.name)}
                    >
                      <Icon
                        data={expanded ? chevron_up : chevron_down}
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

              {expanded && (
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

TLSSecrets.propTypes = { ...secretPropTypes };

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

VolumeMountSecrets.propTypes = { ...secretPropTypes };
