import * as PropTypes from 'prop-types';

export interface ApplicationRegistrationModel {
  name: string;
  repository: string;
  sharedSecret: string;
  adGroups?: Array<string>;
  owner: string;
  creator: string;
  publicKey?: string;
  privateKey?: string;
  machineUser: boolean;
  wbs: string;
  configBranch: string;
  acknowledgeWarnings?: boolean;
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
    publicKey: PropTypes.string,
    privateKey: PropTypes.string,
    machineUser: PropTypes.bool.isRequired,
    wbs: PropTypes.string.isRequired,
    configBranch: PropTypes.string.isRequired,
    acknowledgeWarnings: PropTypes.bool,
  };
