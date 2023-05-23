// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

import { testData as ComponentInventoryResponseData } from './models/component-inventory-response/test-data';
import { ComponentInventoryResponseModelValidationMap } from './models/component-inventory-response';
import { ComponentInventoryResponseModelNormalizer } from './models/component-inventory-response/normalizer';

import { testData as ContainerData } from './models/container/test-data';
import { ContainerModelValidationMap } from './models/container';
import { ContainerModelNormalizer } from './models/container/normalizer';

import { testData as ReplicaData } from './models/replica/test-data';
import { ReplicaModelValidationMap } from './models/replica';
import { ReplicaModelNormalizer } from './models/replica/normalizer';

interface TestDependencyComponents<T> {
  ComponentInventoryResponse: T;
  Container: T;
  Replica: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  ComponentInventoryResponse: ComponentInventoryResponseData,
  Container: ContainerData,
  Replica: ReplicaData,
};

export const models: TestDependencyComponents<ValidationMap<any>> = {
  ComponentInventoryResponse: ComponentInventoryResponseModelValidationMap,
  Container: ContainerModelValidationMap,
  Replica: ReplicaModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  ComponentInventoryResponse: ComponentInventoryResponseModelNormalizer,
  Container: ContainerModelNormalizer,
  Replica: ReplicaModelNormalizer,
};
