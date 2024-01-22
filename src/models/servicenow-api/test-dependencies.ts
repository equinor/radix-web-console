// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

import { testData as ApplicationData } from './models/service-now-application/test-data';
import { ApplicationModelValidationMap } from './models/service-now-application';
import { ApplicationModelNormalizer } from './models/service-now-application/normalizer';

interface TestDependencyComponents<T> {
  Application: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  Application: ApplicationData,
};
