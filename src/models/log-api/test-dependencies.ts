// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

import { testData as ContainerData } from './models/container/test-data';
import { ContainerModelValidationMap } from './models/container';
import { ContainerModelNormalizer } from './models/container/normalizer';

import { testData as InventoryResponseData } from './models/inventory-response/test-data';
import { InventoryResponseModelValidationMap } from './models/inventory-response';
import { InventoryResponseModelNormalizer } from './models/inventory-response/normalizer';

import { testData as ReplicaData } from './models/replica/test-data';
import { ReplicaModelValidationMap } from './models/replica';
import { ReplicaModelNormalizer } from './models/replica/normalizer';

interface TestDependencyComponents<T> {
  Container: T;
  InventoryResponse: T;
  Replica: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  Container: ContainerData,
  InventoryResponse: InventoryResponseData,
  Replica: ReplicaData,
};

export const models: TestDependencyComponents<
  ValidationMap<Record<string, unknown>>
> = {
  Container: ContainerModelValidationMap,
  InventoryResponse: InventoryResponseModelValidationMap,
  Replica: ReplicaModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  Container: ContainerModelNormalizer,
  InventoryResponse: InventoryResponseModelNormalizer,
  Replica: ReplicaModelNormalizer,
};
