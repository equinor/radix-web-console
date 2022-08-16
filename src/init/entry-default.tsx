import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import store, { history } from './store';

import { msalConfig } from '../components/graph/Config';
import { PageRoot } from '../components/page-root';

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
