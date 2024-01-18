import { msGraphStoreApi as api } from './configs/index';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdGroup: build.query<GetAdGroupResponse, GetAdGroupArg>({
      query: (arg) => ({
        url: `/groups/${arg.adGroup}?$select=displayName,id`,
      }),
    }),
  }),
});

export const { useGetAdGroupQuery } = injectedRtkApi;

type GetAdGroupArg = {
  adGroup: string;
};
type GetAdGroupResponse = AdGroup;
export type AdGroup = {
  '@odaga.context': string;
  displayName: string;
  id: string;
};
