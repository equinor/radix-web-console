import { CircularProgress } from '@equinor/eds-core-react';
import { ConnectedRouter } from 'connected-react-router';
import { renderIntoDocument } from 'react-dom/test-utils';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';

import store, { history } from '../../init/store';

const PageRoot = lazy(() => import('.'));

it('renders without crashing', () => {
  renderIntoDocument(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense
          fallback={
            <div>
              <CircularProgress size={16} /> Loading…
            </div>
          }
        >
          <PageRoot />
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
});
