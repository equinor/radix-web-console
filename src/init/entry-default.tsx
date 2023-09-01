import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { Provider } from 'react-redux';

import { msalConfig } from './msal-config';
import store from './store';

import { ProvideAppContext } from '../components/app-context';
import { PageRouter } from '../components/page-root';
import { router } from '../router';

const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts?.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback(({ eventType, payload }: EventMessage) => {
  if (eventType === EventType.LOGIN_SUCCESS && payload) {
    // Set the active account - this simplifies token acquisition
    const authResult = payload as AuthenticationResult;
    msalInstance.setActiveAccount(authResult.account);
  }
});

export default (
  <Provider store={store}>
    <MsalProvider instance={msalInstance}>
      <ProvideAppContext instance={msalInstance}>
        <PageRouter router={router} />
      </ProvideAppContext>
    </MsalProvider>
  </Provider>
);
