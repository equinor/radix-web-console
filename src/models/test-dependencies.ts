// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from './model-types';

import { testData as AlertConfigData } from './radix-api/alerting/alert-config/test-data';
import { AlertConfigModelValidationMap } from './radix-api/alerting/alert-config';
import { AlertConfigModelNormalizer } from './radix-api/alerting/alert-config/normalizer';

import { testData as AlertingConfigData } from './radix-api/alerting/alerting-config/test-data';
import { AlertingConfigModelValidationMap } from './radix-api/alerting/alerting-config';
import { AlertingConfigModelNormalizer } from './radix-api/alerting/alerting-config/normalizer';

import { testData as ReceiverConfigData } from './radix-api/alerting/receiver-config/test-data';
import { ReceiverConfigModelValidationMap } from './radix-api/alerting/receiver-config';
import { ReceiverConfigModelNormalizer } from './radix-api/alerting/receiver-config/normalizer';

import { testData as ReceiverConfigSecretStatusData } from './radix-api/alerting/receiver-config-secret-status/test-data';
import { ReceiverConfigSecretStatusModelValidationMap } from './radix-api/alerting/receiver-config-secret-status';
import { ReceiverConfigSecretStatusModelNormalizer } from './radix-api/alerting/receiver-config-secret-status/normalizer';

import { testData as SlackConfigData } from './radix-api/alerting/slack-config/test-data';
import { SlackConfigModelValidationMap } from './radix-api/alerting/slack-config';
import { SlackConfigModelNormalizer } from './radix-api/alerting/slack-config/normalizer';

import { testData as SlackConfigSecretStatusData } from './radix-api/alerting/slack-config-secret-status/test-data';
import { SlackConfigSecretStatusModelValidationMap } from './radix-api/alerting/slack-config-secret-status';
import { SlackConfigSecretStatusModelNormalizer } from './radix-api/alerting/slack-config-secret-status/normalizer';

import { testData as UpdateAlertingConfigData } from './radix-api/alerting/update-alerting-config/test-data';
import { UpdateAlertingConfigModelValidationMap } from './radix-api/alerting/update-alerting-config';
import { UpdateAlertingConfigModelNormalizer } from './radix-api/alerting/update-alerting-config/normalizer';

import { testData as UpdateReceiverConfigSecretsData } from './radix-api/alerting/update-receiver-config-secrets/test-data';
import { UpdateReceiverConfigSecretsModelValidationMap } from './radix-api/alerting/update-receiver-config-secrets';
import { UpdateReceiverConfigSecretsModelNormalizer } from './radix-api/alerting/update-receiver-config-secrets/normalizer';

import { testData as UpdateSlackConfigSecretsData } from './radix-api/alerting/update-slack-config-secrets/test-data';
import { UpdateSlackConfigSecretsModelValidationMap } from './radix-api/alerting/update-slack-config-secrets';
import { UpdateSlackConfigSecretsModelNormalizer } from './radix-api/alerting/update-slack-config-secrets/normalizer';

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

import { testData as AzureKeyVaultSecretVersionData } from './radix-api/secrets/azure-key-vault-secret-version/test-data';
import { AzureKeyVaultSecretVersionModelValidationMap } from './radix-api/secrets/azure-key-vault-secret-version';
import { AzureKeyVaultSecretVersionModelNormalizer } from './radix-api/secrets/azure-key-vault-secret-version/normalizer';

import { testData as BuildSecretData } from './radix-api/buildsecrets/build-secret/test-data';
import { BuildSecretModelValidationMap } from './radix-api/buildsecrets/build-secret';
import { BuildSecretModelNormalizer } from './radix-api/buildsecrets/build-secret/normalizer';

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

import { testData as EnvVarData } from './radix-api/environmentvariables/env-var/test-data';
import { EnvVarNormalizedModelValidationMap } from './radix-api/environmentvariables/env-var';
import { EnvVarModelNormalizer } from './radix-api/environmentvariables/env-var/normalizer';

import { testData as EnvVarMetadataData } from './radix-api/environmentvariables/env-var-metadata/test-data';
import { EnvVarMetadataModelValidationMap } from './radix-api/environmentvariables/env-var-metadata';
import { EnvVarMetadataModelNormalizer } from './radix-api/environmentvariables/env-var-metadata/normalizer';

import { testData as EventData } from './radix-api/events/event/test-data';
import { EventModelValidationMap } from './radix-api/events/event';
import { EventModelNormalizer } from './radix-api/events/event/normalizer';

import { testData as HorizontalScalingSummaryData } from './horizontal-scaling-summary/test-data';
import { HorizontalScalingSummaryModelValidationMap } from './horizontal-scaling-summary';
import { HorizontalScalingSummaryModelNormalizer } from './horizontal-scaling-summary/normalizer';

import { testData as ImageHubSecretData } from './radix-api/privateimagehubs/image-hub-secret/test-data';
import { ImageHubSecretModelValidationMap } from './radix-api/privateimagehubs/image-hub-secret';
import { ImageHubSecretModelNormalizer } from './radix-api/privateimagehubs/image-hub-secret/normalizer';

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

import { testData as ObjectStateData } from './radix-api/events/object-state/test-data';
import { ObjectStateModelValidationMap } from './radix-api/events/object-state';
import { ObjectStateModelNormalizer } from './radix-api/events/object-state/normalizer';

import { testData as PipelineRunData } from './pipeline-run/test-data';
import { PipelineRunModelValidationMap } from './pipeline-run';
import { PipelineRunModelNormalizer } from './pipeline-run/normalizer';

import { testData as PipelineRunTaskData } from './pipeline-run-task/test-data';
import { PipelineRunTaskModelValidationMap } from './pipeline-run-task';
import { PipelineRunTaskModelNormalizer } from './pipeline-run-task/normalizer';

import { testData as PipelineRunTaskStepData } from './pipeline-run-task-step/test-data';
import { PipelineRunTaskStepModelValidationMap } from './pipeline-run-task-step';
import { PipelineRunTaskStepModelNormalizer } from './pipeline-run-task-step/normalizer';

import { testData as PodStateData } from './radix-api/events/pod-state/test-data';
import { PodStateModelValidationMap } from './radix-api/events/pod-state';
import { PodStateModelNormalizer } from './radix-api/events/pod-state/normalizer';

import { testData as PortData } from './port/test-data';
import { PortModelValidationMap } from './port';
import { PortModelNormalizer } from './port/normalizer';

import { testData as DeployKeyAndSecretData } from './deploy-key-and-secret/test-data';
import { DeployKeyAndSecretModelValidationMap } from './deploy-key-and-secret';
import { DeployKeyAndSecretModelNormalizer } from './deploy-key-and-secret/normalizer';

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

import { testData as SecretData } from './radix-api/secrets/secret/test-data';
import { SecretModelValidationMap } from './radix-api/secrets/secret';
import { SecretModelNormalizer } from './radix-api/secrets/secret/normalizer';

import { testData as ServiceNowApplicationData } from './service-now-application/test-data';
import { ServiceNowApplicationModelValidationMap } from './service-now-application';
import { ServiceNowApplicationModelNormalizer } from './service-now-application/normalizer';

import { testData as StepData } from './step/test-data';
import { StepModelValidationMap } from './step';
import { StepModelNormalizer } from './step/normalizer';

import { testData as TLSCertificateData } from './radix-api/secrets/tls-certificate/test-data';
import { TLSCertificateModelValidationMap } from './radix-api/secrets/tls-certificate';
import { TLSCertificateModelNormalizer } from './radix-api/secrets/tls-certificate/normalizer';

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

import { testData as NotificationsData } from './scheduled-job-notifications/test-data';
import { NotificationsValidationMap } from './scheduled-job-notifications';
import { NotificationsModelNormalizer } from './scheduled-job-notifications/normalizer';

interface TestDependencyComponents<T> {
  AlertConfig: T;
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
  AzureIdentity: T;
  AzureKeyVaultSecretVersion: T;
  BuildSecret: T;
  Component: T;
  ComponentScan: T;
  ComponentSummary: T;
  DeployKeyAndSecret: T;
  Deployment: T;
  DeploymentSummary: T;
  Environment: T;
  EnvironmentScanSummary: T;
  EnvironmentSummary: T;
  EnvVar: T;
  EnvVarMetadata: T;
  Event: T;
  HorizontalScalingSummary: T;
  Identity: T;
  ImageHubSecret: T;
  Job: T;
  JobSummary: T;
  MachineUser: T;
  Notifications: T;
  OAuthAuxiliaryResource: T;
  ObjectState: T;
  PipelineRun: T;
  PipelineRunTask: T;
  PipelineRunTaskStep: T;
  PodState: T;
  Port: T;
  ReceiverConfig: T;
  ReceiverConfigSecretStatus: T;
  ReplicaNode: T;
  ReplicaResource: T;
  ReplicaResources: T;
  ReplicaSummary: T;
  Scan: T;
  ScheduledBatchSummary: T;
  ScheduledJobSummary: T;
  Secret: T;
  ServiceNowApplication: T;
  SlackConfig: T;
  SlackConfigSecretStatus: T;
  Step: T;
  TLSCertificate: T;
  UpdateAlertingConfig: T;
  UpdateReceiverConfigSecrets: T;
  UpdateSlackConfigSecrets: T;
  Vulnerability: T;
  VulnerabilitySummary: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  AlertConfig: AlertConfigData,
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
  AzureIdentity: AzureIdentityData,
  AzureKeyVaultSecretVersion: AzureKeyVaultSecretVersionData,
  BuildSecret: BuildSecretData,
  Component: ComponentData,
  ComponentScan: ComponentScanData,
  ComponentSummary: ComponentSummaryData,
  DeployKeyAndSecret: DeployKeyAndSecretData,
  Deployment: DeploymentData,
  DeploymentSummary: DeploymentSummaryData,
  Environment: EnvironmentData,
  EnvironmentScanSummary: EnvironmentScanSummaryData,
  EnvironmentSummary: EnvironmentSummaryData,
  EnvVar: EnvVarData,
  EnvVarMetadata: EnvVarMetadataData,
  Event: EventData,
  HorizontalScalingSummary: HorizontalScalingSummaryData,
  Identity: IdentityData,
  ImageHubSecret: ImageHubSecretData,
  Job: JobData,
  JobSummary: JobSummaryData,
  MachineUser: MachineUserData,
  Notifications: NotificationsData,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceData,
  ObjectState: ObjectStateData,
  PipelineRun: PipelineRunData,
  PipelineRunTask: PipelineRunTaskData,
  PipelineRunTaskStep: PipelineRunTaskStepData,
  PodState: PodStateData,
  Port: PortData,
  ReceiverConfig: ReceiverConfigData,
  ReceiverConfigSecretStatus: ReceiverConfigSecretStatusData,
  ReplicaNode: ReplicaNodeData,
  ReplicaResource: ReplicaResourceData,
  ReplicaResources: ReplicaResourcesData,
  ReplicaSummary: ReplicaSummaryData,
  Scan: ScanData,
  ScheduledBatchSummary: ScheduledBatchSummaryData,
  ScheduledJobSummary: ScheduledJobSummaryData,
  Secret: SecretData,
  ServiceNowApplication: ServiceNowApplicationData,
  SlackConfig: SlackConfigData,
  SlackConfigSecretStatus: SlackConfigSecretStatusData,
  Step: StepData,
  TLSCertificate: TLSCertificateData,
  UpdateAlertingConfig: UpdateAlertingConfigData,
  UpdateReceiverConfigSecrets: UpdateReceiverConfigSecretsData,
  UpdateSlackConfigSecrets: UpdateSlackConfigSecretsData,
  Vulnerability: VulnerabilityData,
  VulnerabilitySummary: VulnerabilitySummaryData,
};

export const models: TestDependencyComponents<ValidationMap<any>> = {
  AlertConfig: AlertConfigModelValidationMap,
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
  AzureIdentity: AzureIdentityModelValidationMap,
  AzureKeyVaultSecretVersion: AzureKeyVaultSecretVersionModelValidationMap,
  BuildSecret: BuildSecretModelValidationMap,
  Component: ComponentModelValidationMap,
  ComponentScan: ComponentScanModelValidationMap,
  ComponentSummary: ComponentSummaryModelValidationMap,
  DeployKeyAndSecret: DeployKeyAndSecretModelValidationMap,
  Deployment: DeploymentModelValidationMap,
  DeploymentSummary: DeploymentSummaryModelValidationMap,
  Environment: EnvironmentModelValidationMap,
  EnvironmentScanSummary: EnvironmentScanSummaryModelValidationMap,
  EnvironmentSummary: EnvironmentSummaryModelValidationMap,
  EnvVar: EnvVarNormalizedModelValidationMap,
  EnvVarMetadata: EnvVarMetadataModelValidationMap,
  Event: EventModelValidationMap,
  HorizontalScalingSummary: HorizontalScalingSummaryModelValidationMap,
  Identity: IdentityModelValidationMap,
  ImageHubSecret: ImageHubSecretModelValidationMap,
  Job: JobModelValidationMap,
  JobSummary: JobSummaryModelValidationMap,
  MachineUser: MachineUserModelValidationMap,
  Notifications: NotificationsValidationMap,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceModelValidationMap,
  ObjectState: ObjectStateModelValidationMap,
  PipelineRun: PipelineRunModelValidationMap,
  PipelineRunTask: PipelineRunTaskModelValidationMap,
  PipelineRunTaskStep: PipelineRunTaskStepModelValidationMap,
  PodState: PodStateModelValidationMap,
  Port: PortModelValidationMap,
  ReceiverConfig: ReceiverConfigModelValidationMap,
  ReceiverConfigSecretStatus: ReceiverConfigSecretStatusModelValidationMap,
  ReplicaNode: ReplicaNodeModelValidationMap,
  ReplicaResource: ReplicaResourceModelValidationMap,
  ReplicaResources: ReplicaResourcesModelValidationMap,
  ReplicaSummary: ReplicaSummaryNormalizedModelValidationMap,
  Scan: ScanModelValidationMap,
  ScheduledBatchSummary: ScheduledBatchSummaryModelValidationMap,
  ScheduledJobSummary: ScheduledJobSummaryModelValidationMap,
  Secret: SecretModelValidationMap,
  ServiceNowApplication: ServiceNowApplicationModelValidationMap,
  SlackConfig: SlackConfigModelValidationMap,
  SlackConfigSecretStatus: SlackConfigSecretStatusModelValidationMap,
  Step: StepModelValidationMap,
  TLSCertificate: TLSCertificateModelValidationMap,
  UpdateAlertingConfig: UpdateAlertingConfigModelValidationMap,
  UpdateReceiverConfigSecrets: UpdateReceiverConfigSecretsModelValidationMap,
  UpdateSlackConfigSecrets: UpdateSlackConfigSecretsModelValidationMap,
  Vulnerability: VulnerabilityModelValidationMap,
  VulnerabilitySummary: VulnerabilitySummaryModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  AlertConfig: AlertConfigModelNormalizer,
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
  AzureIdentity: AzureIdentityModelNormalizer,
  AzureKeyVaultSecretVersion: AzureKeyVaultSecretVersionModelNormalizer,
  BuildSecret: BuildSecretModelNormalizer,
  Component: ComponentModelNormalizer,
  ComponentScan: ComponentScanModelNormalizer,
  ComponentSummary: ComponentSummaryModelNormalizer,
  DeployKeyAndSecret: DeployKeyAndSecretModelNormalizer,
  Deployment: DeploymentModelNormalizer,
  DeploymentSummary: DeploymentSummaryModelNormalizer,
  Environment: EnvironmentModelNormalizer,
  EnvironmentScanSummary: EnvironmentScanSummaryModelNormalizer,
  EnvironmentSummary: EnvironmentSummaryModelNormalizer,
  EnvVar: EnvVarModelNormalizer,
  EnvVarMetadata: EnvVarMetadataModelNormalizer,
  Event: EventModelNormalizer,
  HorizontalScalingSummary: HorizontalScalingSummaryModelNormalizer,
  Identity: IdentityModelNormalizer,
  ImageHubSecret: ImageHubSecretModelNormalizer,
  Job: JobModelNormalizer,
  JobSummary: JobSummaryModelNormalizer,
  MachineUser: MachineUserModelNormalizer,
  Notifications: NotificationsModelNormalizer,
  OAuthAuxiliaryResource: OAuthAuxiliaryResourceModelNormalizer,
  ObjectState: ObjectStateModelNormalizer,
  PipelineRun: PipelineRunModelNormalizer,
  PipelineRunTask: PipelineRunTaskModelNormalizer,
  PipelineRunTaskStep: PipelineRunTaskStepModelNormalizer,
  PodState: PodStateModelNormalizer,
  Port: PortModelNormalizer,
  ReceiverConfig: ReceiverConfigModelNormalizer,
  ReceiverConfigSecretStatus: ReceiverConfigSecretStatusModelNormalizer,
  ReplicaNode: ReplicaNodeModelNormalizer,
  ReplicaResource: ReplicaResourceModelNormalizer,
  ReplicaResources: ReplicaResourcesModelNormalizer,
  ReplicaSummary: ReplicaSummaryModelNormalizer,
  Scan: ScanModelNormalizer,
  ScheduledBatchSummary: ScheduledBatchSummaryModelNormalizer,
  ScheduledJobSummary: ScheduledJobSummaryModelNormalizer,
  Secret: SecretModelNormalizer,
  ServiceNowApplication: ServiceNowApplicationModelNormalizer,
  SlackConfig: SlackConfigModelNormalizer,
  SlackConfigSecretStatus: SlackConfigSecretStatusModelNormalizer,
  Step: StepModelNormalizer,
  TLSCertificate: TLSCertificateModelNormalizer,
  UpdateAlertingConfig: UpdateAlertingConfigModelNormalizer,
  UpdateReceiverConfigSecrets: UpdateReceiverConfigSecretsModelNormalizer,
  UpdateSlackConfigSecrets: UpdateSlackConfigSecretsModelNormalizer,
  Vulnerability: VulnerabilityModelNormalizer,
  VulnerabilitySummary: VulnerabilitySummaryModelNormalizer,
};
