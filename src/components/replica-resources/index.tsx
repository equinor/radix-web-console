import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  ReplicaResourcesNormalizedModel,
  ReplicaResourcesNormalizedModelValidationMap,
} from '../../models/replica-attributes';

export interface ReplicaResourcesProps {
  replicaResources: ReplicaResourcesNormalizedModel;
}

export const ReplicaResources = ({
  replicaResources,
}: ReplicaResourcesProps): JSX.Element => {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.Cell>CPU</Table.Cell>
          <Table.Cell>Memory</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Typography>Requests</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography>{replicaResources?.requests?.cpu}</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography>{replicaResources?.requests?.memory}</Typography>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Typography>Limits</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography>{replicaResources?.limits?.cpu}</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography>{replicaResources?.limits?.memory}</Typography>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

ReplicaResources.propTypes = {
  replicaResources: PropTypes.shape(
    ReplicaResourcesNormalizedModelValidationMap
  ),
} as PropTypes.ValidationMap<ReplicaResourcesProps>;
