// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from './model-types';

import { testData as ScanData } from './scan/test-data';
import { ScanModelValidationMap } from './scan';
import { ScanModelNormalizer } from './scan/normalizer';

import { testData as ServiceNowApplicationData } from './service-now-application/test-data';
import { ServiceNowApplicationModelValidationMap } from './service-now-application';
import { ServiceNowApplicationModelNormalizer } from './service-now-application/normalizer';

interface TestDependencyComponents<T> {
  Scan: T;
  ServiceNowApplication: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  Scan: ScanData,
  ServiceNowApplication: ServiceNowApplicationData,
};

export const models: TestDependencyComponents<ValidationMap<any>> = {
  Scan: ScanModelValidationMap,
  ServiceNowApplication: ServiceNowApplicationModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  Scan: ScanModelNormalizer,
  ServiceNowApplication: ServiceNowApplicationModelNormalizer,
};
