import * as PropTypes from 'prop-types';

import {
  EnvVarMetadataModel,
  EnvVarMetadataModelValidationMap,
} from '../env-var-metadata';

export interface EnvVarModel {
  name: string;
  value: string;
  metadata?: EnvVarMetadataModel;
}

export interface EnvVarNormalizedModel extends EnvVarModel {
  isRadixVariable: boolean;
}

export interface UpdatableEnvVarModel {
  name: string;
  value: string;
}

/* PropTypes validation map for EnvVarModel */
export const EnvVarModelValidationMap: PropTypes.ValidationMap<EnvVarModel> = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  metadata: PropTypes.shape(EnvVarMetadataModelValidationMap),
};

/* PropTypes validation map for EnvVarNormalizedModel */
export const EnvVarNormalizedModelValidationMap: PropTypes.ValidationMap<EnvVarNormalizedModel> =
  {
    ...EnvVarModelValidationMap,
    isRadixVariable: PropTypes.bool.isRequired,
  };

/* PropTypes validation map for UpdatableEnvVarModel */
export const UpdatableEnvVarModelValidationMap: PropTypes.ValidationMap<UpdatableEnvVarModel> =
  {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };
