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

export interface EnvironmentVariableNormalisedModel
  extends EnvironmentVariableModel {
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

/* PropTypes validation map for EnvironmentVariableNormalisedModel */
export const EnvironmentVariableNormalisedModelValidationMap: PropTypes.ValidationMap<EnvironmentVariableNormalisedModel> =
  {
    ...EnvironmentVariableModelValidationMap,
    ...{
      isRadixVariable: PropTypes.bool.isRequired,
    },
  };

/* PropTypes validation map for UpdatableEnvironmentVariableModel */
export const UpdatableEnvironmentVariableModelValidationMap: PropTypes.ValidationMap<UpdatableEnvironmentVariableModel> =
  {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };
