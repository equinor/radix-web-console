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

import { testData as ComponentData } from './component/test-data';
import { ComponentModelValidationMap } from './component';
import { ComponentModelNormalizer } from './component/normalizer';

import componentSummaryData from './component-summary/test-data';
import componentSummaryModel from './component-summary';
import componentSummaryNormaliser from './component-summary/normaliser';

import { testData as ComponentVulnerabilitiesData } from './component-vulnerabilities/test-data';
import { ComponentVulnerabilitiesModelValidationMap } from './component-vulnerabilities';
import { ComponentVulnerabilitiesModelNormalizer } from './component-vulnerabilities/normalizer';

import { testData as DeploymentData } from './deployment/test-data';
import { DeploymentModelValidationMap } from './deployment';
import { DeploymentModelNormalizer } from './deployment/normalizer';

import { testData as DeploymentSummaryData } from './deployment-summary/test-data';
import { DeploymentSummaryModelValidationMap } from './deployment-summary';
import { DeploymentSummaryModelNormalizer } from './deployment-summary/normalizer';

import { testData as EnvironmentData } from './environment/test-data';
import { EnvironmentModelValidationMap } from './environment';
import { EnvironmentModelNormalizer } from './environment/normalizer';

import { testData as EnvironmentSummaryData } from './environment-summary/test-data';
import { EnvironmentSummaryModelValidationMap } from './environment-summary';
import { EnvironmentSummaryModelNormalizer } from './environment-summary/normalizer';

import { testData as EnvironmentVariableData } from './environment-variable/test-data';
import { EnvironmentVariableNormalizedModelValidationMap } from './environment-variable';
import { EnvironmentVariableModelNormalizer } from './environment-variable/normalizer';

import { testData as EnvironmentVariableMetadataData } from './environment-variable-metadata/test-data';
import { EnvironmentVariableMetadataModelValidationMap } from './environment-variable-metadata';
import { EnvironmentVariableMetadataModelNormalizer } from './environment-variable-metadata/normalizer';

import { testData as EnvironmentVulnerabilitySummaryData } from './environment-vulnerability-summary/test-data';
import { EnvironmentVulnerabilitySummaryModelValidationMap } from './environment-vulnerability-summary';
import { EnvironmentVulnerabilitySummaryModelNormalizer } from './environment-vulnerability-summary/normalizer';

import { testData as EventData } from './event/test-data';
import { EventModelValidationMap } from './event';
import { EventModelNormalizer } from './event/normalizer';

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

import { testData as ObjectStateData } from './object-state/test-data';
import { ObjectStateModelValidationMap } from './object-state';
import { ObjectStateModelNormalizer } from './object-state/normalizer';

import { testData as PodStateData } from './pod-state/test-data';
import { PodStateModelValidationMap } from './pod-state';
import { PodStateModelNormalizer } from './pod-state/normalizer';

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

import { testData as VulnerabilityData } from './vulnerability/test-data';
import { VulnerabilityModelValidationMap } from './vulnerability';
import { VulnerabilityModelNormalizer } from './vulnerability/normalizer';

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
  Component: T;
  ComponentSummary: T;
  ComponentVulnerabilities: T;
  Deployment: T;
  DeploymentSummary: T;
  Environment: T;
  EnvironmentSummary: T;
  EnvironmentVariable: T;
  EnvironmentVariableMetadata: T;
  EnvironmentVulnerabilitySummary: T;
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

// prettier-ignore
export const testData: TestDependencyComponents<TestDependencyDataType> = {
  Application: ApplicationData,
  ApplicationCost: ApplicationCostData,
  ApplicationCostSet: ApplicationCostSetData,
  ApplicationRegistration: ApplicationRegistrationData,
  ApplicationSummary: ApplicationSummaryData,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentData,
  Component: ComponentData,
  ComponentSummary: componentSummaryData,
  ComponentVulnerabilities: ComponentVulnerabilitiesData,
  Deployment: DeploymentData,
  DeploymentSummary: DeploymentSummaryData,
  Environment: EnvironmentData,
  EnvironmentSummary: EnvironmentSummaryData,
  EnvironmentVariable: EnvironmentVariableData,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataData,
  EnvironmentVulnerabilitySummary: EnvironmentVulnerabilitySummaryData,
  Event: EventData,
  HorizontalScalingSummary: HorizontalScalingSummaryData,
  Job: jobData,
  JobSummary: JobSummaryData,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceData,
  ObjectState: ObjectStateData,
  PodState: PodStateData,
  Port: PortData,
  ReplicaSummary: ReplicaSummaryData,
  Scan: ScanData,
  ScheduledBatchSummary: ScheduledBatchSummaryData,
  ScheduledJobSummary: ScheduledJobSummaryData,
  Secret: SecretData,
  Step: stepData,
  Vulnerability: VulnerabilityData,
  VulnerabilitySummary: VulnerabilitySummaryData,
};

// prettier-ignore
export const models: TestDependencyComponents<ValidationMap<any>> = {
  Application: ApplicationModelValidationMap,
  ApplicationCost: ApplicationCostModelValidationMap,
  ApplicationCostSet: ApplicationCostSetModelValidationMap,
  ApplicationRegistration: ApplicationRegistrationModelValidationMap,
  ApplicationSummary: ApplicationSummaryModelValidationMap,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelValidationMap,
  Component: ComponentModelValidationMap,
  ComponentSummary: componentSummaryModel,
  ComponentVulnerabilities: ComponentVulnerabilitiesModelValidationMap,
  Deployment: DeploymentModelValidationMap,
  DeploymentSummary: DeploymentSummaryModelValidationMap,
  Environment: EnvironmentModelValidationMap,
  EnvironmentSummary: EnvironmentSummaryModelValidationMap,
  EnvironmentVariable: EnvironmentVariableNormalizedModelValidationMap,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelValidationMap,
  EnvironmentVulnerabilitySummary: EnvironmentVulnerabilitySummaryModelValidationMap,
  Event: EventModelValidationMap,
  HorizontalScalingSummary: HorizontalScalingSummaryModelValidationMap,
  Job: jobModel,
  JobSummary: JobSummaryModelValidationMap,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceModelValidationMap,
  ObjectState: ObjectStateModelValidationMap,
  PodState: PodStateModelValidationMap,
  Port: PortModelValidationMap,
  ReplicaSummary: ReplicaSummaryNormalizedModelValidationMap,
  Scan: ScanModelValidationMap,
  ScheduledBatchSummary: ScheduledBatchSummaryModelValidationMap,
  ScheduledJobSummary: ScheduledJobSummaryModelValidationMap,
  Secret: SecretModelValidationMap,
  Step: stepModel,
  Vulnerability: VulnerabilityModelValidationMap,
  VulnerabilitySummary: VulnerabilitySummaryModelValidationMap,
};

// prettier-ignore
export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  Application: ApplicationModelNormalizer,
  ApplicationCost: ApplicationCostModelNormalizer,
  ApplicationCostSet: ApplicationCostSetModelNormalizer,
  ApplicationRegistration: ApplicationRegistrationModelNormalizer,
  ApplicationSummary: ApplicationSummaryModelNormalizer,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelNormalizer,
  Component: ComponentModelNormalizer,
  ComponentSummary: componentSummaryNormaliser,
  ComponentVulnerabilities: ComponentVulnerabilitiesModelNormalizer,
  Deployment: DeploymentModelNormalizer,
  DeploymentSummary: DeploymentSummaryModelNormalizer,
  Environment: EnvironmentModelNormalizer,
  EnvironmentSummary: EnvironmentSummaryModelNormalizer,
  EnvironmentVariable: EnvironmentVariableModelNormalizer,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelNormalizer,
  EnvironmentVulnerabilitySummary: EnvironmentVulnerabilitySummaryModelNormalizer,
  Event: EventModelNormalizer,
  HorizontalScalingSummary: HorizontalScalingSummaryModelNormalizer,
  Job: jobNormaliser,
  JobSummary: JobSummaryModelNormalizer,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceModelNormalizer,
  ObjectState: ObjectStateModelNormalizer,
  PodState: PodStateModelNormalizer,
  Port: PortModelNormalizer,
  ReplicaSummary: ReplicaSummaryModelNormalizer,
  Scan: ScanModelNormalizer,
  ScheduledBatchSummary: ScheduledBatchSummaryModelNormalizer,
  ScheduledJobSummary: ScheduledJobSummaryModelNormalizer,
  Secret: SecretModelNormalizer,
  Step: stepNormaliser,
  Vulnerability: VulnerabilityModelNormalizer,
  VulnerabilitySummary: VulnerabilitySummaryModelNormalizer,
};
