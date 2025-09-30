import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { Provider } from 'react-redux'

import { MsalAuthProvider } from '../components/msal-auth-context/msal-auth-provider'
import { PageRouter } from '../components/page-root'
import { router } from '../router'
import store from '../store/store'
import { msalConfig } from './msal-config'

const msal = new PublicClientApplication(msalConfig)

msal.initialize().then(() => {
  if (!msal.getActiveAccount() && msal.getAllAccounts().length > 0) {
    msal.setActiveAccount(msal.getAllAccounts()[0])
  }

  msal
    .handleRedirectPromise()
    .then((resp) => {
      if (resp) {
        msal.setActiveAccount(resp.account)
      }
    })
    .catch((err) => {
      console.error(err)
    })
})

export default (
  <Provider store={store}>
    <MsalProvider instance={msal}>
      <MsalAuthProvider>
        <PageRouter router={router} />
      </MsalAuthProvider>
    </MsalProvider>
  </Provider>
)
