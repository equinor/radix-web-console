import { type Configuration, ProtocolMode, ServerResponseType } from '@azure/msal-browser'
import { configVariables } from '../utils/config'

const authority = configVariables.OAUTH2_AUTHORITY

function getAuthorityHost(url: string): string {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

export const msalConfig: Configuration = {
  auth: {
    clientId: configVariables.OAUTH2_CLIENT_ID,
    authority,
    knownAuthorities: [getAuthorityHost(authority)],
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
