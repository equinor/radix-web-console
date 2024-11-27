import { msGraphStoreApi as api } from './configs/index';
import type { RootState } from '../store/store';
import { Client, GraphError } from '@microsoft/microsoft-graph-client';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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

function parseGraphError(e): FetchBaseQueryError {
  if (e instanceof GraphError) {
    return { data: e.body, status: e.statusCode };
  }

  return { error: e, status: 'CUSTOM_ERROR' };
}

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdGroup: build.query<EntraItem, GetAdGroupArg>({
      queryFn: async ({ id }, { getState }) => {
        try {
          ensureClient(getState() as RootState);
          const group: EntraItem = await graphClient
            .api(`/groups/${id}`)
            .select('displayName,id')
            .get();

          return { data: group };
        } catch (e) {
          return { error: parseGraphError(e) };
        }
      },
    }),
    getAdGroups: build.query<GetEntraResponse, GetEntraArg>({
      queryFn: async ({ ids }, { getState }) => {
        try {
          if (ids.length > 15) {
            // ref. https://learn.microsoft.com/en-us/graph/filter-query-parameter?tabs=javascript#operators-and-functions-supported-in-filter-expressions
            return {
              error: {
                error: 'We can fetch maximum 15 items at a time',
                status: 'CUSTOM_ERROR',
              },
            };
          }

          if (ids.length === 0) {
            return { data: [] };
          }

          ensureClient(getState() as RootState);
          const idFilter = ids.map((s) => `'${s}'`).join(',');
          const response: SearchResponse = await graphClient
            .api(`/groups`)
            .select('displayName,id')
            .filter(`id in (${idFilter})`)
            .get();

          return { data: response.value };
        } catch (e) {
          return { error: parseGraphError(e) };
        }
      },
    }),

    getAdServicePrincipal: build.query<GetEntraResponse, GetEntraArg>({
      queryFn: async ({ ids }, { getState }) => {
        try {
          if (ids.length > 15) {
            // ref. https://learn.microsoft.com/en-us/graph/filter-query-parameter?tabs=javascript#operators-and-functions-supported-in-filter-expressions
            return {
              error: {
                error: 'We can fetch maximum 15 items at a time',
                status: 'CUSTOM_ERROR',
              },
            };
          }

          if (ids.length === 0) {
            return { data: [] };
          }

          ensureClient(getState() as RootState);
          const idFilter = ids.map((s) => `'${s}'`).join(',');
          const response: SearchResponse = await graphClient
            .api(`/servicePrincipals`)
            .select('displayName,id,appId')
            .filter(`id in (${idFilter})`)
            .get();

          return { data: response.value };
        } catch (e) {
          return { error: parseGraphError(e) };
        }
      },
    }),
    getAdApplication: build.query<GetEntraResponse, GetEntraArg>({
      queryFn: async ({ ids }, { getState }) => {
        try {
          if (ids.length > 15) {
            // ref. https://learn.microsoft.com/en-us/graph/filter-query-parameter?tabs=javascript#operators-and-functions-supported-in-filter-expressions
            return {
              error: {
                error: 'We can fetch maximum 15 items at a time',
                status: 'CUSTOM_ERROR',
              },
            };
          }

          if (ids.length === 0) {
            return { data: [] };
          }

          ensureClient(getState() as RootState);
          const idFilter = ids.map((s) => `'${s}'`).join(',');
          const response: SearchResponse = await graphClient
            .api(`/applications`)
            .select('displayName,id,appId')
            .filter(`id in (${idFilter})`)
            .get();

          return { data: response.value };
        } catch (e) {
          return { error: parseGraphError(e) };
        }
      },
    }),

    searchAdGroups: build.query<SearchResponse, SearchEntraArgs>({
      queryFn: async ({ displayName, limit }, { getState }) => {
        try {
          ensureClient(getState() as RootState);

          const groups: SearchResponse = await graphClient
            .api('/groups')
            .select('displayName,id')
            .filter(displayName ? `startswith(displayName,'${displayName}')` : '')
            .top(limit)
            .get();

          return { data: groups };
        } catch (e) {
          return { error: parseGraphError(e) };
        }
      },
    }),

    searchAdServicePrincipals: build.query<SearchResponse, SearchEntraArgs>({
      queryFn: async ({ displayName, limit }, { getState }) => {
        try {
          ensureClient(getState() as RootState);

          const groups: SearchResponse = await graphClient
            .api('/servicePrincipals')
            .select('displayName,id,appId')
            .filter(displayName ? `startswith(displayName,'${displayName}')` : '')
            .top(limit)
            .get();

          return { data: groups };
        } catch (e) {
          return { error: parseGraphError(e) };
        }
      },
    }),

    searchAdApplications: build.query<SearchResponse, SearchEntraArgs>({
      queryFn: async ({ displayName, limit }, { getState }) => {
        try {
          ensureClient(getState() as RootState);

          const groups: SearchResponse = await graphClient
            .api('/applications')
            .select('displayName,id,appId')
            .filter(displayName ? `startswith(displayName,'${displayName}')` : '')
            .top(limit)
            .get();

          return { data: groups };
        } catch (e) {
          return { error: parseGraphError(e) };
        }
      },
    }),
  }),
});

export { injectedRtkApi as msGraphApi };
export const {
  useGetAdGroupsQuery,
  useGetAdApplicationQuery,
  useGetAdServicePrincipalQuery,
  useSearchAdGroupsQuery,
  useSearchAdServicePrincipalsQuery,
  useSearchAdApplicationsQuery,
  useLazySearchAdGroupsQuery,
  useLazySearchAdServicePrincipalsQuery,
} = injectedRtkApi;

type GetAdGroupArg = {
  id: string;
};

export type EntraItem = {
  displayName: string;
  id: string;
  appId?: string;
};
type GetEntraArg = {
  ids: string[];
};
type GetEntraResponse = EntraItem[];

type SearchEntraArgs = {
  displayName: string;
  limit: number;
};
export type SearchResponse = {
  '@odata.context'?: string;
  '@odata.nextLink'?: string;
  value: Array<EntraItem>;
};
