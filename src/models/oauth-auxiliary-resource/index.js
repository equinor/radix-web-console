import PropTypes from 'prop-types';
import { AuxiliaryResourceDeploymentModel } from '../auxiliary-resource-deployment';

export const OAuthAuxiliaryResourceModel = Object.freeze({
  deployment: PropTypes.shape(AuxiliaryResourceDeploymentModel).isRequired,
});
