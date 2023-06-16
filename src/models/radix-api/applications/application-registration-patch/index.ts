import * as PropTypes from 'prop-types';

export interface ApplicationRegistrationPatchModel {
  adGroups?: Array<string>;
  owner?: string;
  machineUser?: boolean;
  repository?: string;
  wbs?: string;
  configBranch?: string;
  radixConfigFullName?: string;
  configurationItem?: string;
}

/* PropTypes validation map for ApplicationRegistrationPatchModel */
export const ApplicationRegistrationPatchModelValidationMap: PropTypes.ValidationMap<ApplicationRegistrationPatchModel> =
  {
    adGroups: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.string,
    machineUser: PropTypes.bool,
    repository: PropTypes.string,
    wbs: PropTypes.string,
    configBranch: PropTypes.string,
    radixConfigFullName: PropTypes.string,
    configurationItem: PropTypes.string,
  };
