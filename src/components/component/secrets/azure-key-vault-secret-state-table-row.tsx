import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

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

const ConsumerSecretName = ({
  secret,
}: {
  secret: AzureKeyVaultSecretVersionModel;
}): JSX.Element => {
  let consumer: string;
  if (secret.batchName?.length > 0) {
    // show only first secret-version entry for pods of this batch
    consumer = `batch: ${smallScheduledBatchName(secret.batchName)}`;
  } else if (secret.jobName?.length > 0) {
    consumer = `job: ${smallScheduledJobName(secret.jobName)}`;
  } else if (secret.replicaName.toLowerCase() === 'new jobs') {
    consumer = 'New job';
  } else {
    consumer = `replica: ${smallReplicaName(secret.replicaName)}`;
  }

  return <Typography as="span">{consumer}</Typography>;
};

const ConsumerSecretCreated = ({
  secret,
}: {
  secret: AzureKeyVaultSecretVersionModel;
}): JSX.Element => {
  if (secret.batchName?.length > 0) {
    return <Duration start={secret.batchCreated} end={new Date()} />;
  }
  if (secret.jobName?.length > 0) {
    return <Duration start={secret.jobCreated} end={new Date()} />;
  }
  if (secret.replicaName.toLowerCase() === 'new jobs') {
    return <></>;
  }

  return <Duration start={secret.replicaCreated} end={new Date()} />;
};

export const AzureKeyVaultSecretStateTableRow = ({
  secret,
}: AzureKeyVaultSecretStateTableRowProps): JSX.Element => (
  <Table.Row>
    <Table.Cell>{secret.version}</Table.Cell>
    <Table.Cell>
      <Typography as="span">
        <ConsumerSecretName secret={secret} />
      </Typography>
    </Table.Cell>
    <Table.Cell>
      <ConsumerSecretCreated secret={secret} />
    </Table.Cell>
  </Table.Row>
);

AzureKeyVaultSecretStateTableRow.propTypes = {
  secret: PropTypes.shape(AzureKeyVaultSecretVersionModelValidationMap),
} as PropTypes.ValidationMap<AzureKeyVaultSecretStateTableRowProps>;
