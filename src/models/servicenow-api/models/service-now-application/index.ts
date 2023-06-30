import * as PropTypes from 'prop-types';

export interface ApplicationModel {
  id: string;
  number?: string;
  name: string;
  description?: string;
  productOwner?: string;
  technicalContactPersons?: string;
}

/* PropTypes validation map for ApplicationModel */
export const ApplicationModelValidationMap: PropTypes.ValidationMap<ApplicationModel> =
  {
    id: PropTypes.string.isRequired,
    number: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    productOwner: PropTypes.string,
    technicalContactPersons: PropTypes.string,
  };
