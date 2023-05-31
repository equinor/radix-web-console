import * as PropTypes from 'prop-types';

export interface ResourcesModel {
  cpu?: string;
  memory?: string;
}

/* PropTypes validation map for ResourcesModel */
export const ResourcesModelValidationMap: PropTypes.ValidationMap<ResourcesModel> =
  {
    cpu: PropTypes.string,
    memory: PropTypes.string,
  };
