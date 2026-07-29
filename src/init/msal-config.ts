import { type Configuration, ProtocolMode, ResponseMode } from '@azure/msal-browser'
import { configVariables } from '../utils/config'

export const msalConfig: Configuration = {
  auth: {
    clientId: configVariables.OAUTH2_CLIENT_ID,
    authority: configVariables.OAUTH2_AUTHORITY,
    knownAuthorities: configVariables.OAUTH2_KNOWN_AUTHORITIES.split(' ').filter(Boolean), // Remove empty strings from the array
    OIDCOptions: {
      responseMode: ResponseMode.QUERY,
    },
    redirectUri: `${window.location.origin}/applications`,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
  system: {
    protocolMode: ProtocolMode.OIDC,
  },
}
console.log('MSAL Config:', msalConfig)
