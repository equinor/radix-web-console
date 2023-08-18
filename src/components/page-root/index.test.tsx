import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { PageRoot } from '.';

import store from '../../init/store';

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <PageRoot />
    </Provider>
  );
});
