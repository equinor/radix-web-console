import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { actions } from './action-creators';
import { createJobFlow } from './sagas';

import { createJob } from '../../api/jobs';

describe('job create sagas', () => {
  describe('create job flow', () => {
    it('sends confirm if no error', () => {
      const fakeJob: Parameters<typeof actions.addJobRequest>[0] = {
        appName: '',
        pipelineName: 'build',
      };
      const action = actions.addJobRequest(fakeJob);

      return expectSaga(createJobFlow, action)
        .provide([[matchers.call.fn(createJob), action.payload]])
        .put(actions.addJobConfirm(action.payload))
        .run();
    });

    it('sends fail if there is an error', () => {
      const fakeJob: Parameters<typeof actions.addJobRequest>[0] = {
        appName: '',
        pipelineName: 'build',
      };
      const action = actions.addJobRequest(fakeJob);
      const error = new Error('error');

      return expectSaga(createJobFlow, action)
        .provide([[matchers.call.fn(createJob), throwError(error)]])
        .put(actions.addJobFail(error.toString()))
        .run();
    });
  });
});
