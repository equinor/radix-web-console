import * as PropTypes from 'prop-types';

export interface EnvironmentVariableMetadataModel {
  radixConfigValue?: string;
}

/* PropTypes validation map for EnvironmentVariableMetadataModel */
export const EnvironmentVariableMetadataModelValidationMap: PropTypes.ValidationMap<EnvironmentVariableMetadataModel> =
  {
    radixConfigValue: PropTypes.string,
  };
