import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { stop } from '@equinor/eds-icons';
import { useState } from 'react';
import {
  type AzureKeyVaultSecretVersion,
  type Secret,
  useGetAzureKeyVaultSecretVersionsQuery,
} from '../../../store/radix-api';
import {
  smallReplicaName,
  smallScheduledBatchName,
  smallScheduledJobName,
} from '../../../utils/string';
import { ScrimPopup } from '../../scrim-popup';
import { Duration } from '../../time/duration';

import '../style.css';

function consumerSecretName(
  replicaName: string,
  batchName?: string,
  jobName?: string
): string {
  if (batchName && batchName.length > 0) {
    // show only first secret-version entry for pods of this batch
    return `batch: ${smallScheduledBatchName(batchName)}`;
  }
  if (jobName && jobName.length > 0) {
    return `job: ${smallScheduledJobName(jobName)}`;
  }
  if (replicaName.toLowerCase() === 'new jobs') {
    return 'New job';
  }
  return `replica: ${smallReplicaName(replicaName)}`;
}

const ConsumerSecretCreated = ({
  replicaCreated,
  replicaName,
  batchCreated,
  batchName,
  jobCreated,
  jobName,
}: AzureKeyVaultSecretVersion) => {
  if (batchName && batchName.length > 0) {
    return <Duration start={batchCreated} end={new Date()} />;
  }
  if (jobName && jobName.length > 0) {
    return <Duration start={jobCreated} end={new Date()} />;
  }
  if (replicaName.toLowerCase() === 'new jobs') {
    return <></>;
  }
  return <Duration start={new Date(replicaCreated)} end={new Date()} />;
};

type AzureKeyVaultItemProps = {
  appName: string;
  envName: string;
  componentName: string;
  title: string;
  scrimTitle?: string;
  secret: Pick<Secret, 'resource' | 'id'>;
};
export const SecretListItemTitleAzureKeyVaultItem = ({
  appName,
  envName,
  componentName,
  title,
  scrimTitle,
  secret,
}: AzureKeyVaultItemProps) => {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(0);

  const { data, refetch } = useGetAzureKeyVaultSecretVersionsQuery(
    {
      appName,
      envName,
      componentName,
      azureKeyVaultName: secret.resource!,
      secretName: secret.id,
    },
    {
      skip:
        !appName ||
        !envName ||
        !componentName ||
        !secret.resource ||
        !secret.id,
      pollingInterval,
    }
  );

  const filteredData = (data || []).filter(
    ({ batchName, version }, i, arr) =>
      // avoid showing duplicate secrets for job pods with same batchName and version
      !batchName ||
      arr.findIndex(
        (y) => y.batchName === batchName && y.version === version
      ) === i
  );

  return (
    <>
      <Typography
        link
        as="span"
        token={{ textDecoration: 'none' }}
        onClick={() => {
          setVisibleScrim(true);
          setPollingInterval(8000);
          refetch();
        }}
      >
        {title}
      </Typography>

      <ScrimPopup
        title={scrimTitle ?? `${secret.resource}: ${secret.id}`}
        open={visibleScrim}
        onClose={() => {
          setVisibleScrim(false);
          setPollingInterval(0);
        }}
        isDismissable
      >
        <div className="secret-item-content grid--table-overflow">
          {filteredData?.length > 0 ? (
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
