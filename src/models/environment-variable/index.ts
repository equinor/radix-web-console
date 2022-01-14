import * as PropTypes from 'prop-types';

import {
  EnvironmentVariableMetadataModel,
  EnvironmentVariableMetadataModelValidationMap,
} from '../environment-variable-metadata';

export interface EnvironmentVariableModel {
  name: string;
  value: string;
  metadata?: EnvironmentVariableMetadataModel;
}

export interface EnvironmentVariableNormalizedModel
  extends EnvironmentVariableModel {
  isChanged: boolean;
  isRadixVariable: boolean;
}

export interface UpdatableEnvironmentVariableModel {
  name: string;
  value: string;
}

/* PropTypes validation map for EnvironmentVariableModel */
export const EnvironmentVariableModelValidationMap: PropTypes.ValidationMap<EnvironmentVariableModel> =
  {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    metadata: PropTypes.shape(EnvironmentVariableMetadataModelValidationMap),
  };

/* PropTypes validation map for EnvironmentVariableNormalizedModel */
export const EnvironmentVariableNormalizedModelValidationMap: PropTypes.ValidationMap<EnvironmentVariableNormalizedModel> =
  {
    ...EnvironmentVariableModelValidationMap,
    ...{
      isChanged: PropTypes.bool.isRequired,
      isRadixVariable: PropTypes.bool.isRequired,
    },
  };

/* PropTypes validation map for UpdatableEnvironmentVariableModel */
export const UpdatableEnvironmentVariableModelValidationMap: PropTypes.ValidationMap<UpdatableEnvironmentVariableModel> =
  {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };
