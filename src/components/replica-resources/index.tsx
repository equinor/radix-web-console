import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  ResourceRequirementsModel,
  ResourceRequirementsModelValidationMap,
} from '../../models/radix-api/deployments/resource-requirements';

export interface ReplicaResourcesProps {
  resources?: ResourceRequirementsModel;
}

export const ReplicaResources = ({
  resources,
}: ReplicaResourcesProps): React.JSX.Element => (
  <>
    <Typography>
      CPU{' '}
      <strong>
        request {resources?.requests?.cpu ?? 'not set'}, limit{' '}
        {resources?.limits?.cpu ?? 'not set'}{' '}
      </strong>
    </Typography>
    <Typography>
      Memory{' '}
      <strong>
        request {resources?.requests?.memory ?? 'not set'}, limit{' '}
        {resources?.limits?.memory ?? 'not set'}{' '}
      </strong>
    </Typography>
  </>
);

ReplicaResources.propTypes = {
  replicaResources: PropTypes.shape(ResourceRequirementsModelValidationMap),
} as PropTypes.ValidationMap<ReplicaResourcesProps>;
