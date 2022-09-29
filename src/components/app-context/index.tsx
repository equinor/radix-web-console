import {
  AccountInfo,
  InteractionRequiredAuthError,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { createContext, useContext } from 'react';
import { msGraphConfig, serviceNowApiConfig } from './config';

type AppContext = {
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

interface ProvideAppContextProps {
  children: React.ReactNode;
}

export default function ProvideAppContext({
  children,
}: ProvideAppContextProps) {
  const ctx = useProvideAppContext();
  return <appContext.Provider value={ctx}>{children}</appContext.Provider>;
}

function useProvideAppContext(): AppContext {
  const { instance } = useMsal();

  // Used by the Graph SDK to authenticate API calls
  const graphAuthProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    instance as PublicClientApplication,
    {
      account: instance.getActiveAccount()!,
      scopes: msGraphConfig.scopes,
      interactionType: InteractionType.Popup,
    }
  );
  // Used by the Graph SDK to authenticate API calls
  const serviceNowAuthProvider = new ServiceNowAuthProvider(
    instance as PublicClientApplication,
    {
      account: instance.getActiveAccount()!,
      scopes: serviceNowApiConfig.scopes,
      interactionType: InteractionType.Redirect,
    }
  );

  return {
    graphAuthProvider: graphAuthProvider,
    serviceNowAuthProvider: serviceNowAuthProvider,
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
      if (error instanceof InteractionRequiredAuthError) {
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
        } else {
          throw new Error('invalid InteractionType');
        }
      } else {
        throw error;
      }
    }
  }
}
