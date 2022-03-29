import * as PropTypes from 'prop-types';

import { ComponentModel, ComponentModelValidationMap } from '../component';

export interface DeploymentModel {
  name: string;
  components?: Array<ComponentModel>;
  createdByJob: string;
  environment: string;
  activeFrom?: Date;
  activeTo?: Date;
}

/* PropTypes validation map for DeploymentModel */
export const DeploymentModelValidationMap: PropTypes.ValidationMap<DeploymentModel> =
  {
    name: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(
      PropTypes.shape(
        ComponentModelValidationMap
      ) as PropTypes.Requireable<ComponentModel>
    ),
    createdByJob: PropTypes.string.isRequired,
    environment: PropTypes.string.isRequired,
    activeFrom: PropTypes.instanceOf(Date),
    activeTo: PropTypes.instanceOf(Date),
  };
