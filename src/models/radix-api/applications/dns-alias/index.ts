import * as PropTypes from 'prop-types';

export interface DNSAliasModel {
  url: string;
  componentName: string;
  environmentName: string;
}

/* PropTypes validation map for ApplicationAliasModel */
export const DNSAliasModelValidationMap: PropTypes.ValidationMap<DNSAliasModel> =
  {
    url: PropTypes.string.isRequired,
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
  };
