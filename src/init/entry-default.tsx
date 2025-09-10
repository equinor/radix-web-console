import { Provider } from 'react-redux'
import { MsalAuthProvider } from '../components/msal-auth-context/msal-auth-provider'
import { PageRouter } from '../components/page-root'
import { router } from '../router'
import store from '../store/store'

export default (
  <Provider store={store}>
    <MsalAuthProvider>
      <PageRouter router={router} />
    </MsalAuthProvider>
  </Provider>
)
