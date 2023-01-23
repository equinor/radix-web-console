// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from './model-types';

import {
  alertingTestData as AlertingConfigData,
  updateAlertingTestData as UpdateAlertingConfigData,
} from './alerting/test-data';
import {
  AlertingConfigModelValidationMap,
  UpdateAlertingConfigModelValidationMap,
} from './alerting';
import {
  AlertingConfigModelNormalizer,
  UpdateAlertingConfigModelNormalizer,
} from './alerting/normalizer';

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

import { testData as ApplicationRegistrationPatchData } from './application-registration-patch/test-data';
import { ApplicationRegistrationPatchModelValidationMap } from './application-registration-patch';
import { ApplicationRegistrationPatchModelNormalizer } from './application-registration-patch/normalizer';

import { testData as ApplicationRegistrationPatchRequestData } from './application-registration-patch-request/test-data';
import { ApplicationRegistrationPatchRequestModelValidationMap } from './application-registration-patch-request';
import { ApplicationRegistrationPatchRequestModelNormalizer } from './application-registration-patch-request/normalizer';

import { testData as ApplicationRegistrationRequestData } from './application-registration-request/test-data';
import { ApplicationRegistrationRequestModelValidationMap } from './application-registration-request';
import { ApplicationRegistrationRequestModelNormalizer } from './application-registration-request/normalizer';

import { testData as ApplicationRegistrationUpsertResponseData } from './application-registration-upsert-response/test-data';
import { ApplicationRegistrationUpsertResponseModelValidationMap } from './application-registration-upsert-response';
import { ApplicationRegistrationUpsertResponseModelNormalizer } from './application-registration-upsert-response/normalizer';

import { testData as ApplicationSummaryData } from './application-summary/test-data';
import { ApplicationSummaryModelValidationMap } from './application-summary';
import { ApplicationSummaryModelNormalizer } from './application-summary/normalizer';

import { testData as AuxiliaryResourceDeploymentData } from './auxiliary-resource-deployment/test-data';
import { AuxiliaryResourceDeploymentModelValidationMap } from './auxiliary-resource-deployment';
import { AuxiliaryResourceDeploymentModelNormalizer } from './auxiliary-resource-deployment/normalizer';

import { testData as AzureKeyVaultSecretStatusData } from './azure-key-vault-secret-status/test-data';
import { AzureKeyVaultSecretStatusModelValidationMap } from './azure-key-vault-secret-status';
import { AzureKeyVaultSecretStatusModelNormalizer } from './azure-key-vault-secret-status/normalizer';

import { testData as BuildSecretData } from './build-secret/test-data';
import { BuildSecretModelValidationMap } from './build-secret';
import { BuildSecretModelNormalizer } from './build-secret/normalizer';

import { testData as ComponentData } from './component/test-data';
import { ComponentModelValidationMap } from './component';
import { ComponentModelNormalizer } from './component/normalizer';

import { testData as ComponentScanData } from './component-scan/test-data';
import { ComponentScanModelValidationMap } from './component-scan';
import { ComponentScanModelNormalizer } from './component-scan/normalizer';

import { testData as ComponentSummaryData } from './component-summary/test-data';
import { ComponentSummaryModelValidationMap } from './component-summary';
import { ComponentSummaryModelNormalizer } from './component-summary/normalizer';

import { testData as DeploymentData } from './deployment/test-data';
import { DeploymentModelValidationMap } from './deployment';
import { DeploymentModelNormalizer } from './deployment/normalizer';

import { testData as DeploymentSummaryData } from './deployment-summary/test-data';
import { DeploymentSummaryModelValidationMap } from './deployment-summary';
import { DeploymentSummaryModelNormalizer } from './deployment-summary/normalizer';

import { testData as EnvironmentData } from './environment/test-data';
import { EnvironmentModelValidationMap } from './environment';
import { EnvironmentModelNormalizer } from './environment/normalizer';

import { testData as EnvironmentScanSummaryData } from './environment-scan-summary/test-data';
import { EnvironmentScanSummaryModelValidationMap } from './environment-scan-summary';
import { EnvironmentScanSummaryModelNormalizer } from './environment-scan-summary/normalizer';

import { testData as EnvironmentSummaryData } from './environment-summary/test-data';
import { EnvironmentSummaryModelValidationMap } from './environment-summary';
import { EnvironmentSummaryModelNormalizer } from './environment-summary/normalizer';

import { testData as EnvironmentVariableData } from './environment-variable/test-data';
import { EnvironmentVariableNormalizedModelValidationMap } from './environment-variable';
import { EnvironmentVariableModelNormalizer } from './environment-variable/normalizer';

import { testData as EnvironmentVariableMetadataData } from './environment-variable-metadata/test-data';
import { EnvironmentVariableMetadataModelValidationMap } from './environment-variable-metadata';
import { EnvironmentVariableMetadataModelNormalizer } from './environment-variable-metadata/normalizer';

import { testData as EventData } from './event/test-data';
import { EventModelValidationMap } from './event';
import { EventModelNormalizer } from './event/normalizer';

import { testData as HorizontalScalingSummaryData } from './horizontal-scaling-summary/test-data';
import { HorizontalScalingSummaryModelValidationMap } from './horizontal-scaling-summary';
import { HorizontalScalingSummaryModelNormalizer } from './horizontal-scaling-summary/normalizer';

import { testData as ImageHubSecretData } from './image-hub-secret/test-data';
import { ImageHubSecretModelValidationMap } from './image-hub-secret';
import { ImageHubSecretModelNormalizer } from './image-hub-secret/normalizer';

import { testData as JobData } from './job/test-data';
import { JobModelValidationMap } from './job';
import { JobModelNormalizer } from './job/normalizer';

import { testData as JobSummaryData } from './job-summary/test-data';
import { JobSummaryModelValidationMap } from './job-summary';
import { JobSummaryModelNormalizer } from './job-summary/normalizer';

import { testData as MachineUserData } from './machine-user/test-data';
import { MachineUserModelValidationMap } from './machine-user';
import { MachineUserModelNormalizer } from './machine-user/normalizer';

import { testData as OAuthAuxiliaryResourceData } from './oauth-auxiliary-resource/test-data';
import { OAuthAuxiliaryResourceModelValidationMap } from './oauth-auxiliary-resource';
import { OAuthAuxiliaryResourceModelNormalizer } from './oauth-auxiliary-resource/normalizer';

import { testData as ObjectStateData } from './object-state/test-data';
import { ObjectStateModelValidationMap } from './object-state';
import { ObjectStateModelNormalizer } from './object-state/normalizer';

import { testData as PipelineRunData } from './pipeline-run/test-data';
import { PipelineRunModelValidationMap } from './pipeline-run';
import { PipelineRunModelNormalizer } from './pipeline-run/normalizer';

import { testData as PipelineRunTaskData } from './pipeline-run-task/test-data';
import { PipelineRunTaskModelValidationMap } from './pipeline-run-task';
import { PipelineRunTaskModelNormalizer } from './pipeline-run-task/normalizer';

import { testData as PipelineRunTaskStepData } from './pipeline-run-task-step/test-data';
import { PipelineRunTaskStepModelValidationMap } from './pipeline-run-task-step';
import { PipelineRunTaskStepModelNormalizer } from './pipeline-run-task-step/normalizer';

import { testData as PodStateData } from './pod-state/test-data';
import { PodStateModelValidationMap } from './pod-state';
import { PodStateModelNormalizer } from './pod-state/normalizer';

import { testData as PortData } from './port/test-data';
import { PortModelValidationMap } from './port';
import { PortModelNormalizer } from './port/normalizer';

import {
  replicaNodeTestData as ReplicaNodeData,
  replicaResourceTestData as ReplicaResourceData,
  replicaResourcesTestData as ReplicaResourcesData,
} from './replica-attributes/test-data';
import {
  ReplicaNodeModelValidationMap,
  ReplicaResourceModelValidationMap,
  ReplicaResourcesModelValidationMap,
} from './replica-attributes';
import {
  ReplicaNodeModelNormalizer,
  ReplicaResourceModelNormalizer,
  ReplicaResourcesModelNormalizer,
} from './replica-attributes/normalizer';

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

import { testData as ServiceNowApplicationData } from './service-now-application/test-data';
import { ServiceNowApplicationModelValidationMap } from './service-now-application';
import { ServiceNowApplicationModelNormalizer } from './service-now-application/normalizer';

import { testData as StepData } from './step/test-data';
import { StepModelValidationMap } from './step';
import { StepModelNormalizer } from './step/normaliser';

import { testData as TLSCertificateData } from './tls-certificate/test-data';
import { TLSCertificateModelValidationMap } from './tls-certificate';
import { TLSCertificateModelNormalizer } from './tls-certificate/normalizer';

import { testData as VulnerabilityData } from './vulnerability/test-data';
import { VulnerabilityModelValidationMap } from './vulnerability';
import { VulnerabilityModelNormalizer } from './vulnerability/normalizer';

import { testData as VulnerabilitySummaryData } from './vulnerability-summary/test-data';
import { VulnerabilitySummaryModelValidationMap } from './vulnerability-summary';
import { VulnerabilitySummaryModelNormalizer } from './vulnerability-summary/normalizer';

import { testData as IdentityData } from './identity/test-data';
import { IdentityModelValidationMap } from './identity';
import { IdentityModelNormalizer } from './identity/normalizer';

import { testData as AzureIdentityData } from './azure-identity/test-data';
import { AzureIdentityModelValidationMap } from './azure-identity';
import { AzureIdentityModelNormalizer } from './azure-identity/normalizer';

interface TestDependencyComponents<T> {
  AlertingConfig: T;
  Application: T;
  ApplicationCost: T;
  ApplicationCostSet: T;
  ApplicationRegistration: T;
  ApplicationRegistrationPatch: T;
  ApplicationRegistrationPatchRequest: T;
  ApplicationRegistrationRequest: T;
  ApplicationRegistrationUpsertResponse: T;
  ApplicationSummary: T;
  AuxiliaryResourceDeployment: T;
  AzureKeyVaultSecretStatus: T;
  BuildSecret: T;
  Component: T;
  ComponentScan: T;
  ComponentSummary: T;
  Deployment: T;
  DeploymentSummary: T;
  Environment: T;
  EnvironmentScanSummary: T;
  EnvironmentSummary: T;
  EnvironmentVariable: T;
  EnvironmentVariableMetadata: T;
  Event: T;
  HorizontalScalingSummary: T;
  ImageHubSecret: T;
  Job: T;
  JobSummary: T;
  MachineUser: T;
  OAuthAuxiliaryResource: T;
  ObjectState: T;
  PipelineRun: T;
  PipelineRunTask: T;
  PipelineRunTaskStep: T;
  PodState: T;
  Port: T;
  ReplicaNode: T;
  ReplicaResource: T;
  ReplicaResources: T;
  ReplicaSummary: T;
  Scan: T;
  ScheduledBatchSummary: T;
  ScheduledJobSummary: T;
  Secret: T;
  ServiceNowApplication: T;
  Step: T;
  TLSCertificate: T;
  UpdateAlertingConfig: T;
  Vulnerability: T;
  VulnerabilitySummary: T;
  Identity: T;
  AzureIdentity: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  AlertingConfig: AlertingConfigData,
  Application: ApplicationData,
  ApplicationCost: ApplicationCostData,
  ApplicationCostSet: ApplicationCostSetData,
  ApplicationRegistration: ApplicationRegistrationData,
  ApplicationRegistrationPatch: ApplicationRegistrationPatchData,
  ApplicationRegistrationPatchRequest: ApplicationRegistrationPatchRequestData,
  ApplicationRegistrationRequest: ApplicationRegistrationRequestData,
  ApplicationRegistrationUpsertResponse:
    ApplicationRegistrationUpsertResponseData,
  ApplicationSummary: ApplicationSummaryData,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentData,
  AzureKeyVaultSecretStatus: AzureKeyVaultSecretStatusData,
  BuildSecret: BuildSecretData,
  Component: ComponentData,
  ComponentScan: ComponentScanData,
  ComponentSummary: ComponentSummaryData,
  Deployment: DeploymentData,
  DeploymentSummary: DeploymentSummaryData,
  Environment: EnvironmentData,
  EnvironmentScanSummary: EnvironmentScanSummaryData,
  EnvironmentSummary: EnvironmentSummaryData,
  EnvironmentVariable: EnvironmentVariableData,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataData,
  Event: EventData,
  HorizontalScalingSummary: HorizontalScalingSummaryData,
  ImageHubSecret: ImageHubSecretData,
  Job: JobData,
  JobSummary: JobSummaryData,
  MachineUser: MachineUserData,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceData,
  ObjectState: ObjectStateData,
  PipelineRun: PipelineRunData,
  PipelineRunTask: PipelineRunTaskData,
  PipelineRunTaskStep: PipelineRunTaskStepData,
  PodState: PodStateData,
  Port: PortData,
  ReplicaNode: ReplicaNodeData,
  ReplicaResource: ReplicaResourceData,
  ReplicaResources: ReplicaResourcesData,
  ReplicaSummary: ReplicaSummaryData,
  Scan: ScanData,
  ScheduledBatchSummary: ScheduledBatchSummaryData,
  ScheduledJobSummary: ScheduledJobSummaryData,
  Secret: SecretData,
  ServiceNowApplication: ServiceNowApplicationData,
  Step: StepData,
  TLSCertificate: TLSCertificateData,
  UpdateAlertingConfig: UpdateAlertingConfigData,
  Vulnerability: VulnerabilityData,
  VulnerabilitySummary: VulnerabilitySummaryData,
  Identity: IdentityData,
  AzureIdentity: AzureIdentityData,
};

export const models: TestDependencyComponents<ValidationMap<any>> = {
  AlertingConfig: AlertingConfigModelValidationMap,
  Application: ApplicationModelValidationMap,
  ApplicationCost: ApplicationCostModelValidationMap,
  ApplicationCostSet: ApplicationCostSetModelValidationMap,
  ApplicationRegistration: ApplicationRegistrationModelValidationMap,
  ApplicationRegistrationPatch: ApplicationRegistrationPatchModelValidationMap,
  ApplicationRegistrationPatchRequest:
    ApplicationRegistrationPatchRequestModelValidationMap,
  ApplicationRegistrationRequest:
    ApplicationRegistrationRequestModelValidationMap,
  ApplicationRegistrationUpsertResponse:
    ApplicationRegistrationUpsertResponseModelValidationMap,
  ApplicationSummary: ApplicationSummaryModelValidationMap,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelValidationMap,
  AzureKeyVaultSecretStatus: AzureKeyVaultSecretStatusModelValidationMap,
  BuildSecret: BuildSecretModelValidationMap,
  Component: ComponentModelValidationMap,
  ComponentScan: ComponentScanModelValidationMap,
  ComponentSummary: ComponentSummaryModelValidationMap,
  Deployment: DeploymentModelValidationMap,
  DeploymentSummary: DeploymentSummaryModelValidationMap,
  Environment: EnvironmentModelValidationMap,
  EnvironmentScanSummary: EnvironmentScanSummaryModelValidationMap,
  EnvironmentSummary: EnvironmentSummaryModelValidationMap,
  EnvironmentVariable: EnvironmentVariableNormalizedModelValidationMap,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelValidationMap,
  Event: EventModelValidationMap,
  HorizontalScalingSummary: HorizontalScalingSummaryModelValidationMap,
  ImageHubSecret: ImageHubSecretModelValidationMap,
  Job: JobModelValidationMap,
  JobSummary: JobSummaryModelValidationMap,
  MachineUser: MachineUserModelValidationMap,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceModelValidationMap,
  ObjectState: ObjectStateModelValidationMap,
  PipelineRun: PipelineRunModelValidationMap,
  PipelineRunTask: PipelineRunTaskModelValidationMap,
  PipelineRunTaskStep: PipelineRunTaskStepModelValidationMap,
  PodState: PodStateModelValidationMap,
  Port: PortModelValidationMap,
  ReplicaNode: ReplicaNodeModelValidationMap,
  ReplicaResource: ReplicaResourceModelValidationMap,
  ReplicaResources: ReplicaResourcesModelValidationMap,
  ReplicaSummary: ReplicaSummaryNormalizedModelValidationMap,
  Scan: ScanModelValidationMap,
  ScheduledBatchSummary: ScheduledBatchSummaryModelValidationMap,
  ScheduledJobSummary: ScheduledJobSummaryModelValidationMap,
  Secret: SecretModelValidationMap,
  ServiceNowApplication: ServiceNowApplicationModelValidationMap,
  Step: StepModelValidationMap,
  TLSCertificate: TLSCertificateModelValidationMap,
  UpdateAlertingConfig: UpdateAlertingConfigModelValidationMap,
  Vulnerability: VulnerabilityModelValidationMap,
  VulnerabilitySummary: VulnerabilitySummaryModelValidationMap,
  Identity: IdentityModelValidationMap,
  AzureIdentity: AzureIdentityModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  AlertingConfig: AlertingConfigModelNormalizer,
  Application: ApplicationModelNormalizer,
  ApplicationCost: ApplicationCostModelNormalizer,
  ApplicationCostSet: ApplicationCostSetModelNormalizer,
  ApplicationRegistration: ApplicationRegistrationModelNormalizer,
  ApplicationRegistrationPatch: ApplicationRegistrationPatchModelNormalizer,
  ApplicationRegistrationPatchRequest:
    ApplicationRegistrationPatchRequestModelNormalizer,
  ApplicationRegistrationRequest: ApplicationRegistrationRequestModelNormalizer,
  ApplicationRegistrationUpsertResponse:
    ApplicationRegistrationUpsertResponseModelNormalizer,
  ApplicationSummary: ApplicationSummaryModelNormalizer,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelNormalizer,
  AzureKeyVaultSecretStatus: AzureKeyVaultSecretStatusModelNormalizer,
  BuildSecret: BuildSecretModelNormalizer,
  Component: ComponentModelNormalizer,
  ComponentScan: ComponentScanModelNormalizer,
  ComponentSummary: ComponentSummaryModelNormalizer,
  Deployment: DeploymentModelNormalizer,
  DeploymentSummary: DeploymentSummaryModelNormalizer,
  Environment: EnvironmentModelNormalizer,
  EnvironmentScanSummary: EnvironmentScanSummaryModelNormalizer,
  EnvironmentSummary: EnvironmentSummaryModelNormalizer,
  EnvironmentVariable: EnvironmentVariableModelNormalizer,
  EnvironmentVariableMetadata: EnvironmentVariableMetadataModelNormalizer,
  Event: EventModelNormalizer,
  HorizontalScalingSummary: HorizontalScalingSummaryModelNormalizer,
  ImageHubSecret: ImageHubSecretModelNormalizer,
  Job: JobModelNormalizer,
  JobSummary: JobSummaryModelNormalizer,
  MachineUser: MachineUserModelNormalizer,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceModelNormalizer,
  ObjectState: ObjectStateModelNormalizer,
  PipelineRun: PipelineRunModelNormalizer,
  PipelineRunTask: PipelineRunTaskModelNormalizer,
  PipelineRunTaskStep: PipelineRunTaskStepModelNormalizer,
  PodState: PodStateModelNormalizer,
  Port: PortModelNormalizer,
  ReplicaNode: ReplicaNodeModelNormalizer,
  ReplicaResource: ReplicaResourceModelNormalizer,
  ReplicaResources: ReplicaResourcesModelNormalizer,
  ReplicaSummary: ReplicaSummaryModelNormalizer,
  Scan: ScanModelNormalizer,
  ScheduledBatchSummary: ScheduledBatchSummaryModelNormalizer,
  ScheduledJobSummary: ScheduledJobSummaryModelNormalizer,
  Secret: SecretModelNormalizer,
  ServiceNowApplication: ServiceNowApplicationModelNormalizer,
  Step: StepModelNormalizer,
  TLSCertificate: TLSCertificateModelNormalizer,
  UpdateAlertingConfig: UpdateAlertingConfigModelNormalizer,
  Vulnerability: VulnerabilityModelNormalizer,
  VulnerabilitySummary: VulnerabilitySummaryModelNormalizer,
  Identity: IdentityModelNormalizer,
  AzureIdentity: AzureIdentityModelNormalizer,
};
