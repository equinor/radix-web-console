import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { renderIntoDocument } from 'react-dom/test-utils';

import { AppList } from '.';

import { AsyncState } from '../../effects/effect-types';
import store, { history } from '../../init/store';
import { ApplicationSummaryModel } from '../../models/radix-api/applications/application-summary';
import { RadixJobCondition } from '../../models/radix-api/jobs/radix-job-condition';
import { RequestState } from '../../state/state-utils/request-states';

const testResponse: Array<ApplicationSummaryModel> = [
  {
    name: 'app-list-test-1',
    latestJob: {
      name: 'A First Job',
      appName: 'appName',
      branch: 'test_branch',
      commitID: '1234abcdef4321',
      created: new Date('2018-11-19T14:31:23Z'),
      triggeredBy: 'test_framework',
      started: new Date('2018-11-19T14:31:23Z'),
      ended: new Date(),
      status: RadixJobCondition.Succeeded,
      pipeline: 'build-deploy',
      environments: ['env1', 'env2'],
    },
  },
  {
    name: 'app-list-test-2',
    latestJob: {
      name: 'A Second Job',
      created: new Date('2018-11-19T14:31:23Z'),
      status: RadixJobCondition.Waiting,
      pipeline: 'build-deploy',
    },
  },
  {
    name: 'app-list-test-3',
  },
];

const noApps: Array<string> = [];
const appsResponse: AsyncState<Array<ApplicationSummaryModel>> = {
  status: RequestState.SUCCESS,
  data: testResponse,
};

const noop = () => {};
const getApps = () => appsResponse;

describe('AppList component', () => {
  it('should render without error', () => {
    renderIntoDocument(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppList
            toggleFavouriteApplication={noop}
            pollApplicationsByNames={getApps}
            pollApplications={getApps}
            favouriteAppNames={noApps}
          />
        </ConnectedRouter>
      </Provider>
    );
  });
});
