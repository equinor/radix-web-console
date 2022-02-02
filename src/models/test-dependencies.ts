// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormaliserType, TestDependencyDataType } from './model-types';

import { testData as ApplicationData } from './application/test-data';
import { ApplicationModelValidationMap } from './application';
import { ApplicationModelNormaliser } from './application/normaliser';

import applicationCostData from './application-cost/test-data';
import applicationCostModel from './application-cost';
import applicationCostNormaliser from './application-cost/normaliser';

import { testData as ApplicationRegistrationData } from './application-registration/test-data';
import { ApplicationRegistrationModelValidationMap } from './application-registration';
import { ApplicationRegistrationModelNormaliser } from './application-registration/normaliser';

import { testData as ApplicationSummaryData } from './application-summary/test-data';
import { ApplicationSummaryModelValidationMap } from './application-summary';
import { ApplicationSummaryModelNormaliser } from './application-summary/normaliser';

import componentSummaryData from './component-summary/test-data';
import componentSummaryModel from './component-summary';
import componentSummaryNormaliser from './component-summary/normaliser';

import { testData as DeploymentSummaryData } from './deployment-summary/test-data';
import { DeploymentSummaryModelValidationMap } from './deployment-summary';
import { DeploymentSummaryModelNormaliser } from './deployment-summary/normaliser';

import { testData as EnvironmentSummaryData } from './environment-summary/test-data';
import { EnvironmentSummaryModelValidationMap } from './environment-summary';
import { EnvironmentSummaryModelNormaliser } from './environment-summary/normaliser';

import { testData as EnvironmentVariableData } from './environment-variable/test-data';
import { EnvironmentVariableNormalisedModelValidationMap } from './environment-variable';
import { EnvironmentVariableModelNormaliser } from './environment-variable/normaliser';

import { testData as EnvironmentVariableMetadataData } from './environment-variable-metadata/test-data';
import { EnvironmentVariableMetadataModelValidationMap } from './environment-variable-metadata';
import { EnvironmentVariableMetadataModelNormaliser } from './environment-variable-metadata/normaliser';

import eventData from './event/test-data';
import eventModel from './event';
import eventNormaliser from './event/normaliser';

import jobData from './job/test-data';
import jobModel from './job';
import jobNormaliser from './job/normaliser';

import { testData as JobSummaryData } from './job-summary/test-data';
import { JobSummaryModelValidationMap } from './job-summary';
import { JobSummaryModelNormaliser } from './job-summary/normaliser';

import objectStateData from './object-state/test-data';
import objectStateModel from './object-state';
import objectStateNormaliser from './object-state/normaliser';

import podStateData from './pod-state/test-data';
import podStateModel from './pod-state';
import podStateNormaliser from './pod-state/normaliser';

import replicaSummaryData from './replica-summary/test-data';
import replicaSummaryModel from './replica-summary';
import replicaSummaryNormaliser from './replica-summary/normaliser';

import { testData as ScanData } from './scan/test-data';
import { ScanModelValidationMap } from './scan';
import { ScanModelNormaliser } from './scan/normaliser';

import stepData from './step/test-data';
import stepModel from './step';
import stepNormaliser from './step/normaliser';

import vulnerabilityData from './vulnerability/test-data';
import vulnerabilityModel from './vulnerability';
import vulnerabilityNormaliser from './vulnerability/normaliser';

import { testData as VulnerabilitySummaryData } from './vulnerability-summary/test-data';
import { VulnerabilitySummaryModelValidationMap } from './vulnerability-summary';
import { VulnerabilitySummaryModelNormaliser } from './vulnerability-summary/normaliser';

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
  ReplicaSummary: replicaSummaryData,
  Scan: ScanData,
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
  EnvironmentVariable: EnvironmentVariableNormalisedModelValidationMap,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelValidationMap,
  Event: eventModel,
  Job: jobModel,
  JobSummary: JobSummaryModelValidationMap,
  ObjectState: objectStateModel,
  PodState: podStateModel,
  ReplicaSummary: replicaSummaryModel,
  Scan: ScanModelValidationMap,
  Step: stepModel,
  Vulnerability: vulnerabilityModel,
  VulnerabilitySummary: VulnerabilitySummaryModelValidationMap,
};

export const normalisers: TestDependencyComponents<ModelNormaliserType> = {
  Application: ApplicationModelNormaliser,
  ApplicationCost: applicationCostNormaliser,
  ApplicationRegistration: ApplicationRegistrationModelNormaliser,
  ApplicationSummary: ApplicationSummaryModelNormaliser,
  ComponentSummary: componentSummaryNormaliser,
  DeploymentSummary: DeploymentSummaryModelNormaliser,
  EnvironmentSummary: EnvironmentSummaryModelNormaliser,
  EnvironmentVariable: EnvironmentVariableModelNormaliser,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelNormaliser,
  Event: eventNormaliser,
  Job: jobNormaliser,
  JobSummary: JobSummaryModelNormaliser,
  ObjectState: objectStateNormaliser,
  PodState: podStateNormaliser,
  ReplicaSummary: replicaSummaryNormaliser,
  Scan: ScanModelNormaliser,
  Step: stepNormaliser,
  Vulnerability: vulnerabilityNormaliser,
  VulnerabilitySummary: VulnerabilitySummaryModelNormaliser,
};
