import * as PropTypes from 'prop-types';

export interface EnvVarMetadataModel {
  radixConfigValue?: string;
}

/* PropTypes validation map for EnvVarMetadataModel */
export const EnvVarMetadataModelValidationMap: PropTypes.ValidationMap<EnvVarMetadataModel> =
  {
    radixConfigValue: PropTypes.string,
  };
