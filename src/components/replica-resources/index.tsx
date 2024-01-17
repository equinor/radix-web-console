import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { ResourceRequirements } from '../../store/radix-api';

export interface ReplicaResourcesProps {
  resources?: ResourceRequirements;
}

export const ReplicaResources: FunctionComponent<ReplicaResourcesProps> = ({
  resources,
}) => (
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
  resources: PropTypes.object as PropTypes.Validator<ResourceRequirements>,
};
