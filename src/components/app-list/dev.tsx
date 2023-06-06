import { Typography } from '@equinor/eds-core-react';

import { AppList, AppListProps } from '.';

import { AsyncState } from '../../effects/effect-types';
import { ApplicationSummaryModel } from '../../models/radix-api/applications/application-summary';
import { ProgressStatus } from '../../models/radix-api/jobs/progress-status';
import { RequestState } from '../../state/state-utils/request-states';

const testResponse: Array<ApplicationSummaryModel> = [
  { name: 'canarycicd-test1', latestJob: null },
  {
    name: 'radix-canary-golang',
    latestJob: {
      triggeredBy: '',
      commitID: '595c5284faca83a9d0f17a623b66a2e9255a0d98',
      created: new Date('2021-08-18T17:20:00+0200'),
      environments: ['dev', 'qa', 'prod'],
      name: 'radix-pipeline-20210818172000-glapv-znh6h',
      pipeline: 'build-deploy',
      started: new Date(),
      status: ProgressStatus.Running,
    },
  },
  {
    name: 'radix-web-console',
    latestJob: {
      triggeredBy: '',
      commitID: '255a0d9866a855283a9d0f17a6232e95c4facab9',
      created: new Date('2021-09-23T10:32:28+0200'),
      ended: new Date('2021-09-23T10:55:59+0200'),
      environments: ['prod', 'test'],
      name: 'radix-pipeline-20210923103228-lagpv-h6znh',
      pipeline: 'build-deploy',
      started: new Date('2021-09-23T10:42:07+0200'),
      status: ProgressStatus.Failed,
    },
  },
  {
    name: 'radix-api',
    latestJob: {
      triggeredBy: 'USER@equinor.com',
      commitID: 'a2e4fa95c527a623b9255a0d983a9d0f1866ca85',
      created: new Date('2021-01-02T22:47:22+0200'),
      ended: new Date('2021-03-23T14:25:05-0700'),
      environments: ['prod', 'qa'],
      name: 'radix-pipeline-20210102224722-agpvl-hnh6z',
      pipeline: 'build-deploy',
      started: new Date('2021-01-02T22:53:12+0200'),
      status: ProgressStatus.Succeeded,
    },
  },
  {
    name: 'radix-extreme-test-of-name-length-so-that-ui-is-okay',
    latestJob: {
      triggeredBy: 'USER@equinor.com',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      created: new Date('2020-06-18T08:03:39+0200'),
      environments: ['dev', 'qa'],
      name: 'radix-pipeline-20200618080339-aglvp-znhh6',
      pipeline: 'build-deploy',
      started: new Date('2020-06-18T09:26:34+0200'),
      status: ProgressStatus.Running,
    },
  },
  {
    name: 'radix-extreme-test-of-name-length-so-that-ui-is-okay-2',
    latestJob: {
      triggeredBy: 'TEST@equinor.com',
      commitID: 'f17a623b9255a0d9866a2e4faca8595c5283a9d0',
      created: new Date('2018-10-29T13:56:44+0200'),
      ended: new Date('2018-10-29T16:22:17+0200'),
      environments: ['dev', 'qa'],
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      started: new Date('2018-10-29T14:57:09+0200'),
      status: ProgressStatus.Failed,
    },
  },
];

const favouritAppNames = ['radix-canary-golang', 'radix-web-console'];
const noApps: Array<string> = [];
const appsResponse: AsyncState<Array<ApplicationSummaryModel>> = {
  status: RequestState.SUCCESS,
  data: testResponse,
};
const emptyResponse: AsyncState<Array<ApplicationSummaryModel>> = {
  status: RequestState.FAILURE,
  data: null,
};
const loadingResponse: AsyncState<Array<ApplicationSummaryModel>> = {
  status: RequestState.IN_PROGRESS,
  data: null,
};

const noop = () => {};
const getApps = () => appsResponse;
const getNoApps = () => emptyResponse;
const getLoadingApps = () => loadingResponse;

const testData: Array<{ description: string } & AppListProps> = [
  {
    description: 'With applications, with favourites',
    toggleFavouriteApplication: noop,
    pollApplicationsByNames: getApps,
    pollApplications: getApps,
    favouriteAppNames: favouritAppNames,
  },
  {
    description: 'With applications, without favourites',
    toggleFavouriteApplication: noop,
    pollApplicationsByNames: getApps,
    pollApplications: getApps,
    favouriteAppNames: noApps,
  },
  {
    description: 'Loading applications',
    toggleFavouriteApplication: noop,
    pollApplicationsByNames: getLoadingApps,
    pollApplications: getLoadingApps,
    favouriteAppNames: noApps,
  },
  {
    description: 'Without applications',
    toggleFavouriteApplication: noop,
    pollApplicationsByNames: getNoApps,
    pollApplications: getNoApps,
    favouriteAppNames: noApps,
  },
];

export default (
  <div style={{ maxWidth: '1000px' }}>
    {testData.map(({ description, ...rest }, i) => (
      <div
        key={i}
        style={{ margin: '1em', padding: '2em', border: '1px solid #000' }}
      >
        <Typography variant="h4">{description}</Typography>
        <AppList {...rest} />
      </div>
    ))}
  </div>
);
