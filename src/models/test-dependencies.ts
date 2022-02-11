// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from './model-types';

import { testData as ApplicationData } from './application/test-data';
import { ApplicationModelValidationMap } from './application';
import { ApplicationModelNormalizer } from './application/normalizer';

import applicationCostData from './application-cost/test-data';
import applicationCostModel from './application-cost';
import applicationCostNormaliser from './application-cost/normaliser';

import { testData as ApplicationRegistrationData } from './application-registration/test-data';
import { ApplicationRegistrationModelValidationMap } from './application-registration';
import { ApplicationRegistrationModelNormalizer } from './application-registration/normalizer';

import { testData as ApplicationSummaryData } from './application-summary/test-data';
import { ApplicationSummaryModelValidationMap } from './application-summary';
import { ApplicationSummaryModelNormalizer } from './application-summary/normalizer';

import componentSummaryData from './component-summary/test-data';
import componentSummaryModel from './component-summary';
import componentSummaryNormaliser from './component-summary/normaliser';

import { testData as DeploymentSummaryData } from './deployment-summary/test-data';
import { DeploymentSummaryModelValidationMap } from './deployment-summary';
import { DeploymentSummaryModelNormalizer } from './deployment-summary/normalizer';

import { testData as EnvironmentSummaryData } from './environment-summary/test-data';
import { EnvironmentSummaryModelValidationMap } from './environment-summary';
import { EnvironmentSummaryModelNormalizer } from './environment-summary/normalizer';

import { testData as EnvironmentVariableData } from './environment-variable/test-data';
import { EnvironmentVariableNormalizedModelValidationMap } from './environment-variable';
import { EnvironmentVariableModelNormalizer } from './environment-variable/normalizer';

import { testData as EnvironmentVariableMetadataData } from './environment-variable-metadata/test-data';
import { EnvironmentVariableMetadataModelValidationMap } from './environment-variable-metadata';
import { EnvironmentVariableMetadataModelNormalizer } from './environment-variable-metadata/normalizer';

import eventData from './event/test-data';
import eventModel from './event';
import eventNormaliser from './event/normaliser';

import jobData from './job/test-data';
import jobModel from './job';
import jobNormaliser from './job/normaliser';

import { testData as JobSummaryData } from './job-summary/test-data';
import { JobSummaryModelValidationMap } from './job-summary';
import { JobSummaryModelNormalizer } from './job-summary/normalizer';

import objectStateData from './object-state/test-data';
import objectStateModel from './object-state';
import objectStateNormaliser from './object-state/normaliser';

import podStateData from './pod-state/test-data';
import podStateModel from './pod-state';
import podStateNormaliser from './pod-state/normaliser';

import { testData as ReplicaSummaryData } from './replica-summary/test-data';
import { ReplicaSummaryNormalizedModelValidationMap } from './replica-summary';
import { ReplicaSummaryModelNormalizer } from './replica-summary/normalizer';

import { testData as ScanData } from './scan/test-data';
import { ScanModelValidationMap } from './scan';
import { ScanModelNormalizer } from './scan/normalizer';

import { testData as SecretData } from './secret/test-data';
import { SecretModelValidationMap } from './secret';
import { SecretModelNormalizer } from './secret/normalizer';

import stepData from './step/test-data';
import stepModel from './step';
import stepNormaliser from './step/normaliser';

import vulnerabilityData from './vulnerability/test-data';
import vulnerabilityModel from './vulnerability';
import vulnerabilityNormaliser from './vulnerability/normaliser';

import { testData as VulnerabilitySummaryData } from './vulnerability-summary/test-data';
import { VulnerabilitySummaryModelValidationMap } from './vulnerability-summary';
import { VulnerabilitySummaryModelNormalizer } from './vulnerability-summary/normalizer';

interface TestDependencyComponents<T> {
  Application: T;
  ApplicationCost: T;
  ApplicationRegistration: T;
  ApplicationSummary: T;
  ComponentSummary: T;
  DeploymentSummary: T;
  EnvironmentSummary: T;
  EnvironmentVariable: T;
  EnvironmentVariableMetadata: T;
  Event: T;
  Job: T;
  JobSummary: T;
  ObjectState: T;
  PodState: T;
  ReplicaSummary: T;
  Scan: T;
  Secret: T;
  Step: T;
  Vulnerability: T;
  VulnerabilitySummary: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  Application: ApplicationData,
  ApplicationCost: applicationCostData,
  ApplicationRegistration: ApplicationRegistrationData,
  ApplicationSummary: ApplicationSummaryData,
  ComponentSummary: componentSummaryData,
  DeploymentSummary: DeploymentSummaryData,
  EnvironmentSummary: EnvironmentSummaryData,
  EnvironmentVariable: EnvironmentVariableData,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataData,
  Event: eventData,
  Job: jobData,
  JobSummary: JobSummaryData,
  ObjectState: objectStateData,
  PodState: podStateData,
  ReplicaSummary: ReplicaSummaryData,
  Scan: ScanData,
  Secret: SecretData,
  Step: stepData,
  Vulnerability: vulnerabilityData,
  VulnerabilitySummary: VulnerabilitySummaryData,
};

export const models: TestDependencyComponents<ValidationMap<any>> = {
  Application: ApplicationModelValidationMap,
  ApplicationCost: applicationCostModel,
  ApplicationRegistration: ApplicationRegistrationModelValidationMap,
  ApplicationSummary: ApplicationSummaryModelValidationMap,
  ComponentSummary: componentSummaryModel,
  DeploymentSummary: DeploymentSummaryModelValidationMap,
  EnvironmentSummary: EnvironmentSummaryModelValidationMap,
  EnvironmentVariable: EnvironmentVariableNormalizedModelValidationMap,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelValidationMap,
  Event: eventModel,
  Job: jobModel,
  JobSummary: JobSummaryModelValidationMap,
  ObjectState: objectStateModel,
  PodState: podStateModel,
  ReplicaSummary: ReplicaSummaryNormalizedModelValidationMap,
  Scan: ScanModelValidationMap,
  Secret: SecretModelValidationMap,
  Step: stepModel,
  Vulnerability: vulnerabilityModel,
  VulnerabilitySummary: VulnerabilitySummaryModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  Application: ApplicationModelNormalizer,
  ApplicationCost: applicationCostNormaliser,
  ApplicationRegistration: ApplicationRegistrationModelNormalizer,
  ApplicationSummary: ApplicationSummaryModelNormalizer,
  ComponentSummary: componentSummaryNormaliser,
  DeploymentSummary: DeploymentSummaryModelNormalizer,
  EnvironmentSummary: EnvironmentSummaryModelNormalizer,
  EnvironmentVariable: EnvironmentVariableModelNormalizer,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelNormalizer,
  Event: eventNormaliser,
  Job: jobNormaliser,
  JobSummary: JobSummaryModelNormalizer,
  ObjectState: objectStateNormaliser,
  PodState: podStateNormaliser,
  ReplicaSummary: ReplicaSummaryModelNormalizer,
  Scan: ScanModelNormalizer,
  Secret: SecretModelNormalizer,
  Step: stepNormaliser,
  Vulnerability: vulnerabilityNormaliser,
  VulnerabilitySummary: VulnerabilitySummaryModelNormalizer,
};
