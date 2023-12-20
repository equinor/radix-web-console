// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

// ALERTING

import { testData as AlertConfigData } from './alerting/alert-config/test-data';
import { AlertConfigModelValidationMap } from './alerting/alert-config';
import { AlertConfigModelNormalizer } from './alerting/alert-config/normalizer';

import { testData as AlertingConfigData } from './alerting/alerting-config/test-data';
import { AlertingConfigModelValidationMap } from './alerting/alerting-config';
import { AlertingConfigModelNormalizer } from './alerting/alerting-config/normalizer';

import { testData as ReceiverConfigData } from './alerting/receiver-config/test-data';
import { ReceiverConfigModelValidationMap } from './alerting/receiver-config';
import { ReceiverConfigModelNormalizer } from './alerting/receiver-config/normalizer';

import { testData as ReceiverConfigSecretStatusData } from './alerting/receiver-config-secret-status/test-data';
import { ReceiverConfigSecretStatusModelValidationMap } from './alerting/receiver-config-secret-status';
import { ReceiverConfigSecretStatusModelNormalizer } from './alerting/receiver-config-secret-status/normalizer';

import { testData as SlackConfigData } from './alerting/slack-config/test-data';
import { SlackConfigModelValidationMap } from './alerting/slack-config';
import { SlackConfigModelNormalizer } from './alerting/slack-config/normalizer';

import { testData as SlackConfigSecretStatusData } from './alerting/slack-config-secret-status/test-data';
import { SlackConfigSecretStatusModelValidationMap } from './alerting/slack-config-secret-status';
import { SlackConfigSecretStatusModelNormalizer } from './alerting/slack-config-secret-status/normalizer';

import { testData as UpdateAlertingConfigData } from './alerting/update-alerting-config/test-data';
import { UpdateAlertingConfigModelValidationMap } from './alerting/update-alerting-config';
import { UpdateAlertingConfigModelNormalizer } from './alerting/update-alerting-config/normalizer';

import { testData as UpdateReceiverConfigSecretsData } from './alerting/update-receiver-config-secrets/test-data';
import { UpdateReceiverConfigSecretsModelValidationMap } from './alerting/update-receiver-config-secrets';
import { UpdateReceiverConfigSecretsModelNormalizer } from './alerting/update-receiver-config-secrets/normalizer';

import { testData as UpdateSlackConfigSecretsData } from './alerting/update-slack-config-secrets/test-data';
import { UpdateSlackConfigSecretsModelValidationMap } from './alerting/update-slack-config-secrets';
import { UpdateSlackConfigSecretsModelNormalizer } from './alerting/update-slack-config-secrets/normalizer';

// APPLICATIONS

import { testData as ApplicationData } from './applications/application/test-data';
import { ApplicationModelValidationMap } from './applications/application';
import { ApplicationModelNormalizer } from './applications/application/normalizer';

import { testData as ApplicationAliasData } from './applications/application-alias/test-data';
import { ApplicationAliasModelValidationMap } from './applications/application-alias';
import { ApplicationAliasModelNormalizer } from './applications/application-alias/normalizer';

import { testData as ApplicationRegistrationData } from './applications/application-registration/test-data';
import { ApplicationRegistrationModelValidationMap } from './applications/application-registration';
import { ApplicationRegistrationModelNormalizer } from './applications/application-registration/normalizer';

import { testData as ApplicationRegistrationPatchData } from './applications/application-registration-patch/test-data';
import { ApplicationRegistrationPatchModelValidationMap } from './applications/application-registration-patch';
import { ApplicationRegistrationPatchModelNormalizer } from './applications/application-registration-patch/normalizer';

import { testData as ApplicationRegistrationPatchRequestData } from './applications/application-registration-patch-request/test-data';
import { ApplicationRegistrationPatchRequestModelValidationMap } from './applications/application-registration-patch-request';
import { ApplicationRegistrationPatchRequestModelNormalizer } from './applications/application-registration-patch-request/normalizer';

import { testData as ApplicationRegistrationRequestData } from './applications/application-registration-request/test-data';
import { ApplicationRegistrationRequestModelValidationMap } from './applications/application-registration-request';
import { ApplicationRegistrationRequestModelNormalizer } from './applications/application-registration-request/normalizer';

import { testData as ApplicationRegistrationUpsertResponseData } from './applications/application-registration-upsert-response/test-data';
import { ApplicationRegistrationUpsertResponseModelValidationMap } from './applications/application-registration-upsert-response';
import { ApplicationRegistrationUpsertResponseModelNormalizer } from './applications/application-registration-upsert-response/normalizer';

import { testData as ApplicationSummaryData } from './applications/application-summary/test-data';
import { ApplicationSummaryModelValidationMap } from './applications/application-summary';
import { ApplicationSummaryModelNormalizer } from './applications/application-summary/normalizer';

import { testData as DeployKeyAndSecretData } from './applications/deploy-key-and-secret/test-data';
import { DeployKeyAndSecretModelValidationMap } from './applications/deploy-key-and-secret';
import { DeployKeyAndSecretModelNormalizer } from './applications/deploy-key-and-secret/normalizer';

// DEPLOYMENTS

import { testData as AuxiliaryResourceDeploymentData } from './deployments/auxiliary-resource-deployment/test-data';
import { AuxiliaryResourceDeploymentModelValidationMap } from './deployments/auxiliary-resource-deployment';
import { AuxiliaryResourceDeploymentModelNormalizer } from './deployments/auxiliary-resource-deployment/normalizer';

import { testData as AzureIdentityData } from './deployments/azure-identity/test-data';
import { AzureIdentityModelValidationMap } from './deployments/azure-identity';
import { AzureIdentityModelNormalizer } from './deployments/azure-identity/normalizer';

import { testData as ComponentData } from './deployments/component/test-data';
import { ComponentModelValidationMap } from './deployments/component';
import { ComponentModelNormalizer } from './deployments/component/normalizer';

import { testData as ComponentSummaryData } from './deployments/component-summary/test-data';
import { ComponentSummaryModelValidationMap } from './deployments/component-summary';
import { ComponentSummaryModelNormalizer } from './deployments/component-summary/normalizer';

import { testData as DeploymentData } from './deployments/deployment/test-data';
import { DeploymentModelValidationMap } from './deployments/deployment';
import { DeploymentModelNormalizer } from './deployments/deployment/normalizer';

import { testData as DeploymentSummaryData } from './deployments/deployment-summary/test-data';
import { DeploymentSummaryModelValidationMap } from './deployments/deployment-summary';
import { DeploymentSummaryModelNormalizer } from './deployments/deployment-summary/normalizer';

import { testData as DeploymentItemData } from './deployments/deployment-item/test-data';
import { DeploymentItemModelValidationMap } from './deployments/deployment-item';
import { DeploymentItemModelNormalizer } from './deployments/deployment-item/normalizer';

import { testData as HorizontalScalingSummaryData } from './deployments/horizontal-scaling-summary/test-data';
import { HorizontalScalingSummaryModelValidationMap } from './deployments/horizontal-scaling-summary';
import { HorizontalScalingSummaryModelNormalizer } from './deployments/horizontal-scaling-summary/normalizer';

import { testData as IdentityData } from './deployments/identity/test-data';
import { IdentityModelValidationMap } from './deployments/identity';
import { IdentityModelNormalizer } from './deployments/identity/normalizer';

import { testData as NodeData } from './deployments/node/test-data';
import { NodeModelValidationMap } from './deployments/node';
import { NodeModelNormalizer } from './deployments/node/normalizer';

import { testData as NotificationsData } from './deployments/notifications/test-data';
import { NotificationsValidationMap } from './deployments/notifications';
import { NotificationsModelNormalizer } from './deployments/notifications/normalizer';

import { testData as OAuthAuxiliaryResourceData } from './deployments/oauth-auxiliary-resource/test-data';
import { OAuthAuxiliaryResourceModelValidationMap } from './deployments/oauth-auxiliary-resource';
import { OAuthAuxiliaryResourceModelNormalizer } from './deployments/oauth-auxiliary-resource/normalizer';

import { testData as PortData } from './deployments/port/test-data';
import { PortModelValidationMap } from './deployments/port';
import { PortModelNormalizer } from './deployments/port/normalizer';

import { testData as ReplicaSummaryData } from './deployments/replica-summary/test-data';
import { ReplicaSummaryNormalizedModelValidationMap } from './deployments/replica-summary';
import { ReplicaSummaryModelNormalizer } from './deployments/replica-summary/normalizer';

import { testData as ResourceRequirementsData } from './deployments/resource-requirements/test-data';
import { ResourceRequirementsModelValidationMap } from './deployments/resource-requirements';
import { ResourceRequirementsModelNormalizer } from './deployments/resource-requirements/normalizer';

import { testData as ResourcesData } from './deployments/resources/test-data';
import { ResourcesModelValidationMap } from './deployments/resources';
import { ResourcesModelNormalizer } from './deployments/resources/normalizer';

import { testData as ScheduledBatchSummaryData } from './deployments/scheduled-batch-summary/test-data';
import { ScheduledBatchSummaryModelValidationMap } from './deployments/scheduled-batch-summary';
import { ScheduledBatchSummaryModelNormalizer } from './deployments/scheduled-batch-summary/normalizer';

import { testData as ScheduledJobSummaryData } from './deployments/scheduled-job-summary/test-data';
import { ScheduledJobSummaryModelValidationMap } from './deployments/scheduled-job-summary';
import { ScheduledJobSummaryModelNormalizer } from './deployments/scheduled-job-summary/normalizer';

// ENVIRONMENTS

import { testData as EnvironmentData } from './environments/environment/test-data';
import { EnvironmentModelValidationMap } from './environments/environment';
import { EnvironmentModelNormalizer } from './environments/environment/normalizer';

import { testData as EnvironmentSummaryData } from './environments/environment-summary/test-data';
import { EnvironmentSummaryModelValidationMap } from './environments/environment-summary';
import { EnvironmentSummaryModelNormalizer } from './environments/environment-summary/normalizer';

import { testData as ScheduledJobRequestData } from './environments/scheduled-job-request/test-data';
import { ScheduledJobRequestModelValidationMap } from './environments/scheduled-job-request';
import { ScheduledJobRequestModelNormalizer } from './environments/scheduled-job-request/normalizer';

import { testData as ScheduledBatchRequestData } from './environments/scheduled-batch-request/test-data';
import { ScheduledBatchRequestModelValidationMap } from './environments/scheduled-batch-request';
import { ScheduledBatchRequestModelNormalizer } from './environments/scheduled-batch-request/normalizer';

// EVENTS

import { testData as EventData } from './events/event/test-data';
import { EventModelValidationMap } from './events/event';
import { EventModelNormalizer } from './events/event/normalizer';

import { testData as ObjectStateData } from './events/object-state/test-data';
import { ObjectStateModelValidationMap } from './events/object-state';
import { ObjectStateModelNormalizer } from './events/object-state/normalizer';

import { testData as PodStateData } from './events/pod-state/test-data';
import { PodStateModelValidationMap } from './events/pod-state';
import { PodStateModelNormalizer } from './events/pod-state/normalizer';

// JOBS

import { testData as JobData } from './jobs/job/test-data';
import { JobModelValidationMap } from './jobs/job';
import { JobModelNormalizer } from './jobs/job/normalizer';

import { testData as JobSummaryData } from './jobs/job-summary/test-data';
import { JobSummaryModelValidationMap } from './jobs/job-summary';
import { JobSummaryModelNormalizer } from './jobs/job-summary/normalizer';

import { testData as PipelineRunData } from './jobs/pipeline-run/test-data';
import { PipelineRunModelValidationMap } from './jobs/pipeline-run';
import { PipelineRunModelNormalizer } from './jobs/pipeline-run/normalizer';

import { testData as PipelineRunTaskData } from './jobs/pipeline-run-task/test-data';
import { PipelineRunTaskModelValidationMap } from './jobs/pipeline-run-task';
import { PipelineRunTaskModelNormalizer } from './jobs/pipeline-run-task/normalizer';

import { testData as PipelineRunTaskStepData } from './jobs/pipeline-run-task-step/test-data';
import { PipelineRunTaskStepModelValidationMap } from './jobs/pipeline-run-task-step';
import { PipelineRunTaskStepModelNormalizer } from './jobs/pipeline-run-task-step/normalizer';

import { testData as StepData } from './jobs/step/test-data';
import { StepModelValidationMap } from './jobs/step';
import { StepModelNormalizer } from './jobs/step/normalizer';

// SECRETS

import { testData as SecretData } from './secrets/secret/test-data';
import { SecretModelValidationMap } from './secrets/secret';
import { SecretModelNormalizer } from './secrets/secret/normalizer';

import { testData as TLSCertificateData } from './secrets/tls-certificate/test-data';
import { TLSCertificateModelValidationMap } from './secrets/tls-certificate';
import { TLSCertificateModelNormalizer } from './secrets/tls-certificate/normalizer';

interface TestDependencyComponents<T> {
  AlertConfig: T;
  AlertingConfig: T;
  Application: T;
  ApplicationAlias: T;
  ApplicationRegistration: T;
  ApplicationRegistrationPatch: T;
  ApplicationRegistrationPatchRequest: T;
  ApplicationRegistrationRequest: T;
  ApplicationRegistrationUpsertResponse: T;
  ApplicationSummary: T;
  AuxiliaryResourceDeployment: T;
  AzureIdentity: T;
  Component: T;
  ComponentSummary: T;
  DeployKeyAndSecret: T;
  Deployment: T;
  DeploymentItem: T;
  DeploymentSummary: T;
  Environment: T;
  EnvironmentSummary: T;
  Event: T;
  HorizontalScalingSummary: T;
  Identity: T;
  Job: T;
  JobSummary: T;
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
  ScheduledBatchRequest: T;
  ScheduledBatchSummary: T;
  ScheduledJobRequest: T;
  ScheduledJobSummary: T;
  Secret: T;
  SlackConfig: T;
  SlackConfigSecretStatus: T;
  Step: T;
  TLSCertificate: T;
  UpdateAlertingConfig: T;
  UpdateReceiverConfigSecrets: T;
  UpdateSlackConfigSecrets: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  AlertConfig: AlertConfigData,
  AlertingConfig: AlertingConfigData,
  Application: ApplicationData,
  ApplicationAlias: ApplicationAliasData,
  ApplicationRegistration: ApplicationRegistrationData,
  ApplicationRegistrationPatch: ApplicationRegistrationPatchData,
  ApplicationRegistrationPatchRequest: ApplicationRegistrationPatchRequestData,
  ApplicationRegistrationRequest: ApplicationRegistrationRequestData,
  ApplicationRegistrationUpsertResponse:
    ApplicationRegistrationUpsertResponseData,
  ApplicationSummary: ApplicationSummaryData,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentData,
  AzureIdentity: AzureIdentityData,
  Component: ComponentData,
  ComponentSummary: ComponentSummaryData,
  DeployKeyAndSecret: DeployKeyAndSecretData,
  Deployment: DeploymentData,
  DeploymentSummary: DeploymentSummaryData,
  DeploymentItem: DeploymentItemData,
  Environment: EnvironmentData,
  EnvironmentSummary: EnvironmentSummaryData,
  Event: EventData,
  HorizontalScalingSummary: HorizontalScalingSummaryData,
  Identity: IdentityData,
  Job: JobData,
  JobSummary: JobSummaryData,
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
  ScheduledBatchRequest: ScheduledBatchRequestData,
  ScheduledBatchSummary: ScheduledBatchSummaryData,
  ScheduledJobRequest: ScheduledJobRequestData,
  ScheduledJobSummary: ScheduledJobSummaryData,
  Secret: SecretData,
  SlackConfig: SlackConfigData,
  SlackConfigSecretStatus: SlackConfigSecretStatusData,
  Step: StepData,
  TLSCertificate: TLSCertificateData,
  UpdateAlertingConfig: UpdateAlertingConfigData,
  UpdateReceiverConfigSecrets: UpdateReceiverConfigSecretsData,
  UpdateSlackConfigSecrets: UpdateSlackConfigSecretsData,
};

export const models: TestDependencyComponents<
  ValidationMap<Record<string, unknown>>
> = {
  AlertConfig: AlertConfigModelValidationMap,
  AlertingConfig: AlertingConfigModelValidationMap,
  Application: ApplicationModelValidationMap,
  ApplicationAlias: ApplicationAliasModelValidationMap,
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
  Component: ComponentModelValidationMap,
  ComponentSummary: ComponentSummaryModelValidationMap,
  DeployKeyAndSecret: DeployKeyAndSecretModelValidationMap,
  Deployment: DeploymentModelValidationMap,
  DeploymentItem: DeploymentItemModelValidationMap,
  DeploymentSummary: DeploymentSummaryModelValidationMap,
  Environment: EnvironmentModelValidationMap,
  EnvironmentSummary: EnvironmentSummaryModelValidationMap,
  Event: EventModelValidationMap,
  HorizontalScalingSummary: HorizontalScalingSummaryModelValidationMap,
  Identity: IdentityModelValidationMap,
  Job: JobModelValidationMap,
  JobSummary: JobSummaryModelValidationMap,
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
  ScheduledBatchRequest: ScheduledBatchRequestModelValidationMap,
  ScheduledBatchSummary: ScheduledBatchSummaryModelValidationMap,
  ScheduledJobRequest: ScheduledJobRequestModelValidationMap,
  ScheduledJobSummary: ScheduledJobSummaryModelValidationMap,
  Secret: SecretModelValidationMap,
  SlackConfig: SlackConfigModelValidationMap,
  SlackConfigSecretStatus: SlackConfigSecretStatusModelValidationMap,
  Step: StepModelValidationMap,
  TLSCertificate: TLSCertificateModelValidationMap,
  UpdateAlertingConfig: UpdateAlertingConfigModelValidationMap,
  UpdateReceiverConfigSecrets: UpdateReceiverConfigSecretsModelValidationMap,
  UpdateSlackConfigSecrets: UpdateSlackConfigSecretsModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  AlertConfig: AlertConfigModelNormalizer,
  AlertingConfig: AlertingConfigModelNormalizer,
  Application: ApplicationModelNormalizer,
  ApplicationAlias: ApplicationAliasModelNormalizer,
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
  Component: ComponentModelNormalizer,
  ComponentSummary: ComponentSummaryModelNormalizer,
  DeployKeyAndSecret: DeployKeyAndSecretModelNormalizer,
  Deployment: DeploymentModelNormalizer,
  DeploymentItem: DeploymentItemModelNormalizer,
  DeploymentSummary: DeploymentSummaryModelNormalizer,
  Environment: EnvironmentModelNormalizer,
  EnvironmentSummary: EnvironmentSummaryModelNormalizer,
  Event: EventModelNormalizer,
  HorizontalScalingSummary: HorizontalScalingSummaryModelNormalizer,
  Identity: IdentityModelNormalizer,
  Job: JobModelNormalizer,
  JobSummary: JobSummaryModelNormalizer,
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
  ScheduledBatchRequest: ScheduledBatchRequestModelNormalizer,
  ScheduledBatchSummary: ScheduledBatchSummaryModelNormalizer,
  ScheduledJobRequest: ScheduledJobRequestModelNormalizer,
  ScheduledJobSummary: ScheduledJobSummaryModelNormalizer,
  Secret: SecretModelNormalizer,
  SlackConfig: SlackConfigModelNormalizer,
  SlackConfigSecretStatus: SlackConfigSecretStatusModelNormalizer,
  Step: StepModelNormalizer,
  TLSCertificate: TLSCertificateModelNormalizer,
  UpdateAlertingConfig: UpdateAlertingConfigModelNormalizer,
  UpdateReceiverConfigSecrets: UpdateReceiverConfigSecretsModelNormalizer,
  UpdateSlackConfigSecrets: UpdateSlackConfigSecretsModelNormalizer,
};
