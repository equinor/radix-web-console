// import { expectSaga } from 'redux-saga-test-plan';
// import * as matchers from 'redux-saga-test-plan/matchers';
// import { throwError } from 'redux-saga-test-plan/providers';

// import { deleteEnvironment } from '../../api/env';
// import actionCreators from './action-creators';
// import { createDeleteEnvironmentFlow } from './sagas';

// describe('environment delete sagas', () => {
//   describe('create application flow', () => {
//     it('sends confirm if no error', () => {
//       const fakeEnv = {
//         appName: 'fakeApp',
//         envName: 'fakeEnv',
//       };
//       const action = actionCreators.deleteEnvRequest(fakeEnv);

//       return expectSaga(createDeleteEnvironmentFlow, action)
//         .provide([[matchers.call.fn(deleteEnvironment), action]])
//         .put(actionCreators.deleteEnvConfirm(action))
//         .run();
//     });

//     it('sends fail if there is an error', () => {
//       const fakeEnv = {
//         appName: 'fakeApp',
//         envName: 'fakeEnv',
//       };
//       const action = actionCreators.deleteEnvRequest(fakeEnv);
//       const error = new Error('error');

//       return expectSaga(createDeleteEnvironmentFlow, action)
//         .provide([[matchers.call.fn(deleteEnvironment), throwError(error)]])
//         .put(actionCreators.deleteEnvFail(error))
//         .run();
//     });
//   });
// });
