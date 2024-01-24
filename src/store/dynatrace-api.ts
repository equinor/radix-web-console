import { dynatraceStoreApi as api } from './configs/index';
import { configVariables } from '../utils/config';

function makeAvailabilityUrl(
  monitorName: string,
  resolution: string,
  from: string
): string {
  return (
    '/v2/metrics/query' +
    '?metricSelector=builtin:synthetic.http.availability.location.total' +
    '&entitySelector=type(http_check)' +
    `,entityName("${monitorName}")` +
    `&from=${from}` +
    `&resolution=${resolution}`
  );
}

function makeStatusCodeUrl(
  baseUrl: string,
  monitorName: string,
  resolution: string,
  from: string,
  to: string = undefined,
  filter: string = undefined
): string {
  return (
    '/v2/metrics/query' +
    '?metricSelector=builtin:synthetic.http.request.statusCode' +
    (filter ? `:filter(${filter})` : '') +
    '&entitySelector=type(http_check_step)' +
    `,entityName.equals(canary.${baseUrl})` +
    ',fromRelationships.isStepOf(' +
    'type(http_check)' +
    ',mzName(RADIX)' +
    `,entityName("${monitorName}"))` +
    `&from=${from}` +
    (to ? `&to=${to}` : '') +
    `&resolution=${resolution}`
  );
}

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAvailabilityItems: build.query<GenericResponse, { monitorName: string }>(
      {
        query: ({ monitorName }) => ({
          url: makeAvailabilityUrl(monitorName, '30m', 'now-90d'),
        }),
      }
    ),
    getStatusItems: build.query<GenericResponse, GetStatusItemsArgs>({
      query: ({ monitorName, resolution = '1d', from = 'now-90d', to }) => ({
        url: makeStatusCodeUrl(
          configVariables.RADIX_CLUSTER_BASE,
          monitorName,
          resolution,
          from,
          to
        ),
      }),
    }),
  }),
});

export { injectedRtkApi as msGraphApi };
export const {
  useGetAvailabilityItemsQuery,
  useGetStatusItemsQuery,
  useLazyGetStatusItemsQuery,
  useLazyGetAvailabilityItemsQuery,
} = injectedRtkApi;

export type GenericResponse = {
  nextPageKey: unknown;
  resolution: string;
  result: Array<{
    metricId: string;
    dataPointCountRatio: number;
    dimensionCountRatio: number;
    data: Array<{
      dimensionMap: Record<string, string>;
      dimensions: Array<string>;
      timestamps: Array<number>;
      values: Array<number>;
    }>;
    warnings: Array<string>;
  }>;
  totalCount: number;
  warnings: Array<string>;
};

type GetStatusItemsArgs = {
  monitorName: string;
  resolution?: string;
  from?: string;
  to?: string;
  filter?: string;
};
