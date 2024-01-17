// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { ValidationMap } from 'prop-types';

import { ModelNormalizerType, TestDependencyDataType } from '../model-types';

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

// SECRETS

import { testData as SecretData } from './secrets/secret/test-data';
import { SecretModelValidationMap } from './secrets/secret';
import { SecretModelNormalizer } from './secrets/secret/normalizer';

import { testData as TLSCertificateData } from './secrets/tls-certificate/test-data';
import { TLSCertificateModelValidationMap } from './secrets/tls-certificate';
import { TLSCertificateModelNormalizer } from './secrets/tls-certificate/normalizer';

interface TestDependencyComponents<T> {
  AuxiliaryResourceDeployment: T;
  AzureIdentity: T;
  ComponentSummary: T;
  DeploymentItem: T;
  DeploymentSummary: T;
  Event: T;
  HorizontalScalingSummary: T;
  Identity: T;
  Node: T;
  Notifications: T;
  ObjectState: T;
  PodState: T;
  Port: T;
  ReplicaSummary: T;
  ResourceRequirements: T;
  Resources: T;
  ScheduledBatchSummary: T;
  ScheduledJobSummary: T;
  Secret: T;
  TLSCertificate: T;
}

export const testData: TestDependencyComponents<TestDependencyDataType> = {
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentData,
  AzureIdentity: AzureIdentityData,
  ComponentSummary: ComponentSummaryData,
  DeploymentSummary: DeploymentSummaryData,
  DeploymentItem: DeploymentItemData,
  Event: EventData,
  HorizontalScalingSummary: HorizontalScalingSummaryData,
  Identity: IdentityData,
  Node: NodeData,
  Notifications: NotificationsData,
  ObjectState: ObjectStateData,
  PodState: PodStateData,
  Port: PortData,
  ReplicaSummary: ReplicaSummaryData,
  ResourceRequirements: ResourceRequirementsData,
  Resources: ResourcesData,
  ScheduledBatchSummary: ScheduledBatchSummaryData,
  ScheduledJobSummary: ScheduledJobSummaryData,
  Secret: SecretData,
  TLSCertificate: TLSCertificateData,
};

export const models: TestDependencyComponents<
  ValidationMap<Record<string, unknown>>
> = {
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelValidationMap,
  AzureIdentity: AzureIdentityModelValidationMap,
  ComponentSummary: ComponentSummaryModelValidationMap,
  DeploymentItem: DeploymentItemModelValidationMap,
  DeploymentSummary: DeploymentSummaryModelValidationMap,
  Event: EventModelValidationMap,
  HorizontalScalingSummary: HorizontalScalingSummaryModelValidationMap,
  Identity: IdentityModelValidationMap,
  Node: NodeModelValidationMap,
  Notifications: NotificationsValidationMap,
  ObjectState: ObjectStateModelValidationMap,
  PodState: PodStateModelValidationMap,
  Port: PortModelValidationMap,
  ReplicaSummary: ReplicaSummaryNormalizedModelValidationMap,
  ResourceRequirements: ResourceRequirementsModelValidationMap,
  Resources: ResourcesModelValidationMap,
  ScheduledBatchSummary: ScheduledBatchSummaryModelValidationMap,
  ScheduledJobSummary: ScheduledJobSummaryModelValidationMap,
  Secret: SecretModelValidationMap,
  TLSCertificate: TLSCertificateModelValidationMap,
};

export const normalizers: TestDependencyComponents<ModelNormalizerType> = {
  AuxiliaryResourceDeployment: AuxiliaryResourceDeploymentModelNormalizer,
  AzureIdentity: AzureIdentityModelNormalizer,
  ComponentSummary: ComponentSummaryModelNormalizer,
  DeploymentItem: DeploymentItemModelNormalizer,
  DeploymentSummary: DeploymentSummaryModelNormalizer,
  Event: EventModelNormalizer,
  HorizontalScalingSummary: HorizontalScalingSummaryModelNormalizer,
  Identity: IdentityModelNormalizer,
  Node: NodeModelNormalizer,
  Notifications: NotificationsModelNormalizer,
  ObjectState: ObjectStateModelNormalizer,
  PodState: PodStateModelNormalizer,
  Port: PortModelNormalizer,
  ReplicaSummary: ReplicaSummaryModelNormalizer,
  ResourceRequirements: ResourceRequirementsModelNormalizer,
  Resources: ResourcesModelNormalizer,
  ScheduledBatchSummary: ScheduledBatchSummaryModelNormalizer,
  ScheduledJobSummary: ScheduledJobSummaryModelNormalizer,
  Secret: SecretModelNormalizer,
  TLSCertificate: TLSCertificateModelNormalizer,
};
