/* global spyOn */

import PropTypes from 'prop-types';

import * as modelFactories from './factories';
import * as props from './proptypes';

const apiServerContractEnvironment = 'prod';

const sampleModelData = {
  application: [
    {
      adGroups: ['Group 1', 'Group 2'],
      name: 'a-name',
      repository: 'some/path/to/a/repo',
      sharedSecret: 'aSharedSecret',
    },
    {
      adGroups: ['Group 1', 'Group 2'],
      name: 'a-name',
      publicKey: 'a-big-public-key',
      repository: 'some/path/to/a/repo',
      sharedSecret: 'aSharedSecret',
    },
  ],
};

describe('API object models comply with contracts', () => {
  Object.keys(sampleModelData).forEach(modelType => {
    // We create a test for each model type, and feed the data in the samples
    // through the factory function for that model. The resulting object is then
    // checked against the schema provided by the API (which is provided in the
    // form of an auto-generated PropType structure).
    //
    // If the proptypes check fails, we know that the schema that the API server
    // expects is different from what the web console is using (which is encoded
    // in the factory functions)
    describe(modelType, () => {
      // It is expected that a factory function named `{modelName}Factory`
      // exists in `modelFactories.js`
      const modelFactory = modelFactories[`${modelType}Factory`];
      // Iterate over all data samples for this modelType
      const samples = sampleModelData[modelType];
      let hasPropsErrors;
      let dataSampleIdx;

      beforeEach(() => {
        hasPropsErrors = false;
        // Unfortunately `checkPropTypes` does not produce errors; instead logs
        // them to the console. We must intercept those and track whether there
        // were props errors
        spyOn(console, 'error').and.callFake(e => {
          hasPropsErrors = true;
          console.warn(`Data sample ${dataSampleIdx}`, e);
        });
      });

      samples.forEach((sample, idx) => {
        it(`Complies with API contract (data sample ${idx})`, () => {
          // Note that we are checking the result of `modelFactory(sample)`, not
          // `sample` itself
          const model = modelFactory(sample);
          dataSampleIdx = idx;

          PropTypes.checkPropTypes(
            { prop: props[modelType] },
            { prop: model },
            'prop',
            modelType
          );
          expect(hasPropsErrors).toBe(false);
        });
      });
    });
  });
});
