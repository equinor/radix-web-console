import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { CircularProgress } from '@equinor/eds-core-react';
import { ConnectedRouter } from 'connected-react-router';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';

import { msalConfig } from './msal-config';
import store, { history } from './store';

import ProvideAppContext from '../components/app-context';

const PageRoot = lazy(() => import('../components/page-root'));

const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts?.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    // Set the active account - this simplifies token acquisition
    const authResult = event.payload as AuthenticationResult;
    msalInstance.setActiveAccount(authResult.account);
  }
});

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MsalProvider instance={msalInstance}>
        <ProvideAppContext>
          <Suspense
            fallback={
              <div>
                <CircularProgress size={16} /> Loading…
              </div>
            }
          >
            <PageRoot />
          </Suspense>
        </ProvideAppContext>
      </MsalProvider>
    </ConnectedRouter>
  </Provider>
);
