import { Icon, Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { stop } from '@equinor/eds-icons';

import { SecretModel, SecretModelValidationMap } from '../../../models/secret';
import { SecretListItemTitle } from './secret-list-item-title';
import { ScrimPopup } from '../../scrim-popup';
import { usePollAzureKeyVaultSecretState } from './use-poll-azure-key-vault-secret-state';
import { AzureKeyVaultSecretStateTableRow } from './azure-key-vault-secret-state-table-row';
import { RequestState } from '../../../state/state-utils/request-states';

import '../style.css';

function getSecretInReplicaWithUniqueBatchNames(secretInReplicaList) {
  let batchMap = new Map<string, Map<string, boolean>>(); //batchName:version:boolean
  // this filtering is to avoid showing all job pods for the same batch with the same secret version
  return secretInReplicaList.filter((secretInReplica) => {
    if (!(secretInReplica.batchName?.length > 0))
      return true;
    if (!batchMap.has(secretInReplica.batchName))
      batchMap.set(secretInReplica.batchName, new Map<string, boolean>());
    if (!batchMap.get(secretInReplica.batchName).has(secretInReplica.version)) {
      batchMap
        .get(secretInReplica.batchName)
        .set(secretInReplica.version, true); // first version for this batch
      return true;
    }
    return false;
  });
}

export const SecretListItemTitleAzureKeyVaultItem = function ({
  appName,
  envName,
  componentName,
  secret,
}: {
  appName: string;
  envName: string;
  componentName: string;
  secret: SecretModel;
}): JSX.Element {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const [pollingPauseState, setPollingPauseState] = useState(false);
  const [pollSecretState] = usePollAzureKeyVaultSecretState(
    appName,
    envName,
    componentName,
    secret.resource,
    secret.id,
    pollingPauseState
  );
  const [statusesTableRows, setStatusesTableRows] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setPollingPauseState(!visibleScrim);
  }, [visibleScrim]);

  useEffect(() => {
    if (pollSecretState.status !== RequestState.SUCCESS) {
      return;
    }

    if (pollSecretState.data) {
      let itemsWithUniqueBatchNames = getSecretInReplicaWithUniqueBatchNames(
        pollSecretState.data
      );
      const tableRows = itemsWithUniqueBatchNames.map((secretInReplica, i) => (
        <AzureKeyVaultSecretStateTableRow
          key={i}
          secretInConsumer={secretInReplica}
        />
      ));
      setStatusesTableRows(tableRows);
    } else {
      setStatusesTableRows([]);
    }
  }, [secret, pollSecretState]);
  return (
    <>
      <ScrimPopup
        title={secret.resource + ': ' + secret.id}
        open={visibleScrim}
        onClose={() => setVisibleScrim(false)}
      >
        <div className="secret-item-content">
          {statusesTableRows && statusesTableRows.length > 0 ? (
            <div className="grid--table-overflow">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Cell>Version</Table.Cell>
                    <Table.Cell>Consumer</Table.Cell>
                    <Table.Cell>Consumer created</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>{statusesTableRows}</Table.Body>
              </Table>
            </div>
          ) : (
            <div className="stat_empty">
              <span>
                <Icon data={stop} />
              </span>
              <Typography>No replicas use this secret</Typography>
            </div>
          )}
        </div>
      </ScrimPopup>

      <Typography
        link
        as="span"
        token={{ textDecoration: 'none' }}
        onClick={() => setVisibleScrim(pollSecretState?.data !== null)}
      >
        <SecretListItemTitle secret={secret} />
      </Typography>
    </>
  );
};

SecretListItemTitleAzureKeyVaultItem.propTypes = {
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
