import { render } from '@testing-library/react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { PageRoot } from '.';

import store, { history } from '../../init/store';

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PageRoot />
      </ConnectedRouter>
    </Provider>
  );
});
