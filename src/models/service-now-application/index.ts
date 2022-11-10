import * as PropTypes from 'prop-types';

export interface ServiceNowApplicationModel {
  id: string;
  name: string;
  number?: string;
  productOwner?: string;
  technicalContactPersons?: string;
  description?: string;
}

/* PropTypes validation map for SecretModel */
export const ServiceNowApplicationModelValidationMap: PropTypes.ValidationMap<ServiceNowApplicationModel> =
  {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string,
    productOwner: PropTypes.string,
    technicalContactPersons: PropTypes.string,
    description: PropTypes.string,
  };
