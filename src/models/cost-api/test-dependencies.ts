// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

import { testData as ApplicationCostData } from './models/application-cost/test-data';
import { ApplicationCostModelValidationMap } from './models/application-cost';
import { ApplicationCostModelNormalizer } from './models/application-cost/normalizer';

import { testData as ApplicationCostSetData } from './models/application-cost-set/test-data';
import { ApplicationCostSetModelValidationMap } from './models/application-cost-set';
import { ApplicationCostSetModelNormalizer } from './models/application-cost-set/normalizer';

interface TestDependencyComponents<T> {
  ApplicationCost: T;
  ApplicationCostSet: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  ApplicationCost: ApplicationCostData,
  ApplicationCostSet: ApplicationCostSetData,
};

export const models: TestDependencyComponents<
  ValidationMap<Record<string, unknown>>
> = {
  ApplicationCost: ApplicationCostModelValidationMap,
  ApplicationCostSet: ApplicationCostSetModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  ApplicationCost: ApplicationCostModelNormalizer,
  ApplicationCostSet: ApplicationCostSetModelNormalizer,
};
