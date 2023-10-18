// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

import { testData as EnvironmentVulnerabilitiesData } from './models/environment-vulnerabilities/test-data';
import { EnvironmentVulnerabilitiesModelValidationMap } from './models/environment-vulnerabilities';
import { EnvironmentVulnerabilitiesModelNormalizer } from './models/environment-vulnerabilities/normalizer';

import { testData as ImageData } from './models/image/test-data';
import { ImageModelValidationMap } from './models/image';
import { ImageModelNormalizer } from './models/image/normalizer';

import { testData as ImageScanData } from './models/image-scan/test-data';
import { ImageScanModelValidationMap } from './models/image-scan';
import { ImageScanModelNormalizer } from './models/image-scan/normalizer';

import { testData as ImageWithLastScanData } from './models/image-with-last-scan/test-data';
import { ImageWithLastScanModelValidationMap } from './models/image-with-last-scan';
import { ImageWithLastScanModelNormalizer } from './models/image-with-last-scan/normalizer';

import { testData as VulnerabilityData } from './models/vulnerability/test-data';
import { VulnerabilityModelValidationMap } from './models/vulnerability';
import { VulnerabilityModelNormalizer } from './models/vulnerability/normalizer';

import { testData as VulnerabilitySummaryData } from './models/vulnerability-summary/test-data';
import { VulnerabilitySummaryModelValidationMap } from './models/vulnerability-summary';
import { VulnerabilitySummaryModelNormalizer } from './models/vulnerability-summary/normalizer';

interface TestDependencyComponents<T> {
  EnvironmentVulnerabilities: T;
  Image: T;
  ImageScan: T;
  ImageWithLastScan: T;
  Vulnerability: T;
  VulnerabilitySummary: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  EnvironmentVulnerabilities: EnvironmentVulnerabilitiesData,
  Image: ImageData,
  ImageScan: ImageScanData,
  ImageWithLastScan: ImageWithLastScanData,
  Vulnerability: VulnerabilityData,
  VulnerabilitySummary: VulnerabilitySummaryData,
};

export const models: TestDependencyComponents<
  ValidationMap<Record<string, unknown>>
> = {
  EnvironmentVulnerabilities: EnvironmentVulnerabilitiesModelValidationMap,
  Image: ImageModelValidationMap,
  ImageScan: ImageScanModelValidationMap,
  ImageWithLastScan: ImageWithLastScanModelValidationMap,
  Vulnerability: VulnerabilityModelValidationMap,
  VulnerabilitySummary: VulnerabilitySummaryModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  EnvironmentVulnerabilities: EnvironmentVulnerabilitiesModelNormalizer,
  Image: ImageModelNormalizer,
  ImageScan: ImageScanModelNormalizer,
  ImageWithLastScan: ImageWithLastScanModelNormalizer,
  Vulnerability: VulnerabilityModelNormalizer,
  VulnerabilitySummary: VulnerabilitySummaryModelNormalizer,
};
