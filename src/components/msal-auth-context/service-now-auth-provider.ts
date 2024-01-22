import {
  AccountInfo,
  InteractionRequiredAuthError,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';

export interface ServiceNowAuthProviderOptions {
  scopes: string[];
  account: AccountInfo;
  interactionType: InteractionType;
}

export default class ServiceNowAuthProvider {
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
