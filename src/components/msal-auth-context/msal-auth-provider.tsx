import {
  AuthenticationResult,
  EventCallbackFunction,
  EventType,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { useEffect, useMemo } from 'react';

import { msGraphConfig, serviceNowApiConfig, msalConfig } from './config';
import { useDispatch } from 'react-redux';
import { setAccount, setProvider } from '../../store/msal/reducer';
import ServiceNowAuthProvider from './service-now-auth-provider';
import { MsalProvider } from '@azure/msal-react';

export type AppContext = {
  graphAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider;
  serviceNowAuthProvider?: ServiceNowAuthProvider;
};

const msal = new PublicClientApplication(msalConfig);
const accounts = msal.getAllAccounts();
if (accounts?.length > 0) {
  msal.setActiveAccount(accounts[0]);
}

export function MsalAuthProvider({ children }) {
  const dispatch = useDispatch();

  const ctx = useMemo(() => {
    const account = msal.getActiveAccount()!;
    return {
      // Used by the Graph SDK to authenticate API calls
      graphAuthProvider: new AuthCodeMSALBrowserAuthenticationProvider(msal, {
        account: account,
        interactionType: InteractionType.Redirect,
        scopes: msGraphConfig.scopes,
      }),
      // Used by the Graph SDK to authenticate API calls
      serviceNowAuthProvider: new ServiceNowAuthProvider(msal, {
        account: account,
        interactionType: InteractionType.Redirect,
        scopes: serviceNowApiConfig.scopes,
      }),
    };
  }, [msal]);

  useEffect(() => {
    const callback: EventCallbackFunction = ({ eventType, payload }) => {
      if (eventType === EventType.LOGIN_SUCCESS) {
        const account = (payload as AuthenticationResult).account;
        msal.setActiveAccount(account);
        dispatch(setAccount(account));
      }
    };

    const callbackId = msal.addEventCallback(callback);

    return () => msal.removeEventCallback(callbackId);
  }, []);

  useEffect(() => {
    dispatch(setProvider(ctx));
  }, [ctx, dispatch]);

  return <MsalProvider instance={msal}>{children}</MsalProvider>;
}
