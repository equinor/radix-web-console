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

import { testData as ComponentScanData } from './component-scan/test-data';
import { ComponentScanModelValidationMap } from './component-scan';
import { ComponentScanModelNormalizer } from './component-scan/normalizer';

import { testData as EnvironmentScanSummaryData } from './environment-scan-summary/test-data';
import { EnvironmentScanSummaryModelValidationMap } from './environment-scan-summary';
import { EnvironmentScanSummaryModelNormalizer } from './environment-scan-summary/normalizer';

import { testData as ScanData } from './scan/test-data';
import { ScanModelValidationMap } from './scan';
import { ScanModelNormalizer } from './scan/normalizer';

import { testData as ServiceNowApplicationData } from './service-now-application/test-data';
import { ServiceNowApplicationModelValidationMap } from './service-now-application';
import { ServiceNowApplicationModelNormalizer } from './service-now-application/normalizer';

import { testData as VulnerabilityData } from './vulnerability/test-data';
import { VulnerabilityModelValidationMap } from './vulnerability';
import { VulnerabilityModelNormalizer } from './vulnerability/normalizer';

import { testData as VulnerabilitySummaryData } from './vulnerability-summary/test-data';
import { VulnerabilitySummaryModelValidationMap } from './vulnerability-summary';
import { VulnerabilitySummaryModelNormalizer } from './vulnerability-summary/normalizer';

interface TestDependencyComponents<T> {
  ApplicationCost: T;
  ApplicationCostSet: T;
  ComponentScan: T;
  EnvironmentScanSummary: T;
  Scan: T;
  ServiceNowApplication: T;
  Vulnerability: T;
  VulnerabilitySummary: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  ApplicationCost: ApplicationCostData,
  ApplicationCostSet: ApplicationCostSetData,
  ComponentScan: ComponentScanData,
  EnvironmentScanSummary: EnvironmentScanSummaryData,
  Scan: ScanData,
  ServiceNowApplication: ServiceNowApplicationData,
  Vulnerability: VulnerabilityData,
  VulnerabilitySummary: VulnerabilitySummaryData,
};

export const models: TestDependencyComponents<ValidationMap<any>> = {
  ApplicationCost: ApplicationCostModelValidationMap,
  ApplicationCostSet: ApplicationCostSetModelValidationMap,
  ComponentScan: ComponentScanModelValidationMap,
  EnvironmentScanSummary: EnvironmentScanSummaryModelValidationMap,
  Scan: ScanModelValidationMap,
  ServiceNowApplication: ServiceNowApplicationModelValidationMap,
  Vulnerability: VulnerabilityModelValidationMap,
  VulnerabilitySummary: VulnerabilitySummaryModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  ApplicationCost: ApplicationCostModelNormalizer,
  ApplicationCostSet: ApplicationCostSetModelNormalizer,
  ComponentScan: ComponentScanModelNormalizer,
  EnvironmentScanSummary: EnvironmentScanSummaryModelNormalizer,
  Scan: ScanModelNormalizer,
  ServiceNowApplication: ServiceNowApplicationModelNormalizer,
  Vulnerability: VulnerabilityModelNormalizer,
  VulnerabilitySummary: VulnerabilitySummaryModelNormalizer,
};
