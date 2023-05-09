// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

import { testData as ComponentInventoryResponseData } from './component-inventory-response/test-data';
import { ComponentInventoryResponseModelValidationMap } from './component-inventory-response';
import { ComponentInventoryResponseModelNormalizer } from './component-inventory-response/normalizer';

import { testData as ContainerData } from './container/test-data';
import { ContainerModelValidationMap } from './container';
import { ContainerModelNormalizer } from './container/normalizer';

import { testData as ReplicaData } from './replica/test-data';
import { ReplicaModelValidationMap } from './replica';
import { ReplicaModelNormalizer } from './replica/normalizer';

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
