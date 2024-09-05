import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { PageRouter } from '.'

import { router } from '../../router'
import store from '../../store/store'

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <PageRouter router={router} />
    </Provider>
  )
})
