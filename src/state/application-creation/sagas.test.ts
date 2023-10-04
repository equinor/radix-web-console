import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { actions } from './action-creators';
import { createAppFlow } from './sagas';

import { createApp } from '../../api/apps';

describe('application create sagas', () => {
  describe('create application flow', () => {
    const defaultFakeApp = Object.freeze<
      Parameters<typeof actions.addAppRequest>[0]
    >({
      appRegistrationRequest: {
        acknowledgeWarnings: false,
        applicationRegistration: {
          name: 'mons-app',
          repository: 'https://github.com/mons/mons-app',
          sharedSecret: 'wait... this was supposed to be secret?',
          owner: 'mr mons',
          creator: 'mons',
          wbs: 'whatnow?',
          configBranch: 'dev',
        },
      },
    });

    it('sends confirm if no error', () => {
      const fakeApp = { ...defaultFakeApp };
      const action = actions.addAppRequest(fakeApp);

      return expectSaga(createAppFlow, action)
        .provide([[call.fn(createApp), action.payload]])
        .put(actions.addAppConfirm(action.payload))
        .run();
    });

    it('sends fail if there is an error', () => {
      const fakeApp = { ...defaultFakeApp };
      const action = actions.addAppRequest(fakeApp);
      const error = new Error('error');

      return expectSaga(createAppFlow, action)
        .provide([[call.fn(createApp), throwError(error)]])
        .put(actions.addAppFail(error.toString()))
        .run();
    });
  });
});
