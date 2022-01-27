// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import { testData as ApplicationData } from './application/test-data';
import { ApplicationModelValidationMap } from './application';
import { ApplicationModelNormaliser } from './application/normaliser';

import { testData as ApplicationRegistrationData } from './application-registration/test-data';
import { ApplicationRegistrationModelValidationMap } from './application-registration';
import { ApplicationRegistrationModelNormaliser } from './application-registration/normaliser';

import { testData as ApplicationSummaryData } from './application-summary/test-data';
import { ApplicationSummaryModelValidationMap } from './application-summary';
import { ApplicationSummaryModelNormaliser } from './application-summary/normaliser';

import componentSummaryData from './component-summary/test-data';
import componentSummaryModel from './component-summary';
import componentSummaryNormaliser from './component-summary/normaliser';

import jobData from './job/test-data';
import jobModel from './job';
import jobNormaliser from './job/normaliser';

import { testData as JobSummaryData } from './job-summary/test-data';
import { JobSummaryModelValidationMap } from './job-summary';
import { JobSummaryModelNormaliser } from './job-summary/normaliser';

import replicaSummaryData from './replica-summary/test-data';
import replicaSummaryModel from './replica-summary';
import replicaSummaryNormaliser from './replica-summary/normaliser';

import stepData from './step/test-data';
import stepModel from './step';
import stepNormaliser from './step/normaliser';

import eventData from './event/test-data';
import eventModel from './event';
import eventNormaliser from './event/normaliser';

import objectStateData from './object-state/test-data';
import objectStateModel from './object-state';
import objectStateNormaliser from './object-state/normaliser';

import podStateData from './pod-state/test-data';
import podStateModel from './pod-state';
import podStateNormaliser from './pod-state/normaliser';

// import vulnerabilitySummaryData from './vulnerability-summary/test-data';
// import vulnerabilitySummaryModel from './vulnerability-summary';
// import vulnerabilitySummaryNormaliser from './vulnerability-summary/normaliser';

import { testData as ScanData } from './scan/test-data';
import { ScanModelValidationMap } from './scan';
import { ScanModelNormaliser } from './scan/normaliser';

import vulnerabilityData from './vulnerability/test-data';
import vulnerabilityModel from './vulnerability';
import vulnerabilityNormaliser from './vulnerability/normaliser';

export const testData = {
  Application: ApplicationData,
  ApplicationRegistration: ApplicationRegistrationData,
  ApplicationSummary: ApplicationSummaryData,
  ComponentSummary: componentSummaryData,
  Job: jobData,
  JobSummary: JobSummaryData,
  ReplicaSummary: replicaSummaryData,
  Step: stepData,
  Event: eventData,
  ObjectState: objectStateData,
  PodState: podStateData,
  // VulnerabilitySummary: vulnerabilitySummaryData,
  Scan: ScanData,
  Vulnerability: vulnerabilityData,
};

export const models = {
  Application: ApplicationModelValidationMap,
  ApplicationRegistration: ApplicationRegistrationModelValidationMap,
  ApplicationSummary: ApplicationSummaryModelValidationMap,
  ComponentSummary: componentSummaryModel,
  Job: jobModel,
  JobSummary: JobSummaryModelValidationMap,
  ReplicaSummary: replicaSummaryModel,
  Step: stepModel,
  Event: eventModel,
  ObjectState: objectStateModel,
  PodState: podStateModel,
  // VulnerabilitySummary: vulnerabilitySummaryModel,
  Scan: ScanModelValidationMap,
  Vulnerability: vulnerabilityModel,
};

export const normalisers = {
  Application: ApplicationModelNormaliser,
  ApplicationRegistration: ApplicationRegistrationModelNormaliser,
  ApplicationSummary: ApplicationSummaryModelNormaliser,
  ComponentSummary: componentSummaryNormaliser,
  Job: jobNormaliser,
  JobSummary: JobSummaryModelNormaliser,
  ReplicaSummary: replicaSummaryNormaliser,
  Step: stepNormaliser,
  Event: eventNormaliser,
  ObjectState: objectStateNormaliser,
  PodState: podStateNormaliser,
  // VulnerabilitySummary: vulnerabilitySummaryNormaliser,
  Scan: ScanModelNormaliser,
  Vulnerability: vulnerabilityNormaliser,
};
