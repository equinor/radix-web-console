import { msGraphStoreApi as api } from './configs/index';
import { RootState } from '../store/store';
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
    getAdGroups: build.query<GetAdGroupsResponse, GetAdGroupsArg>({
      queryFn: async ({ ids }, { getState }) => {
        try {
          if (ids.length > 15) {
            // ref. https://learn.microsoft.com/en-us/graph/filter-query-parameter?tabs=javascript#operators-and-functions-supported-in-filter-expressions

            return {
              error: new Error('We can fetch maximum 15 items at a time'),
            };
          }

          if (ids.length === 0) {
            return { data: [] };
          }

          ensureClient(getState() as RootState);
          const idFilter = ids.map((s) => `'${s}'`).join(',');

          const response: SearchAdGroupsResponse = await graphClient
            .api(`/groups`)
            .select('displayName,id')
            .filter(`id in (${idFilter})`)
            .get();

          return { data: response.value };
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
export const {
  useGetAdGroupQuery,
  useGetAdGroupsQuery,
  useSearchAdGroupsQuery,
} = injectedRtkApi;

type GetAdGroupArg = {
  id: string;
};
type GetAdGroupResponse = AdGroup;
export type AdGroup = {
  '@odaga.context': string;
  displayName: string;
  id: string;
};
type GetAdGroupsArg = {
  ids: string[];
};
type GetAdGroupsResponse = AdGroup[];

type SearchAdGroupsArgs = {
  groupName: string;
  limit: number;
};
export type SearchAdGroupsResponse = {
  '@odata.context'?: string;
  '@odata.nextLink'?: string;
  value: AdGroup[];
};
