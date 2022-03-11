import { render } from '@testing-library/react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { AppList } from '.';

import { AsyncPollingStatus } from '../../effects/use-async-polling';
import store, { history } from '../../init/store';
import { ApplicationSummaryModel } from '../../models/application-summary';
import { testData as ApplicationSummaryData } from '../../models/application-summary/test-data';
import { RequestState } from '../../state/state-utils/request-states';

const testResponse: ApplicationSummaryModel[] = [
  ApplicationSummaryData[0],
  ApplicationSummaryData[1],
];

const noApps: string[] = [];
const appsResponse: AsyncPollingStatus<ApplicationSummaryModel[]> = {
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
