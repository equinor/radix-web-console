import { render } from '@testing-library/react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { AppList } from '.';

import { AsyncState } from '../../effects/effect-types';
import store, { history } from '../../init/store';
import { ApplicationSummaryModel } from '../../models/application-summary';
import { ProgressStatus } from '../../models/progress-status';
import { RequestState } from '../../state/state-utils/request-states';

const testResponse: ApplicationSummaryModel[] = [
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
      status: ProgressStatus.Succeeded,
      pipeline: 'build-deploy',
      environments: ['env1', 'env2'],
    },
  },
  {
    name: 'app-list-test-2',
    latestJob: {
      name: 'A Second Job',
      created: new Date('2018-11-19T14:31:23Z'),
      status: ProgressStatus.Waiting,
      pipeline: 'build-deploy',
    },
  },
  {
    name: 'app-list-test-3',
  },
];

const noApps: string[] = [];
const appsResponse: AsyncState<ApplicationSummaryModel[]> = {
  status: RequestState.SUCCESS,
  data: testResponse,
};

const noop = () => {};
const getApps = () => appsResponse;

describe('AppList component', () => {
  it('should render without error', () => {
    render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppList
            toggleFavouriteApplication={noop}
            setLastKnownApplicationNames={noop}
            pollApplicationsByNames={getApps}
            pollApplications={getApps}
            favouriteAppNames={noApps}
            lastKnownAppNames={noApps}
          />
        </ConnectedRouter>
      </Provider>
    );
  });
});
