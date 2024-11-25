import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import {
  type FunctionComponent,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

import type { Secret } from '../../../store/radix-api';
import {
  type SortDirection,
  dataSorter,
  sortCompareString,
} from '../../../utils/sort-utils';
import { ScrimPopup } from '../../scrim-popup';
import { ComponentSecretStatusBadge } from '../../status-badges';
import { SecretListItemTitleAzureKeyVaultItem } from './secret-list-item-title-azure-key-vault-item';
import { SecretOverview } from './secret-overview';

import './style.css';

export type SecretComponent<T extends object = object> = FunctionComponent<
  T & {
    appName: string;
    componentName: string;
    envName: string;
    secrets: Array<Secret>;
  }
>;

const secretPropTypes = Object.freeze<SecretComponent['propTypes']>({
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  secrets: PropTypes.arrayOf(PropTypes.object as PropTypes.Validator<Secret>)
    .isRequired,
});

const SecretLink: FunctionComponent<{
  title: string;
  scrimTitle?: ReactNode;
  appName: string;
  componentName: string;
  envName: string;
  secretName: string;
}> = ({ title, scrimTitle, ...rest }) => {
  const [visibleScrim, setVisibleScrim] = useState(false);

  return (
    <div>
      <Typography
        link
        onClick={() => setVisibleScrim(!visibleScrim)}
        token={{ textDecoration: 'none' }}
      >
        {title}
      </Typography>

      <ScrimPopup
        className="secret-item__scrim"
        title={scrimTitle || title}
        open={visibleScrim}
        isDismissable
        onClose={() => setVisibleScrim(false)}
      >
        <div className="secret-item__scrim-content">
          <SecretOverview onSave={() => setVisibleScrim(false)} {...rest} />
        </div>
      </ScrimPopup>
    </div>
  );
};

function getDisplayName({
  displayName,
  name,
}: Pick<Secret, 'displayName' | 'name'>): string {
  return displayName || name;
}

function useGetSortedSecrets(
  secrets: Array<Secret>,
  nameSort?: SortDirection,
  resourceSort?: SortDirection
): Array<Secret> {
  const [sortedData, setSortedData] = useState(secrets);

  useEffect(() => {
    setSortedData(
      dataSorter(secrets, [
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
                title={getDisplayName(x)}
                secretName={x.name}
                {...{ appName, envName, componentName }}
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
  const sortedSecrets = useGetSortedSecrets(secrets, undefined, 'ascending');

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
              {x.type === 'csi-azure-key-vault-item' ? (
                <SecretListItemTitleAzureKeyVaultItem
                  title={getDisplayName(x)}
                  scrimTitle={`${x.resource}: ${x.id}`}
                  secret={x}
                  {...{ appName, envName, componentName }}
                />
              ) : (
                <SecretLink
                  title={getDisplayName(x)}
                  scrimTitle={`${x.resource}: ${getDisplayName(x)}`}
                  secretName={x.name}
                  {...{ appName, envName, componentName }}
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

export const VolumeMountSecrets: SecretComponent = ({
  appName,
  envName,
  componentName,
  secrets,
}) => {
  const sortedSecrets = useGetSortedSecrets(secrets, 'ascending', 'ascending');

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
                title={getDisplayName(x)}
                scrimTitle={`${x.resource}: ${getDisplayName(x)}`}
                secretName={x.name}
                {...{ appName, envName, componentName }}
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
