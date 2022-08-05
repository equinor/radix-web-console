import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { Group, User } from 'microsoft-graph';

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }
}

export async function getUser(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<User> {
  ensureClient(authProvider);

  const user: User = await graphClient!
    .api('/me')
    .select('displayName,mail')
    .get();

  return user;
}

export async function getGroup(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  groupName: string,
  limit: number
): Promise<Group> {
  ensureClient(authProvider);

  const group: Group = await graphClient!
    .api('/groups')
    .filter(`startswith(displayName,'${groupName}')`)
    .select('displayName,id')
    .top(limit)
    .get();

  return group;
}

export async function getGroups(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<Group> {
  ensureClient(authProvider);

  const group: Group = await graphClient!
    .api('/groups')
    .select('displayName,id')
    .get();

  return group;
}
