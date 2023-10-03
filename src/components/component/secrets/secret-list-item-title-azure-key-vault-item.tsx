import { Typography, Table, Icon } from '@equinor/eds-core-react';
import { stop } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useState, useEffect } from 'react';

import { usePollAzureKeyVaultSecretState } from './use-poll-azure-key-vault-secret-state';

import { ScrimPopup } from '../../scrim-popup';
import { Duration } from '../../time/duration';
import { AzureKeyVaultSecretVersionModel } from '../../../models/radix-api/secrets/azure-key-vault-secret-version';
import {
  SecretModel,
  SecretModelValidationMap,
} from '../../../models/radix-api/secrets/secret';
import { RequestState } from '../../../state/state-utils/request-states';
import {
  smallScheduledBatchName,
  smallScheduledJobName,
  smallReplicaName,
} from '../../../utils/string';

import '../style.css';

export interface SecretListItemTitleAzureKeyVaultItemProps {
  appName: string;
  envName: string;
  componentName: string;
  title: string;
  secret: Pick<SecretModel, 'resource' | 'id'>;
}

function consumerSecretName(
  replicaName: string,
  batchName?: string,
  jobName?: string
): string {
  if (batchName?.length > 0) {
    // show only first secret-version entry for pods of this batch
    return `batch: ${smallScheduledBatchName(batchName)}`;
  }
  if (jobName?.length > 0) {
    return `job: ${smallScheduledJobName(jobName)}`;
  }
  if (replicaName.toLowerCase() === 'new jobs') {
    return 'New job';
  }
  return `replica: ${smallReplicaName(replicaName)}`;
}

const ConsumerSecretCreated: FunctionComponent<
  AzureKeyVaultSecretVersionModel
> = ({
  replicaCreated,
  replicaName,
  batchCreated,
  batchName,
  jobCreated,
  jobName,
}) => {
  if (batchName?.length > 0) {
    return <Duration start={batchCreated} end={new Date()} />;
  }
  if (jobName?.length > 0) {
    return <Duration start={jobCreated} end={new Date()} />;
  }
  if (replicaName.toLowerCase() === 'new jobs') {
    return <></>;
  }
  return <Duration start={replicaCreated} end={new Date()} />;
};

export const SecretListItemTitleAzureKeyVaultItem: FunctionComponent<
  SecretListItemTitleAzureKeyVaultItemProps
> = ({ appName, envName, componentName, title, secret }) => {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const [pollingPauseState, setPollingPauseState] = useState(false);
  const [filteredData, setFilteredData] = useState<
    Array<AzureKeyVaultSecretVersionModel>
  >([]);
  const [{ data, status }] = usePollAzureKeyVaultSecretState(
    appName,
    envName,
    componentName,
    secret.resource,
    secret.id,
    pollingPauseState
  );

  useEffect(() => {
    setPollingPauseState(!visibleScrim);
  }, [visibleScrim]);

  useEffect(() => {
    if (status !== RequestState.SUCCESS) {
      return;
    }

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
        {title}
      </Typography>

      <ScrimPopup
        title={`${secret.resource}: ${secret.id}`}
        open={visibleScrim}
        onClose={() => setVisibleScrim(false)}
        isDismissable
      >
        <div className="secret-item-content grid--table-overflow">
          {filteredData.length > 0 ? (
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
                  <Table.Row key={i}>
                    <Table.Cell>{x.version}</Table.Cell>
                    <Table.Cell>
                      <Typography as="span">
                        {consumerSecretName(
                          x.replicaName,
                          x.batchName,
                          x.jobName
                        )}
                      </Typography>
                    </Table.Cell>
                    <Table.Cell>
                      <ConsumerSecretCreated {...x} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <div className="secret-item-content--empty">
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
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  secret: PropTypes.shape(
    (['resource', 'id'] as Array<keyof typeof SecretModelValidationMap>).reduce(
      (o, key) => ({ ...o, [key]: SecretModelValidationMap[key] }),
      {}
    )
  ),
};
