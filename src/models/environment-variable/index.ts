import { EnvironmentVariableMetadataModel } from '../environment-variable-metadata';

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
