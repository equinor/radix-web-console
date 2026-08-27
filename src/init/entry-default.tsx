import { type AuthenticationResult, EventType, PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { Provider } from 'react-redux'

import { MsalAuthProvider } from '../components/msal-auth-context/msal-auth-provider'
import { PageRouter } from '../components/page-root'
import { router } from '../router/router'
import { routes } from '../router/routes'
import { setTerminalAuthErrorHandler } from '../store/msal/interactive-auth'
import store from '../store/store'
import { msalConfig } from './msal-config'

const msalInstance = new PublicClientApplication(msalConfig)

// When the session dies, send the user to the session-expired page. Handled
// centrally here so no data-loading component has to know about session expiry.
setTerminalAuthErrorHandler(() => {
  // Prevent redirect loop
  if (router.state.location.pathname === routes.sessionExpired) {
    return
  }
  router.navigate(routes.sessionExpired, { replace: true })
})

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    msalInstance.setActiveAccount((event.payload as AuthenticationResult).account)
  }
})

await msalInstance.initialize()

try {
  const response = await msalInstance.handleRedirectPromise({ navigateToLoginRequestUrl: false })
  if (response?.account) {
    msalInstance.setActiveAccount(response.account)
  }
} catch (error) {
  console.error('MSAL redirect handling failed:', error)
}

export default (
  <Provider store={store}>
    <MsalProvider instance={msalInstance}>
      <MsalAuthProvider>
        <PageRouter router={router} />
      </MsalAuthProvider>
    </MsalProvider>
  </Provider>
)
