import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { stop } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { AzureKeyVaultSecretStateTableRow } from './azure-key-vault-secret-state-table-row';
import { SecretListItemTitle } from './secret-list-item-title';
import { usePollAzureKeyVaultSecretState } from './use-poll-azure-key-vault-secret-state';
import { ScrimPopup } from '../../scrim-popup';
import { AzureKeyVaultSecretStatusModel } from '../../../models/azure-key-vault-secret-status';
import { SecretModel, SecretModelValidationMap } from '../../../models/secret';
import { RequestState } from '../../../state/state-utils/request-states';

import '../style.css';

export interface SecretListItemTitleAzureKeyVaultItemProps {
  appName: string;
  envName: string;
  componentName: string;
  secret: SecretModel;
}

export const SecretListItemTitleAzureKeyVaultItem = ({
  appName,
  envName,
  componentName,
  secret,
}: SecretListItemTitleAzureKeyVaultItemProps): JSX.Element => {
  const [pollingPauseState, setPollingPauseState] = useState(false);
  const [pollSecretState] = usePollAzureKeyVaultSecretState(
    appName,
    envName,
    componentName,
    secret.resource,
    secret.id,
    pollingPauseState
  );
  const [statusTableRows, setStatusTableRows] = useState<Array<JSX.Element>>(
    []
  );

  const [visibleScrim, setVisibleScrim] = useState(false);
  useEffect(() => {
    setPollingPauseState(!visibleScrim);
  }, [visibleScrim]);

  useEffect(() => {
    if (pollSecretState.status !== RequestState.SUCCESS) {
      return;
    }

    setStatusTableRows(
      pollSecretState.data
        ?.reduce<Array<AzureKeyVaultSecretStatusModel>>((obj, x) => {
          // avoid showing duplicate secrets for job pods with same batchName and version
          if (
            !(x.batchName?.length > 0) ||
            !obj.find(
              (y) => y.batchName === x.batchName && y.version === x.version
            )
          ) {
            obj.push(x);
          }
          return obj;
        }, [])
        .map((x, i) => (
          <AzureKeyVaultSecretStateTableRow key={i} secret={x} />
        )) ?? []
    );
  }, [secret, pollSecretState]);

  return (
    <>
      <Typography
        link
        as="span"
        token={{ textDecoration: 'none' }}
        onClick={() => setVisibleScrim(!!pollSecretState?.data)}
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
          {statusTableRows?.length > 0 ? (
            <div className="grid--table-overflow">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Cell>Version</Table.Cell>
                    <Table.Cell>Consumer</Table.Cell>
                    <Table.Cell>Consumer created</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>{statusTableRows}</Table.Body>
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
    </>
  );
};

SecretListItemTitleAzureKeyVaultItem.propTypes = {
  secret: PropTypes.shape(SecretModelValidationMap).isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<SecretListItemTitleAzureKeyVaultItemProps>;
