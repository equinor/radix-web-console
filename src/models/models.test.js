import { checkExact } from 'swagger-proptypes';

import { testData, models, normalisers } from './test-dependencies';

// Note that we do NOT test `testData` directly; instead we test the output of
// the normaliser functions

describe('Data samples match Web Console schema requirements', () => {
  Object.keys(testData).forEach((modelType) => {
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

        const isInvalidSample = !!sample.__testIsInvalidSample;

        delete sample.__testDescription;
        delete sample.__testIsInvalidSample;

        it(description, () => {
          // Note that we are checking the result of `normaliser(sample)`,
          // not `sample` itself
          const normalisedModel = normaliser(sample);

          const fn = () => checkExact(modelType, model, normalisedModel);

          if (isInvalidSample) {
            expect(fn).toThrow();
          } else {
            expect(fn).not.toThrow();
          }
        });
      });
    });
  });
});
