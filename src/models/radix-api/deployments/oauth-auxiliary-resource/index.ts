import * as PropTypes from 'prop-types';

import {
  AuxiliaryResourceDeploymentModel,
  AuxiliaryResourceDeploymentModelValidationMap,
} from '../auxiliary-resource-deployment';

export interface OAuthAuxiliaryResourceModel {
  deployment: AuxiliaryResourceDeploymentModel;
}

/* PropTypes validation map for OAuthAuxiliaryResourceModel */
export const OAuthAuxiliaryResourceModelValidationMap: PropTypes.ValidationMap<OAuthAuxiliaryResourceModel> =
  {
    deployment: PropTypes.shape(AuxiliaryResourceDeploymentModelValidationMap)
      .isRequired as PropTypes.Validator<AuxiliaryResourceDeploymentModel>,
  };
