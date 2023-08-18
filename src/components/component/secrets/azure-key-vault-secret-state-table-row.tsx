import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { Duration } from '../../time/duration';
import {
  AzureKeyVaultSecretVersionModel,
  AzureKeyVaultSecretVersionModelValidationMap,
} from '../../../models/radix-api/secrets/azure-key-vault-secret-version';
import {
  smallReplicaName,
  smallScheduledBatchName,
  smallScheduledJobName,
} from '../../../utils/string';

export interface AzureKeyVaultSecretStateTableRowProps {
  secret: AzureKeyVaultSecretVersionModel;
}

const ConsumerSecretName: FunctionComponent<
  Pick<AzureKeyVaultSecretVersionModel, 'batchName' | 'jobName' | 'replicaName'>
> = ({ replicaName, batchName, jobName }) => {
  let consumer: string;
  if (batchName?.length > 0) {
    // show only first secret-version entry for pods of this batch
    consumer = `batch: ${smallScheduledBatchName(batchName)}`;
  } else if (jobName?.length > 0) {
    consumer = `job: ${smallScheduledJobName(jobName)}`;
  } else if (replicaName.toLowerCase() === 'new jobs') {
    consumer = 'New job';
  } else {
    consumer = `replica: ${smallReplicaName(replicaName)}`;
  }

  return <Typography as="span">{consumer}</Typography>;
};

const ConsumerSecretCreated: FunctionComponent<
  Omit<AzureKeyVaultSecretVersionModel, 'version'>
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

export const AzureKeyVaultSecretStateTableRow: FunctionComponent<
  AzureKeyVaultSecretStateTableRowProps
> = ({ secret }) => (
  <Table.Row>
    <Table.Cell>{secret.version}</Table.Cell>
    <Table.Cell>
      <Typography as="span">
        <ConsumerSecretName {...secret} />
      </Typography>
    </Table.Cell>
    <Table.Cell>
      <ConsumerSecretCreated {...secret} />
    </Table.Cell>
  </Table.Row>
);

AzureKeyVaultSecretStateTableRow.propTypes = {
  secret: PropTypes.shape(AzureKeyVaultSecretVersionModelValidationMap)
    .isRequired as PropTypes.Validator<AzureKeyVaultSecretVersionModel>,
};
