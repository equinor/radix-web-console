import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { createJob } from '../../api/jobs';
import actionCreators from './action-creators';
import { createJobFlow } from './sagas';

describe('job create sagas', () => {
  describe('create job flow', () => {
    it('sends confirm if no error', () => {
      const fakeJob = {};
      const action = actionCreators.addJobRequest(fakeJob);

      return expectSaga(createJobFlow, action)
        .provide([[matchers.call.fn(createJob), action]])
        .put(actionCreators.addJobConfirm(action))
        .run();
    });

    it('sends fail if there is an error', () => {
      const fakeJob = {};
      const action = actionCreators.addJobRequest(fakeJob);
      const error = new Error('error');

      return expectSaga(createJobFlow, action)
        .provide([[matchers.call.fn(createJob), throwError(error)]])
        .put(actionCreators.addJobFail(error.toString()))
        .run();
    });
  });
});
