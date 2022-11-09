import * as PropTypes from 'prop-types';

export interface MachineUserModel {
  token: string;
}

/* PropTypes validation map for MachineUserModel */
export const MachineUserModelValidationMap: PropTypes.ValidationMap<MachineUserModel> =
  {
    token: PropTypes.string.isRequired,
  };
