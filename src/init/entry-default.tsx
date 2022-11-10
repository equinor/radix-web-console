import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import store, { history } from './store';

import { PageRoot } from '../components/page-root';
import ProvideAppContext from '../components/app-context';
import { msalConfig } from './msal-config';

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
          <PageRoot />
        </ProvideAppContext>
      </MsalProvider>
    </ConnectedRouter>
  </Provider>
);
