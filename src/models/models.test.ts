import { ValidationMap } from 'prop-types';
import { checkExact } from 'swagger-proptypes';

import { models, normalizers, testData } from './test-dependencies';
import { ModelNormalizerType, TestDependencyDataType } from './model-types';

// Note that we do NOT test `testData` directly; instead we test the output of
// the normalizer functions

describe('Data samples match Web Console schema requirements', () => {
  Object.keys(testData).forEach((modelType) => {
    // We create a test for each model type, and feed the data in the samples
    // through the normalizer function for that model. The resulting object is
    // then checked against the schema defined by the Web Console.

    const model: ValidationMap<unknown> = models[modelType];
    const normalizer: ModelNormalizerType = normalizers[modelType];
    const samples: TestDependencyDataType = testData[modelType];

    describe(modelType, () => {
      // Iterate over all data samples for this modelType
      // const samples = sampleModelData[modelType];

      samples.forEach((sample, idx) => {
        const description = `Sample #${idx} ${sample.__testDescription}`;
        const isInvalidSample = !!sample.__testIsInvalidSample;

        delete sample.__testDescription;
        delete sample.__testIsInvalidSample;

        it(description, () => {
          // Note that we are checking the result of `normalizer(sample)`,
          // not `sample` itself
          const normalizedModel = normalizer(sample);

          // Note that checkExact no longer throws on error,
          // but returns a list of errors (as of >=5.0.0)
          const errors: string[] = checkExact(
            modelType,
            model,
            normalizedModel
          );

          if (isInvalidSample) {
            expect(errors).not.toHaveLength(0);
          } else {
            expect(errors).toHaveLength(0);
          }
        });
      });
    });
  });
});
