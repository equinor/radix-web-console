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
      const tableRows = pollSecretState.data.map((secretInReplica, i) => (
        <AzureKeyVaultSecretStateTableRow
          key={i}
          secretInReplica={secretInReplica}
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
                    <Table.Cell>Replica</Table.Cell>
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
