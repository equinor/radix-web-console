import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { Duration } from '../../time/duration';
import {
  AzureKeyVaultSecretStatusModel,
  AzureKeyVaultSecretStatusModelValidationMap,
} from '../../../models/azure-key-vault-secret-status';
import { smallScheduledBatchName } from '../../../utils/string';

export interface AzureKeyVaultSecretStateTableRowProps {
  secret: AzureKeyVaultSecretStatusModel;
}

const ConsumerSecretName = ({
  secret,
}: {
  secret: AzureKeyVaultSecretStatusModel;
}): JSX.Element => {
  let consumer: string;
  if (secret.batchName?.length > 0) {
    // show only first secret-version entry for pods of this batch
    consumer = `batch: ${smallScheduledBatchName(secret.batchName)}`;
  } else if (secret.jobName?.length > 0) {
    consumer = `job: ${smallScheduledBatchName(secret.jobName)}`;
  } else if (secret.replicaName.toLowerCase() === 'new jobs') {
    consumer = 'New job';
  } else {
    consumer = `replica: ${smallScheduledBatchName(secret.replicaName)}`;
  }

  return <Typography as="span">{consumer}</Typography>;
};

const ConsumerSecretCreated = ({
  secret,
}: {
  secret: AzureKeyVaultSecretStatusModel;
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
  secret: PropTypes.shape(AzureKeyVaultSecretStatusModelValidationMap),
} as PropTypes.ValidationMap<AzureKeyVaultSecretStateTableRowProps>;
