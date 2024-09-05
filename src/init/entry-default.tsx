import { Provider } from 'react-redux'

import store from '../store/store'

import { MsalAuthProvider } from '../components/msal-auth-context/msal-auth-provider'
import { PageRouter } from '../components/page-root'
import { router } from '../router'

export default (
  <Provider store={store}>
    <MsalAuthProvider>
      <PageRouter router={router} />
    </MsalAuthProvider>
  </Provider>
)
