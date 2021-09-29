import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import store, { history } from './store';

import { PageRoot } from '../components/page-root';

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PageRoot />
    </ConnectedRouter>
  </Provider>
);
