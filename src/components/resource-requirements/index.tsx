import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  ResourceRequirementsModel,
  ResourceRequirementsModelValidationMap,
} from '../../models/radix-api/deployments/resource-requirements';

export interface ResourceRequirementsProps {
  resources?: ResourceRequirementsModel;
}

export const ResourceRequirements: FunctionComponent<
  ResourceRequirementsProps
> = ({ resources }) => (
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

ResourceRequirements.propTypes = {
  resources: PropTypes.shape(
    ResourceRequirementsModelValidationMap
  ) as PropTypes.Validator<ResourceRequirementsModel>,
};
