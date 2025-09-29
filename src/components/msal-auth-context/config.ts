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
