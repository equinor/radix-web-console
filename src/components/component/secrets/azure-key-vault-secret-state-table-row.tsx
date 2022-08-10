import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { smallReplicaName } from '../../../utils/string';
import {
  AzureKeyVaultSecretStatusModel,
  AzureKeyVaultSecretStatusModelValidationMap,
} from '../../../models/azure-key-vault-secret-status';

export interface AzureKeyVaultSecretStateTableRowProps {
  secretInReplica: AzureKeyVaultSecretStatusModel;
}

export const AzureKeyVaultSecretStateTableRow = (
  props: AzureKeyVaultSecretStateTableRowProps
): JSX.Element => {
  return (
    <Table.Row>
      <Table.Cell>{props.secretInReplica.version}</Table.Cell>
      <Table.Cell>
        <Typography as="span">
          {smallReplicaName(props.secretInReplica.replicaName)}
        </Typography>
      </Table.Cell>
    </Table.Row>
  );
};

AzureKeyVaultSecretStateTableRow.propTypes = {
  secretInReplica: PropTypes.shape(AzureKeyVaultSecretStatusModelValidationMap),
} as PropTypes.ValidationMap<AzureKeyVaultSecretStateTableRowProps>;
