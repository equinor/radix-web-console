import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { router } from '../../router';
import store from '../../store/store';
import { PageRouter } from '.';

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <PageRouter router={router} />
    </Provider>
  );
});
