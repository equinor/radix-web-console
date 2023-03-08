import * as PropTypes from 'prop-types';

export interface DeployKeyAndSecretModel {
  deployKey: string;
  sharedSecret: string;
}
/* PropTypes validation map for DeployKeyAndSecretModel */
export const DeployKeyAndSecretModelValidationMap: PropTypes.ValidationMap<DeployKeyAndSecretModel> =
  {
    deployKey: PropTypes.string.isRequired,
    sharedSecret: PropTypes.string.isRequired,
  };
