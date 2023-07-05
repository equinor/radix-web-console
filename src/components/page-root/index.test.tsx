import { ConnectedRouter } from 'connected-react-router';
import { renderIntoDocument } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import { PageRoot } from '.';

import store, { history } from '../../init/store';

it('renders without crashing', () => {
  renderIntoDocument(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PageRoot />
      </ConnectedRouter>
    </Provider>
  );
});
