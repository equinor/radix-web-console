import { configVariables } from '../../utils/config';

export const msGraphConfig = {
  scopes: ['User.Read', 'GroupMember.Read.All'],
};

export const serviceNowApiConfig = {
  scopes: configVariables.SERVICENOW_PROXY_SCOPES,
};
