/* global spyOn */

import PropTypes from 'prop-types';

import * as modelFactories from './model-factories';
import * as props from './model-proptypes';

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
