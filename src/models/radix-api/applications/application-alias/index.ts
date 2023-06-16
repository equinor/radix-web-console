import * as PropTypes from 'prop-types';

export interface ApplicationAliasModel {
  url: string;
  componentName: string;
  environmentName: string;
}

/* PropTypes validation map for ApplicationAliasModel */
export const ApplicationAliasModelValidationMap: PropTypes.ValidationMap<ApplicationAliasModel> =
  {
    url: PropTypes.string.isRequired,
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
  };
