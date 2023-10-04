import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { actions } from './action-creators';
import { createJobFlow } from './sagas';

import { createJob } from '../../api/jobs';

describe('job create sagas', () => {
  describe('create job flow', () => {
    const defaultFakeJob = Object.freeze<
      Parameters<typeof actions.addJobRequest>[0]
    >({
      appName: 'some-ordinary-app',
      pipelineName: 'build',
    });

    it('sends confirm if no error', () => {
      const fakeJob = { ...defaultFakeJob };
      const action = actions.addJobRequest(fakeJob);

      return expectSaga(createJobFlow, action)
        .provide([[call(createJob, action.meta.job), action.payload]])
        .put(actions.addJobConfirm(action.payload))
        .run();
    });

    it('sends fail if there is an error', () => {
      const fakeJob = { ...defaultFakeJob };
      const action = actions.addJobRequest(fakeJob);
      const error = new Error('error');

      return expectSaga(createJobFlow, action)
        .provide([[call(createJob, action.meta.job), throwError(error)]])
        .put(actions.addJobFail(error.toString()))
        .run();
    });
  });
});
