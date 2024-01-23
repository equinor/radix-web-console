import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { PageRouter } from '.';

import store from '../../store/store';
import { router } from '../../router';

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <PageRouter router={router} />
    </Provider>
  );
});
