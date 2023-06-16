import * as PropTypes from 'prop-types';

export interface DeployKeyAndSecretModel {
  publicDeployKey: string;
  sharedSecret: string;
}

/* PropTypes validation map for DeployKeyAndSecretModel */
export const DeployKeyAndSecretModelValidationMap: PropTypes.ValidationMap<DeployKeyAndSecretModel> =
  {
    publicDeployKey: PropTypes.string.isRequired,
    sharedSecret: PropTypes.string.isRequired,
  };
