import * as PropTypes from 'prop-types';

export interface ApplicationRegistrationModel {
  name: string;
  repository: string;
  sharedSecret: string;
  adGroups?: Array<string>;
  readerAdGroups?: Array<string>;
  owner: string;
  creator: string;
  wbs: string;
  configBranch: string;
  radixConfigFullName?: string;
  configurationItem?: string;
}

/* PropTypes validation map for ApplicationRegistrationModel */
export const ApplicationRegistrationModelValidationMap: PropTypes.ValidationMap<ApplicationRegistrationModel> =
  {
    name: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    sharedSecret: PropTypes.string.isRequired,
    adGroups: PropTypes.arrayOf(PropTypes.string),
    readerAdGroups: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    wbs: PropTypes.string.isRequired,
    configBranch: PropTypes.string.isRequired,
    radixConfigFullName: PropTypes.string,
    configurationItem: PropTypes.string,
  };
