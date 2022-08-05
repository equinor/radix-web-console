import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import store, { history } from './store';

import { PageRoot } from '../components/page-root';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../components/graph/Config';
import { MsalProvider } from '@azure/msal-react';

const msalInstance = new PublicClientApplication(msalConfig);

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MsalProvider instance={msalInstance}>
        <PageRoot />
      </MsalProvider>
    </ConnectedRouter>
  </Provider>
);
