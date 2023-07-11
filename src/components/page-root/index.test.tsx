import { ConnectedRouter } from 'connected-react-router';
import { renderIntoDocument } from 'react-dom/test-utils';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';

import { LazyLoadFallback } from '../lazy-load-fallback';
import store, { history } from '../../init/store';

const PageRoot = lazy(() => import('.'));

it('renders without crashing', () => {
  renderIntoDocument(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={<LazyLoadFallback />}>
          <PageRoot />
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
});
