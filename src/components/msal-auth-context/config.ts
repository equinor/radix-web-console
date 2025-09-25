import { type Configuration, LogLevel } from '@azure/msal-browser'
import { configVariables } from '../../utils/config'

export const msGraphConfig = {
  scopes: ['User.Read', 'GroupMember.Read.All', 'Application.Read.All'],
}

export const serviceNowApiConfig = {
  scopes: configVariables.SERVICENOW_PROXY_SCOPES.split(' '),
}

export const radixApiConfig = {
  scopes: configVariables.RADIXAPI_SCOPES.split(' '),
}

export const msalConfig: Configuration = {
  auth: {
    clientId: configVariables.OAUTH2_CLIENT_ID,
    authority: configVariables.OAUTH2_AUTHORITY,
    redirectUri: `${window.location.origin}/applications`,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
}
