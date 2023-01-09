import * as PropTypes from 'prop-types';

import { ComponentModel, ComponentModelValidationMap } from '../component';

export interface DeploymentModel {
  name: string;
  namespace: string;
  components?: Array<ComponentModel>;
  createdByJob: string;
  environment: string;
  activeFrom?: Date;
  activeTo?: Date;
  gitCommitHash?: string;
  gitTags?: string;
  repository?: string;
}

/* PropTypes validation map for DeploymentModel */
export const DeploymentModelValidationMap: PropTypes.ValidationMap<DeploymentModel> =
  {
    name: PropTypes.string.isRequired,
    namespace: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(
      PropTypes.shape(
        ComponentModelValidationMap
      ) as PropTypes.Requireable<ComponentModel>
    ),
    createdByJob: PropTypes.string.isRequired,
    environment: PropTypes.string.isRequired,
    activeFrom: PropTypes.instanceOf(Date),
    activeTo: PropTypes.instanceOf(Date),
    gitCommitHash: PropTypes.string,
    gitTags: PropTypes.string,
    repository: PropTypes.string,
  };
