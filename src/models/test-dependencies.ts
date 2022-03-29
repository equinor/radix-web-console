// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from './model-types';

import { testData as ApplicationData } from './application/test-data';
import { ApplicationModelValidationMap } from './application';
import { ApplicationModelNormalizer } from './application/normalizer';

import { testData as ApplicationCostData } from './application-cost/test-data';
import { ApplicationCostModelValidationMap } from './application-cost';
import { ApplicationCostModelNormalizer } from './application-cost/normalizer';

import { testData as ApplicationCostSetData } from './application-cost-set/test-data';
import { ApplicationCostSetModelValidationMap } from './application-cost-set';
import { ApplicationCostSetModelNormalizer } from './application-cost-set/normalizer';

import { testData as ApplicationRegistrationData } from './application-registration/test-data';
import { ApplicationRegistrationModelValidationMap } from './application-registration';
import { ApplicationRegistrationModelNormalizer } from './application-registration/normalizer';

import { testData as ApplicationSummaryData } from './application-summary/test-data';
import { ApplicationSummaryModelValidationMap } from './application-summary';
import { ApplicationSummaryModelNormalizer } from './application-summary/normalizer';

import { testData as AuxiliaryResourceDeploymentData } from './auxiliary-resource-deployment/test-data';
import { AuxiliaryResourceDeploymentModelValidationMap } from './auxiliary-resource-deployment';
import { AuxiliaryResourceDeploymentModelNormalizer } from './auxiliary-resource-deployment/normalizer';

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

import { testData as HorizontalScalingSummaryData } from './horizontal-scaling-summary/test-data';
import { HorizontalScalingSummaryModelValidationMap } from './horizontal-scaling-summary';
import { HorizontalScalingSummaryModelNormalizer } from './horizontal-scaling-summary/normalizer';

import jobData from './job/test-data';
import jobModel from './job';
import jobNormaliser from './job/normaliser';

import { testData as JobSummaryData } from './job-summary/test-data';
import { JobSummaryModelValidationMap } from './job-summary';
import { JobSummaryModelNormalizer } from './job-summary/normalizer';

import { testData as OAuthAuxiliaryResourceData } from './oauth-auxiliary-resource/test-data';
import { OAuthAuxiliaryResourceModelValidationMap } from './oauth-auxiliary-resource';
import { OAuthAuxiliaryResourceModelNormalizer } from './oauth-auxiliary-resource/normalizer';

import objectStateData from './object-state/test-data';
import objectStateModel from './object-state';
import objectStateNormaliser from './object-state/normaliser';

import podStateData from './pod-state/test-data';
import podStateModel from './pod-state';
import podStateNormaliser from './pod-state/normaliser';

import { testData as PortData } from './port/test-data';
import { PortModelValidationMap } from './port';
import { PortModelNormalizer } from './port/normalizer';

import { testData as ReplicaSummaryData } from './replica-summary/test-data';
import { ReplicaSummaryNormalizedModelValidationMap } from './replica-summary';
import { ReplicaSummaryModelNormalizer } from './replica-summary/normalizer';

import { testData as ScanData } from './scan/test-data';
import { ScanModelValidationMap } from './scan';
import { ScanModelNormalizer } from './scan/normalizer';

import { testData as ScheduledBatchSummaryData } from './scheduled-batch-summary/test-data';
import { ScheduledBatchSummaryModelValidationMap } from './scheduled-batch-summary';
import { ScheduledBatchSummaryModelNormalizer } from './scheduled-batch-summary/normalizer';

import { testData as ScheduledJobSummaryData } from './scheduled-job-summary/test-data';
import { ScheduledJobSummaryModelValidationMap } from './scheduled-job-summary';
import { ScheduledJobSummaryModelNormalizer } from './scheduled-job-summary/normalizer';

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
  ApplicationCostSet: T;
  ApplicationRegistration: T;
  ApplicationSummary: T;
  AuxiliaryResourceDeployment: T;
  ComponentSummary: T;
  DeploymentSummary: T;
  EnvironmentSummary: T;
  EnvironmentVariable: T;
  EnvironmentVariableMetadata: T;
  Event: T;
  HorizontalScalingSummary: T;
  Job: T;
  JobSummary: T;
  OAuthAuxiliaryResource: T;
  ObjectState: T;
  PodState: T;
  Port: T;
  ReplicaSummary: T;
  Scan: T;
  ScheduledBatchSummary: T;
  ScheduledJobSummary: T;
  Secret: T;
  Step: T;
  Vulnerability: T;
  VulnerabilitySummary: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  Application: ApplicationData,
  ApplicationCost: ApplicationCostData,
  ApplicationCostSet: ApplicationCostSetData,
  ApplicationRegistration: ApplicationRegistrationData,
  ApplicationSummary: ApplicationSummaryData,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentData,
  ComponentSummary: componentSummaryData,
  DeploymentSummary: DeploymentSummaryData,
  EnvironmentSummary: EnvironmentSummaryData,
  EnvironmentVariable: EnvironmentVariableData,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataData,
  Event: eventData,
  HorizontalScalingSummary: HorizontalScalingSummaryData,
  Job: jobData,
  JobSummary: JobSummaryData,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceData,
  ObjectState: objectStateData,
  PodState: podStateData,
  Port: PortData,
  ReplicaSummary: ReplicaSummaryData,
  Scan: ScanData,
  ScheduledBatchSummary: ScheduledBatchSummaryData,
  ScheduledJobSummary: ScheduledJobSummaryData,
  Secret: SecretData,
  Step: stepData,
  Vulnerability: vulnerabilityData,
  VulnerabilitySummary: VulnerabilitySummaryData,
};

export const models: TestDependencyComponents<ValidationMap<any>> = {
  Application: ApplicationModelValidationMap,
  ApplicationCost: ApplicationCostModelValidationMap,
  ApplicationCostSet: ApplicationCostSetModelValidationMap,
  ApplicationRegistration: ApplicationRegistrationModelValidationMap,
  ApplicationSummary: ApplicationSummaryModelValidationMap,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelValidationMap,
  ComponentSummary: componentSummaryModel,
  DeploymentSummary: DeploymentSummaryModelValidationMap,
  EnvironmentSummary: EnvironmentSummaryModelValidationMap,
  EnvironmentVariable: EnvironmentVariableNormalizedModelValidationMap,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelValidationMap,
  Event: eventModel,
  HorizontalScalingSummary: HorizontalScalingSummaryModelValidationMap,
  Job: jobModel,
  JobSummary: JobSummaryModelValidationMap,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceModelValidationMap,
  ObjectState: objectStateModel,
  PodState: podStateModel,
  Port: PortModelValidationMap,
  ReplicaSummary: ReplicaSummaryNormalizedModelValidationMap,
  Scan: ScanModelValidationMap,
  ScheduledBatchSummary: ScheduledBatchSummaryModelValidationMap,
  ScheduledJobSummary: ScheduledJobSummaryModelValidationMap,
  Secret: SecretModelValidationMap,
  Step: stepModel,
  Vulnerability: vulnerabilityModel,
  VulnerabilitySummary: VulnerabilitySummaryModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  Application: ApplicationModelNormalizer,
  ApplicationCost: ApplicationCostModelNormalizer,
  ApplicationCostSet: ApplicationCostSetModelNormalizer,
  ApplicationRegistration: ApplicationRegistrationModelNormalizer,
  ApplicationSummary: ApplicationSummaryModelNormalizer,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelNormalizer,
  ComponentSummary: componentSummaryNormaliser,
  DeploymentSummary: DeploymentSummaryModelNormalizer,
  EnvironmentSummary: EnvironmentSummaryModelNormalizer,
  EnvironmentVariable: EnvironmentVariableModelNormalizer,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelNormalizer,
  Event: eventNormaliser,
  HorizontalScalingSummary: HorizontalScalingSummaryModelNormalizer,
  Job: jobNormaliser,
  JobSummary: JobSummaryModelNormalizer,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceModelNormalizer,
  ObjectState: objectStateNormaliser,
  PodState: podStateNormaliser,
  Port: PortModelNormalizer,
  ReplicaSummary: ReplicaSummaryModelNormalizer,
  Scan: ScanModelNormalizer,
  ScheduledBatchSummary: ScheduledBatchSummaryModelNormalizer,
  ScheduledJobSummary: ScheduledJobSummaryModelNormalizer,
  Secret: SecretModelNormalizer,
  Step: stepNormaliser,
  Vulnerability: vulnerabilityNormaliser,
  VulnerabilitySummary: VulnerabilitySummaryModelNormalizer,
};
