import { ValidationMap } from 'prop-types';
import { checkExact } from 'swagger-proptypes';

import { ModelNormalizerType, TestDependencyDataType } from './model-types';

import * as logApi from './log-api/test-dependencies';
import * as radixApi from './radix-api/test-dependencies';
import * as unsortedApis from './test-dependencies';

type TestSet<Key extends string = string> = {
  models: Record<Key, ValidationMap<unknown>>;
  normalizers: Record<Key, ModelNormalizerType>;
  testData: Record<Key, TestDependencyDataType>;
};

const dependencyTests: Array<{ id: string; tests: TestSet }> = [
  {
    id: 'Radix API',
    tests: radixApi as TestSet<keyof typeof radixApi.testData>,
  },
  {
    id: 'Log API',
    tests: logApi as TestSet<keyof typeof logApi.testData>,
  },
  {
    id: 'Various API models',
    tests: unsortedApis as TestSet<keyof typeof unsortedApis.testData>,
  },
];

// Note that we do NOT test `testData` directly; instead we test the output of
// the normalizer functions
dependencyTests.forEach(({ id, tests: { models, normalizers, testData } }) => {
  describe(`Data samples match Web Console schema requirements (${id})`, () => {
    Object.keys(testData).forEach((modelType) => {
      // We create a test for each model type, and feed the data in the samples
      // through the normalizer function for that model. The resulting object is
      // then checked against the schema defined by the Web Console.
      const model = models[modelType];
      const normalizer = normalizers[modelType];
      const samples = testData[modelType];

      describe(modelType, () => {
        // Iterate over all data samples for this modelType
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
});
