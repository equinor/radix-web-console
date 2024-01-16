// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

// APPLICATIONS

import { testData as ApplicationData } from './applications/application/test-data';
import { ApplicationModelValidationMap } from './applications/application';
import { ApplicationModelNormalizer } from './applications/application/normalizer';

import { testData as ApplicationAliasData } from './applications/application-alias/test-data';
import { ApplicationAliasModelValidationMap } from './applications/application-alias';
import { ApplicationAliasModelNormalizer } from './applications/application-alias/normalizer';

import { testData as DNSAliasData } from './applications/dns-alias/test-data';
import { DNSAliasModelValidationMap } from './applications/dns-alias';
import { DNSAliasModelNormalizer } from './applications/dns-alias/normalizer';

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

import { testData as ComponentSummaryData } from './deployments/component-summary/test-data';
import { ComponentSummaryModelValidationMap } from './deployments/component-summary';
import { ComponentSummaryModelNormalizer } from './deployments/component-summary/normalizer';

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
  Application: T;
  ApplicationAlias: T;
  DNSAlias: T;
  ApplicationRegistration: T;
  ApplicationRegistrationPatch: T;
  ApplicationRegistrationPatchRequest: T;
  ApplicationRegistrationRequest: T;
  ApplicationRegistrationUpsertResponse: T;
  AuxiliaryResourceDeployment: T;
  AzureIdentity: T;
  ComponentSummary: T;
  DeployKeyAndSecret: T;
  DeploymentItem: T;
  DeploymentSummary: T;
  EnvironmentSummary: T;
  Event: T;
  HorizontalScalingSummary: T;
  Identity: T;
  Job: T;
  JobSummary: T;
  Node: T;
  Notifications: T;
  ObjectState: T;
  PipelineRun: T;
  PipelineRunTask: T;
  PipelineRunTaskStep: T;
  PodState: T;
  Port: T;
  ReplicaSummary: T;
  ResourceRequirements: T;
  Resources: T;
  ScheduledBatchRequest: T;
  ScheduledBatchSummary: T;
  ScheduledJobRequest: T;
  ScheduledJobSummary: T;
  Secret: T;
  Step: T;
  TLSCertificate: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  Application: ApplicationData,
  ApplicationAlias: ApplicationAliasData,
  DNSAlias: DNSAliasData,
  ApplicationRegistration: ApplicationRegistrationData,
  ApplicationRegistrationPatch: ApplicationRegistrationPatchData,
  ApplicationRegistrationPatchRequest: ApplicationRegistrationPatchRequestData,
  ApplicationRegistrationRequest: ApplicationRegistrationRequestData,
  ApplicationRegistrationUpsertResponse:
    ApplicationRegistrationUpsertResponseData,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentData,
  AzureIdentity: AzureIdentityData,
  ComponentSummary: ComponentSummaryData,
  DeployKeyAndSecret: DeployKeyAndSecretData,
  DeploymentSummary: DeploymentSummaryData,
  DeploymentItem: DeploymentItemData,
  EnvironmentSummary: EnvironmentSummaryData,
  Event: EventData,
  HorizontalScalingSummary: HorizontalScalingSummaryData,
  Identity: IdentityData,
  Job: JobData,
  JobSummary: JobSummaryData,
  Node: NodeData,
  Notifications: NotificationsData,
  ObjectState: ObjectStateData,
  PipelineRun: PipelineRunData,
  PipelineRunTask: PipelineRunTaskData,
  PipelineRunTaskStep: PipelineRunTaskStepData,
  PodState: PodStateData,
  Port: PortData,
  ReplicaSummary: ReplicaSummaryData,
  ResourceRequirements: ResourceRequirementsData,
  Resources: ResourcesData,
  ScheduledBatchRequest: ScheduledBatchRequestData,
  ScheduledBatchSummary: ScheduledBatchSummaryData,
  ScheduledJobRequest: ScheduledJobRequestData,
  ScheduledJobSummary: ScheduledJobSummaryData,
  Secret: SecretData,
  Step: StepData,
  TLSCertificate: TLSCertificateData,
};

export const models: TestDependencyComponents<
  ValidationMap<Record<string, unknown>>
> = {
  Application: ApplicationModelValidationMap,
  ApplicationAlias: ApplicationAliasModelValidationMap,
  DNSAlias: DNSAliasModelValidationMap,
  ApplicationRegistration: ApplicationRegistrationModelValidationMap,
  ApplicationRegistrationPatch: ApplicationRegistrationPatchModelValidationMap,
  ApplicationRegistrationPatchRequest:
    ApplicationRegistrationPatchRequestModelValidationMap,
  ApplicationRegistrationRequest:
    ApplicationRegistrationRequestModelValidationMap,
  ApplicationRegistrationUpsertResponse:
    ApplicationRegistrationUpsertResponseModelValidationMap,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelValidationMap,
  AzureIdentity: AzureIdentityModelValidationMap,
  ComponentSummary: ComponentSummaryModelValidationMap,
  DeployKeyAndSecret: DeployKeyAndSecretModelValidationMap,
  DeploymentItem: DeploymentItemModelValidationMap,
  DeploymentSummary: DeploymentSummaryModelValidationMap,
  EnvironmentSummary: EnvironmentSummaryModelValidationMap,
  Event: EventModelValidationMap,
  HorizontalScalingSummary: HorizontalScalingSummaryModelValidationMap,
  Identity: IdentityModelValidationMap,
  Job: JobModelValidationMap,
  JobSummary: JobSummaryModelValidationMap,
  Node: NodeModelValidationMap,
  Notifications: NotificationsValidationMap,
  ObjectState: ObjectStateModelValidationMap,
  PipelineRun: PipelineRunModelValidationMap,
  PipelineRunTask: PipelineRunTaskModelValidationMap,
  PipelineRunTaskStep: PipelineRunTaskStepModelValidationMap,
  PodState: PodStateModelValidationMap,
  Port: PortModelValidationMap,
  ReplicaSummary: ReplicaSummaryNormalizedModelValidationMap,
  ResourceRequirements: ResourceRequirementsModelValidationMap,
  Resources: ResourcesModelValidationMap,
  ScheduledBatchRequest: ScheduledBatchRequestModelValidationMap,
  ScheduledBatchSummary: ScheduledBatchSummaryModelValidationMap,
  ScheduledJobRequest: ScheduledJobRequestModelValidationMap,
  ScheduledJobSummary: ScheduledJobSummaryModelValidationMap,
  Secret: SecretModelValidationMap,
  Step: StepModelValidationMap,
  TLSCertificate: TLSCertificateModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  Application: ApplicationModelNormalizer,
  ApplicationAlias: ApplicationAliasModelNormalizer,
  DNSAlias: DNSAliasModelNormalizer,
  ApplicationRegistration: ApplicationRegistrationModelNormalizer,
  ApplicationRegistrationPatch: ApplicationRegistrationPatchModelNormalizer,
  ApplicationRegistrationPatchRequest:
    ApplicationRegistrationPatchRequestModelNormalizer,
  ApplicationRegistrationRequest: ApplicationRegistrationRequestModelNormalizer,
  ApplicationRegistrationUpsertResponse:
    ApplicationRegistrationUpsertResponseModelNormalizer,
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelNormalizer,
  AzureIdentity: AzureIdentityModelNormalizer,
  ComponentSummary: ComponentSummaryModelNormalizer,
  DeployKeyAndSecret: DeployKeyAndSecretModelNormalizer,
  DeploymentItem: DeploymentItemModelNormalizer,
  DeploymentSummary: DeploymentSummaryModelNormalizer,
  EnvironmentSummary: EnvironmentSummaryModelNormalizer,
  Event: EventModelNormalizer,
  HorizontalScalingSummary: HorizontalScalingSummaryModelNormalizer,
  Identity: IdentityModelNormalizer,
  Job: JobModelNormalizer,
  JobSummary: JobSummaryModelNormalizer,
  Node: NodeModelNormalizer,
  Notifications: NotificationsModelNormalizer,
  ObjectState: ObjectStateModelNormalizer,
  PipelineRun: PipelineRunModelNormalizer,
  PipelineRunTask: PipelineRunTaskModelNormalizer,
  PipelineRunTaskStep: PipelineRunTaskStepModelNormalizer,
  PodState: PodStateModelNormalizer,
  Port: PortModelNormalizer,
  ReplicaSummary: ReplicaSummaryModelNormalizer,
  ResourceRequirements: ResourceRequirementsModelNormalizer,
  Resources: ResourcesModelNormalizer,
  ScheduledBatchRequest: ScheduledBatchRequestModelNormalizer,
  ScheduledBatchSummary: ScheduledBatchSummaryModelNormalizer,
  ScheduledJobRequest: ScheduledJobRequestModelNormalizer,
  ScheduledJobSummary: ScheduledJobSummaryModelNormalizer,
  Secret: SecretModelNormalizer,
  Step: StepModelNormalizer,
  TLSCertificate: TLSCertificateModelNormalizer,
};
