import {
  AccountInfo,
  IPublicClientApplication,
  InteractionRequiredAuthError,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { PropsWithChildren, createContext, useContext, useEffect } from 'react';

import { msGraphConfig, serviceNowApiConfig } from './config';
import { useDispatch } from 'react-redux';
import { setProvider } from '../../store/msal/reducer';

export type AppContext = {
  graphAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider;
  serviceNowAuthProvider?: ServiceNowAuthProvider;
};

const appContext = createContext<AppContext>({
  graphAuthProvider: undefined,
  serviceNowAuthProvider: undefined,
});

export function useAppContext(): AppContext {
  return useContext(appContext);
}

type Props = PropsWithChildren<{ instance: IPublicClientApplication }>;
export function ProvideAppContext({ instance, children }: Props) {
  const dispatch = useDispatch();
  const ctx = useProvideAppContext(instance as PublicClientApplication);

  useEffect(() => {
    dispatch(setProvider(ctx));
  }, [ctx]);

  return <appContext.Provider value={ctx}>{children}</appContext.Provider>;
}

export function useProvideAppContext(
  instance: PublicClientApplication
): AppContext {
  const account = instance.getActiveAccount()!;

  return {
    // Used by the Graph SDK to authenticate API calls
    graphAuthProvider: new AuthCodeMSALBrowserAuthenticationProvider(instance, {
      account: account,
      interactionType: InteractionType.Redirect,
      scopes: msGraphConfig.scopes,
    }),
    // Used by the Graph SDK to authenticate API calls
    serviceNowAuthProvider: new ServiceNowAuthProvider(instance, {
      account: account,
      interactionType: InteractionType.Redirect,
      scopes: serviceNowApiConfig.scopes,
    }),
  };
}

export interface ServiceNowAuthProviderOptions {
  scopes: string[];
  account: AccountInfo;
  interactionType: InteractionType;
}

export class ServiceNowAuthProvider {
  constructor(
    private publicClient: PublicClientApplication,
    private options: ServiceNowAuthProviderOptions
  ) {}

  public async getAccessToken(): Promise<string> {
    try {
      const response = await this.publicClient.acquireTokenSilent({
        scopes: this.options.scopes,
        account: this.options.account,
      });
      if (!response || !response.accessToken) {
        throw new Error('PublicClientApplication returned empty token');
      }
      return response.accessToken;
    } catch (error) {
      if (!(error instanceof InteractionRequiredAuthError)) {
        throw error;
      }

      if (this.options.interactionType === InteractionType.Redirect) {
        // acquireTokenRedirect redirects browser and aborts calling script
        // so we just return an empty string as this provider will be
        // called again once authenticaion flow is completed
        this.publicClient.acquireTokenRedirect({
          scopes: this.options.scopes,
        });
        return '';
      } else if (this.options.interactionType === InteractionType.Popup) {
        const response = await this.publicClient.acquireTokenPopup({
          scopes: this.options.scopes,
        });
        return response.accessToken;
      }

      throw new Error('invalid InteractionType');
    }
  }
}
