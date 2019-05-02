// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import applicationData from './application/test-data';
import applicationModel from './application';
import applicationNormaliser from './application/normaliser';

import applicationRegistrationData from './application-registration/test-data';
import applicationRegistrationModel from './application-registration';
import applicationRegistrationNormaliser from './application-registration/normaliser';

import applicationSummaryData from './application-summary/test-data';
import applicationSummaryModel from './application-summary';
import applicationSummaryNormaliser from './application-summary/normaliser';

import jobSummaryData from './job-summary/test-data';
import jobSummaryModel from './job-summary';
import jobSummaryNormaliser from './job-summary/normaliser';

export const testData = {
  Application: applicationData,
  ApplicationRegistration: applicationRegistrationData,
  ApplicationSummary: applicationSummaryData,
  JobSummary: jobSummaryData,
};

export const models = {
  Application: applicationModel,
  ApplicationRegistration: applicationRegistrationModel,
  ApplicationSummary: applicationSummaryModel,
  JobSummary: jobSummaryModel,
};

export const normalisers = {
  Application: applicationNormaliser,
  ApplicationRegistration: applicationRegistrationNormaliser,
  ApplicationSummary: applicationSummaryNormaliser,
  JobSummary: jobSummaryNormaliser,
};
