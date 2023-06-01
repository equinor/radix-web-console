import * as PropTypes from 'prop-types';

import { ResourcesModel, ResourcesModelValidationMap } from '../resources';

export interface ResourceRequirementsModel {
  limits?: ResourcesModel;
  requests?: ResourcesModel;
}

/* PropTypes validation map for ResourceRequirementsModel */
export const ResourceRequirementsModelValidationMap: PropTypes.ValidationMap<ResourceRequirementsModel> =
  {
    limits: PropTypes.shape(ResourcesModelValidationMap),
    requests: PropTypes.shape(ResourcesModelValidationMap),
  };
