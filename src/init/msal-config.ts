import { type Configuration, ProtocolMode, ServerResponseType } from '@azure/msal-browser'
import { configVariables } from '../utils/config'

export const msalConfig: Configuration = {
  auth: {
    clientId: configVariables.OAUTH2_CLIENT_ID,
    authority: configVariables.OAUTH2_AUTHORITY,
    protocolMode: ProtocolMode.OIDC,
    OIDCOptions: {
      serverResponseType: ServerResponseType.QUERY,
    },
    redirectUri: `${window.location.origin}/applications`,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}
