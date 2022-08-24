import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { smallScheduledBatchName } from '../../../utils/string';
import {
  AzureKeyVaultSecretStatusModel,
  AzureKeyVaultSecretStatusModelValidationMap,
} from '../../../models/azure-key-vault-secret-status';
import { Duration } from '../../time/duration';

export interface AzureKeyVaultSecretStateTableRowProps {
  secretInConsumer: AzureKeyVaultSecretStatusModel;
}

export const AzureKeyVaultSecretStateTableRow = (
  props: AzureKeyVaultSecretStateTableRowProps
): JSX.Element => {
  const getSecretConsumer = (
    secretInConsumer: AzureKeyVaultSecretStatusModel
  ): JSX.Element => {
    if (
      secretInConsumer.batchName != null &&
      secretInConsumer.batchName.length > 0
    )
      return (
        <Typography as="span">
          batch: {smallScheduledBatchName(secretInConsumer.batchName)}
        </Typography>
      );
    if (secretInConsumer.jobName != null && secretInConsumer.jobName.length > 0)
      return (
        <Typography as="span">
          job: {smallScheduledBatchName(secretInConsumer.jobName)}
        </Typography>
      );
    if (secretInConsumer.replicaName.toLowerCase() === 'new jobs')
      return <Typography as="span">New job</Typography>;
    return (
      <Typography as="span">
        replica: {smallScheduledBatchName(secretInConsumer.replicaName)}
      </Typography>
    );
  };
  const getSecretConsumerCreated = (
    secretInConsumer: AzureKeyVaultSecretStatusModel
  ): JSX.Element => {
    if (
      secretInConsumer.batchName != null &&
      secretInConsumer.batchName.length > 0
    )
      return (
        <Duration start={secretInConsumer.batchCreated} end={new Date()} />
      );
    if (
      secretInConsumer.jobName != null &&
      secretInConsumer.jobName.length > 0
    ) {
      return <Duration start={secretInConsumer.jobCreated} end={new Date()} />;
    }
    if (secretInConsumer.replicaName.toLowerCase() === 'new jobs') return <></>;
    return (
      <Typography as="span">
        replica: {secretInConsumer.replicaCreated}
      </Typography>
    );
  };

  return (
    <Table.Row>
      <Table.Cell>{props.secretInConsumer.version}</Table.Cell>
      <Table.Cell>
        <Typography as="span">
          {getSecretConsumer(props.secretInConsumer)}
        </Typography>
      </Table.Cell>
      <Table.Cell>
        {getSecretConsumerCreated(props.secretInConsumer)}
      </Table.Cell>
    </Table.Row>
  );
};

AzureKeyVaultSecretStateTableRow.propTypes = {
  secretInConsumer: PropTypes.shape(
    AzureKeyVaultSecretStatusModelValidationMap
  ),
} as PropTypes.ValidationMap<AzureKeyVaultSecretStateTableRowProps>;
