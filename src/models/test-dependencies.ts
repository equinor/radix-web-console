// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from './model-types';

// ALERTING

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

// APPLICATIONS

import { testData as ApplicationData } from './radix-api/applications/application/test-data';
import { ApplicationModelValidationMap } from './radix-api/applications/application';
import { ApplicationModelNormalizer } from './radix-api/applications/application/normalizer';

import { testData as ApplicationAliasData } from './radix-api/applications/application-alias/test-data';
import { ApplicationAliasModelValidationMap } from './radix-api/applications/application-alias';
import { ApplicationAliasModelNormalizer } from './radix-api/applications/application-alias/normalizer';

import { testData as ApplicationRegistrationData } from './radix-api/applications/application-registration/test-data';
import { ApplicationRegistrationModelValidationMap } from './radix-api/applications/application-registration';
import { ApplicationRegistrationModelNormalizer } from './radix-api/applications/application-registration/normalizer';

import { testData as ApplicationRegistrationPatchData } from './radix-api/applications/application-registration-patch/test-data';
import { ApplicationRegistrationPatchModelValidationMap } from './radix-api/applications/application-registration-patch';
import { ApplicationRegistrationPatchModelNormalizer } from './radix-api/applications/application-registration-patch/normalizer';

import { testData as ApplicationRegistrationPatchRequestData } from './radix-api/applications/application-registration-patch-request/test-data';
import { ApplicationRegistrationPatchRequestModelValidationMap } from './radix-api/applications/application-registration-patch-request';
import { ApplicationRegistrationPatchRequestModelNormalizer } from './radix-api/applications/application-registration-patch-request/normalizer';

import { testData as ApplicationRegistrationRequestData } from './radix-api/applications/application-registration-request/test-data';
import { ApplicationRegistrationRequestModelValidationMap } from './radix-api/applications/application-registration-request';
import { ApplicationRegistrationRequestModelNormalizer } from './radix-api/applications/application-registration-request/normalizer';

import { testData as ApplicationRegistrationUpsertResponseData } from './radix-api/applications/application-registration-upsert-response/test-data';
import { ApplicationRegistrationUpsertResponseModelValidationMap } from './radix-api/applications/application-registration-upsert-response';
import { ApplicationRegistrationUpsertResponseModelNormalizer } from './radix-api/applications/application-registration-upsert-response/normalizer';

import { testData as ApplicationSummaryData } from './radix-api/applications/application-summary/test-data';
import { ApplicationSummaryModelValidationMap } from './radix-api/applications/application-summary';
import { ApplicationSummaryModelNormalizer } from './radix-api/applications/application-summary/normalizer';

import { testData as DeployKeyAndSecretData } from './radix-api/applications/deploy-key-and-secret/test-data';
import { DeployKeyAndSecretModelValidationMap } from './radix-api/applications/deploy-key-and-secret';
import { DeployKeyAndSecretModelNormalizer } from './radix-api/applications/deploy-key-and-secret/normalizer';

import { testData as MachineUserData } from './radix-api/applications/machine-user/test-data';
import { MachineUserModelValidationMap } from './radix-api/applications/machine-user';
import { MachineUserModelNormalizer } from './radix-api/applications/machine-user/normalizer';

// BUILDSECRETS

import { testData as BuildSecretData } from './radix-api/buildsecrets/build-secret/test-data';
import { BuildSecretModelValidationMap } from './radix-api/buildsecrets/build-secret';
import { BuildSecretModelNormalizer } from './radix-api/buildsecrets/build-secret/normalizer';

// DEPLOYMENTS

import { testData as AuxiliaryResourceDeploymentData } from './radix-api/deployments/auxiliary-resource-deployment/test-data';
import { AuxiliaryResourceDeploymentModelValidationMap } from './radix-api/deployments/auxiliary-resource-deployment';
import { AuxiliaryResourceDeploymentModelNormalizer } from './radix-api/deployments/auxiliary-resource-deployment/normalizer';

import { testData as AzureIdentityData } from './radix-api/deployments/azure-identity/test-data';
import { AzureIdentityModelValidationMap } from './radix-api/deployments/azure-identity';
import { AzureIdentityModelNormalizer } from './radix-api/deployments/azure-identity/normalizer';

import { testData as ComponentData } from './radix-api/deployments/component/test-data';
import { ComponentModelValidationMap } from './radix-api/deployments/component';
import { ComponentModelNormalizer } from './radix-api/deployments/component/normalizer';

import { testData as ComponentSummaryData } from './radix-api/deployments/component-summary/test-data';
import { ComponentSummaryModelValidationMap } from './radix-api/deployments/component-summary';
import { ComponentSummaryModelNormalizer } from './radix-api/deployments/component-summary/normalizer';

import { testData as DeploymentData } from './radix-api/deployments/deployment/test-data';
import { DeploymentModelValidationMap } from './radix-api/deployments/deployment';
import { DeploymentModelNormalizer } from './radix-api/deployments/deployment/normalizer';

import { testData as DeploymentSummaryData } from './radix-api/deployments/deployment-summary/test-data';
import { DeploymentSummaryModelValidationMap } from './radix-api/deployments/deployment-summary';
import { DeploymentSummaryModelNormalizer } from './radix-api/deployments/deployment-summary/normalizer';

import { testData as HorizontalScalingSummaryData } from './radix-api/deployments/horizontal-scaling-summary/test-data';
import { HorizontalScalingSummaryModelValidationMap } from './radix-api/deployments/horizontal-scaling-summary';
import { HorizontalScalingSummaryModelNormalizer } from './radix-api/deployments/horizontal-scaling-summary/normalizer';

import { testData as IdentityData } from './radix-api/deployments/identity/test-data';
import { IdentityModelValidationMap } from './radix-api/deployments/identity';
import { IdentityModelNormalizer } from './radix-api/deployments/identity/normalizer';

import { testData as NodeData } from './radix-api/deployments/node/test-data';
import { NodeModelValidationMap } from './radix-api/deployments/node';
import { NodeModelNormalizer } from './radix-api/deployments/node/normalizer';

import { testData as NotificationsData } from './radix-api/deployments/notifications/test-data';
import { NotificationsValidationMap } from './radix-api/deployments/notifications';
import { NotificationsModelNormalizer } from './radix-api/deployments/notifications/normalizer';

import { testData as OAuthAuxiliaryResourceData } from './radix-api/deployments/oauth-auxiliary-resource/test-data';
import { OAuthAuxiliaryResourceModelValidationMap } from './radix-api/deployments/oauth-auxiliary-resource';
import { OAuthAuxiliaryResourceModelNormalizer } from './radix-api/deployments/oauth-auxiliary-resource/normalizer';

import { testData as PortData } from './radix-api/deployments/port/test-data';
import { PortModelValidationMap } from './radix-api/deployments/port';
import { PortModelNormalizer } from './radix-api/deployments/port/normalizer';

import { testData as ReplicaSummaryData } from './radix-api/deployments/replica-summary/test-data';
import { ReplicaSummaryNormalizedModelValidationMap } from './radix-api/deployments/replica-summary';
import { ReplicaSummaryModelNormalizer } from './radix-api/deployments/replica-summary/normalizer';

import { testData as ResourceRequirementsData } from './radix-api/deployments/resource-requirements/test-data';
import { ResourceRequirementsModelValidationMap } from './radix-api/deployments/resource-requirements';
import { ResourceRequirementsModelNormalizer } from './radix-api/deployments/resource-requirements/normalizer';

import { testData as ResourcesData } from './radix-api/deployments/resources/test-data';
import { ResourcesModelValidationMap } from './radix-api/deployments/resources';
import { ResourcesModelNormalizer } from './radix-api/deployments/resources/normalizer';

import { testData as ScheduledBatchSummaryData } from './radix-api/deployments/scheduled-batch-summary/test-data';
import { ScheduledBatchSummaryModelValidationMap } from './radix-api/deployments/scheduled-batch-summary';
import { ScheduledBatchSummaryModelNormalizer } from './radix-api/deployments/scheduled-batch-summary/normalizer';

import { testData as ScheduledJobSummaryData } from './radix-api/deployments/scheduled-job-summary/test-data';
import { ScheduledJobSummaryModelValidationMap } from './radix-api/deployments/scheduled-job-summary';
import { ScheduledJobSummaryModelNormalizer } from './radix-api/deployments/scheduled-job-summary/normalizer';

// ENVIRONMENTVARIABLES

import { testData as EnvVarData } from './radix-api/environmentvariables/env-var/test-data';
import { EnvVarNormalizedModelValidationMap } from './radix-api/environmentvariables/env-var';
import { EnvVarModelNormalizer } from './radix-api/environmentvariables/env-var/normalizer';

import { testData as EnvVarMetadataData } from './radix-api/environmentvariables/env-var-metadata/test-data';
import { EnvVarMetadataModelValidationMap } from './radix-api/environmentvariables/env-var-metadata';
import { EnvVarMetadataModelNormalizer } from './radix-api/environmentvariables/env-var-metadata/normalizer';

// ENVIRONMENTS

import { testData as EnvironmentData } from './radix-api/environments/environment/test-data';
import { EnvironmentModelValidationMap } from './radix-api/environments/environment';
import { EnvironmentModelNormalizer } from './radix-api/environments/environment/normalizer';

import { testData as EnvironmentSummaryData } from './radix-api/environments/environment-summary/test-data';
import { EnvironmentSummaryModelValidationMap } from './radix-api/environments/environment-summary';
import { EnvironmentSummaryModelNormalizer } from './radix-api/environments/environment-summary/normalizer';

// EVENTS

import { testData as EventData } from './radix-api/events/event/test-data';
import { EventModelValidationMap } from './radix-api/events/event';
import { EventModelNormalizer } from './radix-api/events/event/normalizer';

import { testData as ObjectStateData } from './radix-api/events/object-state/test-data';
import { ObjectStateModelValidationMap } from './radix-api/events/object-state';
import { ObjectStateModelNormalizer } from './radix-api/events/object-state/normalizer';

import { testData as PodStateData } from './radix-api/events/pod-state/test-data';
import { PodStateModelValidationMap } from './radix-api/events/pod-state';
import { PodStateModelNormalizer } from './radix-api/events/pod-state/normalizer';

// JOBS

import { testData as JobData } from './radix-api/jobs/job/test-data';
import { JobModelValidationMap } from './radix-api/jobs/job';
import { JobModelNormalizer } from './radix-api/jobs/job/normalizer';

import { testData as JobSummaryData } from './radix-api/jobs/job-summary/test-data';
import { JobSummaryModelValidationMap } from './radix-api/jobs/job-summary';
import { JobSummaryModelNormalizer } from './radix-api/jobs/job-summary/normalizer';

import { testData as PipelineRunData } from './radix-api/jobs/pipeline-run/test-data';
import { PipelineRunModelValidationMap } from './radix-api/jobs/pipeline-run';
import { PipelineRunModelNormalizer } from './radix-api/jobs/pipeline-run/normalizer';

import { testData as PipelineRunTaskData } from './radix-api/jobs/pipeline-run-task/test-data';
import { PipelineRunTaskModelValidationMap } from './radix-api/jobs/pipeline-run-task';
import { PipelineRunTaskModelNormalizer } from './radix-api/jobs/pipeline-run-task/normalizer';

import { testData as PipelineRunTaskStepData } from './radix-api/jobs/pipeline-run-task-step/test-data';
import { PipelineRunTaskStepModelValidationMap } from './radix-api/jobs/pipeline-run-task-step';
import { PipelineRunTaskStepModelNormalizer } from './radix-api/jobs/pipeline-run-task-step/normalizer';

import { testData as StepData } from './radix-api/jobs/step/test-data';
import { StepModelValidationMap } from './radix-api/jobs/step';
import { StepModelNormalizer } from './radix-api/jobs/step/normalizer';

// PRIVATEIMAGEHUBS

import { testData as ImageHubSecretData } from './radix-api/privateimagehubs/image-hub-secret/test-data';
import { ImageHubSecretModelValidationMap } from './radix-api/privateimagehubs/image-hub-secret';
import { ImageHubSecretModelNormalizer } from './radix-api/privateimagehubs/image-hub-secret/normalizer';

// SECRETS

import { testData as AzureKeyVaultSecretVersionData } from './radix-api/secrets/azure-key-vault-secret-version/test-data';
import { AzureKeyVaultSecretVersionModelValidationMap } from './radix-api/secrets/azure-key-vault-secret-version';
import { AzureKeyVaultSecretVersionModelNormalizer } from './radix-api/secrets/azure-key-vault-secret-version/normalizer';

import { testData as SecretData } from './radix-api/secrets/secret/test-data';
import { SecretModelValidationMap } from './radix-api/secrets/secret';
import { SecretModelNormalizer } from './radix-api/secrets/secret/normalizer';

import { testData as TLSCertificateData } from './radix-api/secrets/tls-certificate/test-data';
import { TLSCertificateModelValidationMap } from './radix-api/secrets/tls-certificate';
import { TLSCertificateModelNormalizer } from './radix-api/secrets/tls-certificate/normalizer';

// Other

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
  AlertConfig: T;
  AlertingConfig: T;
  Application: T;
  ApplicationAlias: T;
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
  Node: T;
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
  ReplicaSummary: T;
  ResourceRequirements: T;
  Resources: T;
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
  ApplicationAlias: ApplicationAliasData,
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
  Node: NodeData,
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
  ReplicaSummary: ReplicaSummaryData,
  ResourceRequirements: ResourceRequirementsData,
  Resources: ResourcesData,
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
  ApplicationAlias: ApplicationAliasModelValidationMap,
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
  Node: NodeModelValidationMap,
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
  ReplicaSummary: ReplicaSummaryNormalizedModelValidationMap,
  ResourceRequirements: ResourceRequirementsModelValidationMap,
  Resources: ResourcesModelValidationMap,
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
  ApplicationAlias: ApplicationAliasModelNormalizer,
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
  Node: NodeModelNormalizer,
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
  ReplicaSummary: ReplicaSummaryModelNormalizer,
  ResourceRequirements: ResourceRequirementsModelNormalizer,
  Resources: ResourcesModelNormalizer,
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
