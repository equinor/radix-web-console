import * as PropTypes from 'prop-types';

import { ConfigurationStatus } from '../configuration-status';
import { SecretType } from '../secret-type';

export interface SecretModel {
  name: string;
  displayName?: string;
  type?: SecretType;
  resource?: string;
  id?: string;
  component: string;
  status: ConfigurationStatus;
}

/* PropTypes validation map for SecretModel */
export const SecretModelValidationMap: PropTypes.ValidationMap<SecretModel> = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  type: PropTypes.oneOf(Object.values(SecretType)),
  resource: PropTypes.string,
  id: PropTypes.string,
  component: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(ConfigurationStatus)).isRequired,
};
