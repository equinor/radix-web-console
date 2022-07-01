import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { smallReplicaName } from '../../../utils/string';
import {
  AzureKeyVaultSecretStatusModel,
  AzureKeyVaultSecretStatusModelValidationMap,
} from '../../../models/azure-key-vault-secret-status';

export interface AzureKeyVaultSecretStateTableRowProps {
  status: AzureKeyVaultSecretStatusModel;
}

export const AzureKeyVaultSecretStateTableRow = (
  props: AzureKeyVaultSecretStateTableRowProps
): JSX.Element => {
  return (
    <Table.Row>
      <Table.Cell>{props.status.version}</Table.Cell>
      <Table.Cell>
        <Typography link as="span">
          {smallReplicaName(props.status.replicaName)}
        </Typography>
      </Table.Cell>
    </Table.Row>
  );
};

AzureKeyVaultSecretStateTableRow.propTypes = {
  status: PropTypes.shape(AzureKeyVaultSecretStatusModelValidationMap),
} as PropTypes.ValidationMap<AzureKeyVaultSecretStateTableRowProps>;
