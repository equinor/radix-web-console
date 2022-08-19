import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { User } from 'microsoft-graph';

import { adGroupsModel, adGroupModel } from './adGroupModel';

let graphClient: Client | undefined = undefined;

function ensureClient(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Client {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }

  return graphClient;
}

export async function getUser(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<User> {
  ensureClient(authProvider);

  const user: User = await graphClient
    .api('/me')
    .select('displayName,mail')
    .get();

  return user;
}

export async function getGroup(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  id: string
): Promise<adGroupModel> {
  ensureClient(authProvider);

  const group: adGroupModel = await graphClient
    .api(`/groups/${id}`)
    .select('displayName,id')
    .get();

  return group;
}

export async function getGroups(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  limit: number,
  groupName?: string
): Promise<adGroupsModel> {
  ensureClient(authProvider);

  const groups: adGroupsModel = await graphClient
    .api('/groups')
    .select('displayName,id')
    .filter(groupName ? `startswith(displayName,'${groupName}')` : '')
    .top(limit)
    .get();

  return groups;
}
