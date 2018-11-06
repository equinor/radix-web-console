/* global spyOn */
import rpn from 'request-promise-native';

import { propsFromDefs, checkExact } from 'swagger-proptypes';
import * as models from '.';
import * as factories from './factories';

const clusterDomain = require('../config.json').clusterDomain;
const apiServerBaseDomain = 'server-radix-api';
const apiServerEnvironment = 'prod';
const apiServerPath = '/swaggerui/swagger.json';

// Sample data sent to each model factory. Note that we do NOT test this data
// directly; instead we test the output of the factory functions

const sampleModelData = {
  ApplicationRegistration: [
    {
      adGroups: ['Group 1', 'Group 2'],
      name: 'name',
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

xdescribe('Data samples match API schema requirements', () => {
  let props;

  beforeAll(async done => {
    // Retrieve Swagger definitions from API server

    const url = `https://${apiServerBaseDomain}-${apiServerEnvironment}.${clusterDomain}${apiServerPath}`;
    console.log(`Retrieving Swagger defs from ${url}`);

    const defs = await rpn(url, { json: true });
    props = propsFromDefs(defs.definitions);
    done();
  });

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
      // exists in `factories.js`
      const modelFactory = factories[`${modelType}Factory`];
      // Iterate over all data samples for this modelType
      const samples = sampleModelData[modelType];

      samples.forEach((sample, idx) => {
        it(`Data sample ${idx} passes validation`, () => {
          // Note that we are checking the result of `modelFactory(sample)`, not
          // `sample` itself
          const model = modelFactory(sample);

          const fn = () => checkExact(modelType, props[modelType], model);
          expect(fn).not.toThrow();
        });
      });
    });
  });
});

xdescribe('Data samples match Web Console schema requirements', () => {
  Object.keys(sampleModelData).forEach(modelType => {
    // We create a test for each model type, and feed the data in the samples
    // through the factory function for that model. The resulting object is then
    // checked against the schema defined by the Web Console.
    describe(modelType, () => {
      // It is expected that a proptype definition named `{modelName}` exists in
      // `index.js`
      const props = models[modelType];

      // It is expected that a factory function named `{modelName}Factory`
      // exists in `factories.js`
      const modelFactory = factories[`${modelType}Factory`];
      // Iterate over all data samples for this modelType
      const samples = sampleModelData[modelType];

      samples.forEach((sample, idx) => {
        it(`Data sample ${idx} passes validation`, () => {
          // Note that we are checking the result of `modelFactory(sample)`, not
          // `sample` itself
          const model = modelFactory(sample);

          const fn = () => checkExact(modelType, props, model);
          expect(fn).not.toThrow();
        });
      });
    });
  });
});
