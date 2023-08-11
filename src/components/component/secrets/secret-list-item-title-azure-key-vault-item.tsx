import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { stop } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import { AzureKeyVaultSecretStateTableRow } from './azure-key-vault-secret-state-table-row';
import { SecretListItemTitle } from './secret-list-item-title';
import { usePollAzureKeyVaultSecretState } from './use-poll-azure-key-vault-secret-state';

import { ScrimPopup } from '../../scrim-popup';
import { AzureKeyVaultSecretVersionModel } from '../../../models/radix-api/secrets/azure-key-vault-secret-version';
import {
  SecretModel,
  SecretModelValidationMap,
} from '../../../models/radix-api/secrets/secret';
import { RequestState } from '../../../state/state-utils/request-states';

import '../style.css';

export interface SecretListItemTitleAzureKeyVaultItemProps {
  appName: string;
  envName: string;
  componentName: string;
  secret: SecretModel;
}

export const SecretListItemTitleAzureKeyVaultItem: FunctionComponent<
  SecretListItemTitleAzureKeyVaultItemProps
> = ({ appName, envName, componentName, secret }) => {
  const [pollingPauseState, setPollingPauseState] = useState(false);
  const [{ data, status }] = usePollAzureKeyVaultSecretState(
    appName,
    envName,
    componentName,
    secret.resource,
    secret.id,
    pollingPauseState
  );

  const [visibleScrim, setVisibleScrim] = useState(false);
  useEffect(() => {
    setPollingPauseState(!visibleScrim);
  }, [visibleScrim]);

  const [filteredData, setFilteredData] = useState<
    Array<AzureKeyVaultSecretVersionModel>
  >([]);
  useEffect(() => {
    if (status !== RequestState.SUCCESS) return;

    setFilteredData(
      (data ?? []).filter(
        ({ batchName, version }, i, arr) =>
          // avoid showing duplicate secrets for job pods with same batchName and version
          !batchName ||
          arr.findIndex(
            (y) => y.batchName === batchName && y.version === version
          ) === i
      )
    );
  }, [secret, data, status]);

  return (
    <>
      <Typography
        link
        as="span"
        token={{ textDecoration: 'none' }}
        onClick={() => setVisibleScrim(data !== null)}
      >
        <SecretListItemTitle secret={secret} />
      </Typography>

      <ScrimPopup
        title={`${secret.resource}: ${secret.id}`}
        open={visibleScrim}
        onClose={() => setVisibleScrim(false)}
        isDismissable
      >
        <div className="secret-item-content">
          {filteredData.length > 0 ? (
            <div className="grid--table-overflow">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Cell>Version</Table.Cell>
                    <Table.Cell>Consumer</Table.Cell>
                    <Table.Cell>Consumer created</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {filteredData.map((x, i) => (
                    <AzureKeyVaultSecretStateTableRow key={i} secret={x} />
                  ))}
                </Table.Body>
              </Table>
            </div>
          ) : (
            <div className="stat_empty">
              <Icon data={stop} />
              <Typography>No replicas use this secret</Typography>
            </div>
          )}
        </div>
      </ScrimPopup>
    </>
  );
};

SecretListItemTitleAzureKeyVaultItem.propTypes = {
  secret: PropTypes.shape(SecretModelValidationMap)
    .isRequired as PropTypes.Validator<SecretModel>,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};
