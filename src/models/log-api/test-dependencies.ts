// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

import { testData as ContainerData } from './container/test-data';
import { ContainerModelValidationMap } from './container';
import { ContainerModelNormalizer } from './container/normalizer';

import { testData as ReplicaData } from './replica/test-data';
import { ReplicaModelValidationMap } from './replica';
import { ReplicaModelNormalizer } from './replica/normalizer';

import { testData as ComponentInventoryResponseData } from './component-inventory-response/test-data';
import { ComponentInventoryResponseModelValidationMap } from './component-inventory-response';
import { ComponentInventoryResponseModelNormalizer } from './component-inventory-response/normalizer';

interface TestDependencyComponents<T> {
  Container: T;
  Replica: T;
  ComponentInventoryResponse: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  Container: ContainerData,
  Replica: ReplicaData,
  ComponentInventoryResponse: ComponentInventoryResponseData,
};

export const models: TestDependencyComponents<ValidationMap<any>> = {
  Container: ContainerModelValidationMap,
  Replica: ReplicaModelValidationMap,
  ComponentInventoryResponse: ComponentInventoryResponseModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  Container: ContainerModelNormalizer,
  Replica: ReplicaModelNormalizer,
  ComponentInventoryResponse: ComponentInventoryResponseModelNormalizer,
};
