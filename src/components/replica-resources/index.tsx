import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  ReplicaResourcesModel,
  ReplicaResourcesModelValidationMap,
} from '../../models/replica-attributes';

export interface ReplicaResourcesProps {
  replicaResources: ReplicaResourcesModel;
}

export const ReplicaResources = ({
  replicaResources,
}: ReplicaResourcesProps): JSX.Element => {
  return (
    <>
      <Typography>
        CPU{' '}
        <strong>
          request {replicaResources?.requests?.cpu ?? 'not set'}, limit{' '}
          {replicaResources?.limits?.cpu ?? 'not set'}{' '}
        </strong>
      </Typography>
      <Typography>
        Memory{' '}
        <strong>
          request {replicaResources?.requests?.memory ?? 'not set'}, limit{' '}
          {replicaResources?.limits?.memory ?? 'not set'}{' '}
        </strong>
      </Typography>
    </>
  );
};

ReplicaResources.propTypes = {
  replicaResources: PropTypes.shape(ReplicaResourcesModelValidationMap),
} as PropTypes.ValidationMap<ReplicaResourcesProps>;
