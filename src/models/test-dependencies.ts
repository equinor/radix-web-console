// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from './model-types';

import { testData as ApplicationCostData } from './application-cost/test-data';
import { ApplicationCostModelValidationMap } from './application-cost';
import { ApplicationCostModelNormalizer } from './application-cost/normalizer';

import { testData as ApplicationCostSetData } from './application-cost-set/test-data';
import { ApplicationCostSetModelValidationMap } from './application-cost-set';
import { ApplicationCostSetModelNormalizer } from './application-cost-set/normalizer';

import { testData as ScanData } from './scan/test-data';
import { ScanModelValidationMap } from './scan';
import { ScanModelNormalizer } from './scan/normalizer';

import { testData as ServiceNowApplicationData } from './service-now-application/test-data';
import { ServiceNowApplicationModelValidationMap } from './service-now-application';
import { ServiceNowApplicationModelNormalizer } from './service-now-application/normalizer';

interface TestDependencyComponents<T> {
  ApplicationCost: T;
  ApplicationCostSet: T;
  Scan: T;
  ServiceNowApplication: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  ApplicationCost: ApplicationCostData,
  ApplicationCostSet: ApplicationCostSetData,
  Scan: ScanData,
  ServiceNowApplication: ServiceNowApplicationData,
};

export const models: TestDependencyComponents<ValidationMap<any>> = {
  ApplicationCost: ApplicationCostModelValidationMap,
  ApplicationCostSet: ApplicationCostSetModelValidationMap,
  Scan: ScanModelValidationMap,
  ServiceNowApplication: ServiceNowApplicationModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  ApplicationCost: ApplicationCostModelNormalizer,
  ApplicationCostSet: ApplicationCostSetModelNormalizer,
  Scan: ScanModelNormalizer,
  ServiceNowApplication: ServiceNowApplicationModelNormalizer,
};
