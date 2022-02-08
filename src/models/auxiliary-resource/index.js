import PropTypes from 'prop-types';
import { AuxiliaryResourceDeploymentModel } from '../auxiliary-resource-deployment';
import { AuxiliaryResourceType } from '../auxiliary-resource-type';

export const AuxiliaryResourceModel = Object.freeze({
  type: PropTypes.oneOf(Object.values(AuxiliaryResourceType)).isRequired,
  deployment: PropTypes.shape(AuxiliaryResourceDeploymentModel),
});
