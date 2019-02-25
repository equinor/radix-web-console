/* global spyOn */

import { checkExact } from 'swagger-proptypes';
import * as models from '.';
import * as factories from './factories';

import Application from './application/test-data';
import ApplicationRegistration from './application-registration/test-data';
import ApplicationSummary from './application-summary/test-data';

// Sample data sent to each model normaliser. Note that we do NOT test this data
// directly; instead we test the output of the normaliser functions

const sampleModelData = {
  Application,
  ApplicationRegistration,
  ApplicationSummary,
};

describe('Data samples match Web Console schema requirements', () => {
  Object.keys(sampleModelData).forEach(modelType => {
    // We create a test for each model type, and feed the data in the samples
    // through the normaliser function for that model. The resulting object is
    // then checked against the schema defined by the Web Console.
    describe(modelType, () => {
      // It is expected that a proptype definition named `{modelName}` exists
      // in `index.js`
      const props = models[modelType];

      // It is expected that a normaliser function named `{modelName}Normaliser`
      // exists in `factories.js`
      const modelNormaliser = factories[`${modelType}Normaliser`];
      // Iterate over all data samples for this modelType
      const samples = sampleModelData[modelType];

      samples.forEach((sample, idx) => {
        const description =
          `Sample #${idx} ` + (sample.__testDescription || '');

        it(description, () => {
          // Note that we are checking the result of `modelNormaliser(sample)`,
          // not `sample` itself
          const model = modelNormaliser(sample);

          const fn = () => checkExact(modelType, props, model);
          expect(fn).not.toThrow();
        });
      });
    });
  });
});
