import { msGraphStoreApi as api } from './configs/index';
import { RootState } from '../init/store';
import { Client } from '@microsoft/microsoft-graph-client';

let graphClient: Client | undefined = undefined;
function ensureClient(state: RootState) {
  if (!graphClient) {
    const provider = state.auth.provider;
    if (!provider) throw new Error('MS Graph Provider not reay');

    graphClient = Client.initWithMiddleware({
      authProvider: provider.graphAuthProvider,
    });
  }

  return graphClient;
}

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdGroup: build.query<GetAdGroupResponse, GetAdGroupArg>({
      queryFn: async ({ id }, { getState }) => {
        try {
          ensureClient(getState() as RootState);
          const group: AdGroup = await graphClient
            .api(`/groups/${id}`)
            .select('displayName,id')
            .get();

          return { data: group };
        } catch (e) {
          return { error: e };
        }
      },
    }),

    searchAdGroups: build.query<SearchAdGroupsResponse, SearchAdGroupsArgs>({
      queryFn: async ({ groupName, limit }, { getState }) => {
        try {
          ensureClient(getState() as RootState);

          const groups: SearchAdGroupsResponse = await graphClient
            .api('/groups')
            .select('displayName,id')
            .filter(groupName ? `startswith(displayName,'${groupName}')` : '')
            .top(limit)
            .get();

          return { data: groups };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export { injectedRtkApi as msGraphApi };
export const { useGetAdGroupQuery, useSearchAdGroupsQuery } = injectedRtkApi;

type GetAdGroupArg = {
  id: string;
};
type GetAdGroupResponse = AdGroup;
export type AdGroup = {
  '@odaga.context': string;
  displayName: string;
  id: string;
};

type SearchAdGroupsArgs = {
  groupName: string;
  limit: number;
};
export type SearchAdGroupsResponse = {
  '@odata.context'?: string;
  '@odata.nextLink'?: string;
  value: AdGroup[];
};
