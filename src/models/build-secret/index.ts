import * as PropTypes from 'prop-types';

import { BuildSecretStatus } from '../build-secret-status';

export interface BuildSecretModel {
  name: string;
  status?: BuildSecretStatus;
}

/* PropTypes validation map for BuildSecretModel */
export const BuildSecretModelValidationMap: PropTypes.ValidationMap<BuildSecretModel> =
  {
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(BuildSecretStatus)),
  };
