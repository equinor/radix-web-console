import * as PropTypes from 'prop-types';

export interface UpdateSlackConfigSecretsModel {
  webhookUrl?: string;
}

/* PropTypes validation map for UpdateSlackConfigSecretsModel */
export const UpdateSlackConfigSecretsModelValidationMap: PropTypes.ValidationMap<UpdateSlackConfigSecretsModel> =
  {
    webhookUrl: PropTypes.string,
  };
