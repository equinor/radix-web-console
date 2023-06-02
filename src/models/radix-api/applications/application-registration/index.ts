import * as PropTypes from 'prop-types';

export interface ApplicationRegistrationModel {
  name: string;
  repository: string;
  sharedSecret: string;
  adGroups?: Array<string>;
  owner: string;
  creator: string;
  machineUser: boolean;
  wbs: string;
  configBranch: string;
  radixConfigFullName?: string;
  configurationItem?: string;
  publicKey?: string; // deprecated: no longer present in api model
}

/* PropTypes validation map for ApplicationRegistrationModel */
export const ApplicationRegistrationModelValidationMap: PropTypes.ValidationMap<ApplicationRegistrationModel> =
  {
    name: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    sharedSecret: PropTypes.string.isRequired,
    adGroups: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    machineUser: PropTypes.bool.isRequired,
    wbs: PropTypes.string.isRequired,
    configBranch: PropTypes.string.isRequired,
    radixConfigFullName: PropTypes.string,
    configurationItem: PropTypes.string,
    publicKey: PropTypes.string,
  };
