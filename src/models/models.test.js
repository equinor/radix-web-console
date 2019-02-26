import { checkExact } from 'swagger-proptypes';

// Sample data sent to each model normaliser. Note that we do NOT test this data
// directly; instead we test the output of the normaliser functions

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

const testData = {
  Application: applicationData,
  ApplicationRegistration: applicationRegistrationData,
  ApplicationSummary: applicationSummaryData,
};

const models = {
  Application: applicationModel,
  ApplicationRegistration: applicationRegistrationModel,
  ApplicationSummary: applicationSummaryModel,
};

const normalisers = {
  Application: applicationNormaliser,
  ApplicationRegistration: applicationRegistrationNormaliser,
  ApplicationSummary: applicationSummaryNormaliser,
};

describe('Data samples match Web Console schema requirements', () => {
  Object.keys(testData).forEach(modelType => {
    // We create a test for each model type, and feed the data in the samples
    // through the normaliser function for that model. The resulting object is
    // then checked against the schema defined by the Web Console.

    const model = models[modelType];
    const normaliser = normalisers[modelType];
    const samples = testData[modelType];

    describe(modelType, () => {
      // Iterate over all data samples for this modelType
      // const samples = sampleModelData[modelType];

      samples.forEach((sample, idx) => {
        const description =
          `Sample #${idx} ` + (sample.__testDescription || '');

        it(description, () => {
          // Note that we are checking the result of `modelNormaliser(sample)`,
          // not `sample` itself
          const normalisedModel = normaliser(sample);

          const fn = () => checkExact(modelType, model, normalisedModel);
          expect(fn).not.toThrow();
        });
      });
    });
  });
});
