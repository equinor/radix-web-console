import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  ReplicaResourcesModel,
  ReplicaResourcesModelValidationMap,
} from '../../models/replica-attributes';

export interface ReplicaResourcesProps {
  resources: ReplicaResourcesModel;
}

export const ReplicaResources = ({
  resources: { limits, requests },
}: ReplicaResourcesProps): JSX.Element => {
  return (
    <>
      <Typography>
        CPU{' '}
        <strong>
          request {requests?.cpu ?? 'not set'}, limit {limits?.cpu ?? 'not set'}{' '}
        </strong>
      </Typography>
      <Typography>
        Memory{' '}
        <strong>
          request {requests?.memory ?? 'not set'}, limit{' '}
          {limits?.memory ?? 'not set'}{' '}
        </strong>
      </Typography>
    </>
  );
};

ReplicaResources.propTypes = {
  replicaResources: PropTypes.shape(ReplicaResourcesModelValidationMap),
} as PropTypes.ValidationMap<ReplicaResourcesProps>;
