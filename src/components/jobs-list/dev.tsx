import { JobsList } from '.';

import { JobSummaryModel } from '../../models/radix-api/jobs/job-summary';
import { ProgressStatus } from '../../models/radix-api/jobs/progress-status';

const jobs: JobSummaryModel[] = [
  {
    name: 'radix-pipeline-20190104111729-mkni5',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: 'ef85c7aeb7351de6918004facfda336def3a1f76',
    created: new Date('2019-01-04T11:17:29Z'),
    status: ProgressStatus.Waiting,
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
  {
    name: 'radix-pipeline-20190110143554-t3tix',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: '37af2a3d841e4d4479373e467caccf550846d418',
    created: new Date('2019-01-10T14:35:54Z'),
    started: new Date('2019-01-10T14:35:54Z'),
    status: ProgressStatus.Running,
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
  {
    name: 'radix-pipeline-20190110083646-uvdv4',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: '292d36c392ccbaba32b419ae56e08dcdd92b8412',
    created: new Date('2019-01-10T08:36:46Z'),
    started: new Date('2019-01-10T08:36:46Z'),
    ended: new Date('2019-01-10T08:39:04Z'),
    status: ProgressStatus.Failed,
    pipeline: 'build-deploy',
  },
  {
    name: 'radix-pipeline-20190109121011-idtna',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: '393cb144cd079886c076285167e23a23c2c783c4',
    created: new Date('2019-01-09T12:10:11Z'),
    started: new Date('2019-01-09T12:10:11Z'),
    ended: new Date('2019-01-09T12:16:47Z'),
    status: ProgressStatus.Succeeded,
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
  {
    name: 'radix-pipeline-20190109085250-obek3',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: 'b7b0caf4e9b06aa4b0b4b967fb6c88485029d72a',
    created: new Date('2019-01-09T08:52:50Z'),
    started: new Date('2019-01-09T08:52:50Z'),
    ended: new Date('2019-01-09T09:00:27Z'),
    status: ProgressStatus.Succeeded,
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
  {
    name: 'radix-pipeline-20190104123104-875r3',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: 'f175e3fabf74b846eedfb27a1978de7cb2f7b4a0',
    created: new Date('2019-01-04T12:31:04Z'),
    started: new Date('2019-01-04T12:31:04Z'),
    ended: new Date('2019-01-04T12:36:32Z'),
    status: ProgressStatus.Succeeded,
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
  {
    name: 'radix-pipeline-20190104111729-mkni6',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: 'ef85c7aeb7351de6918004facfda336def3a1f76',
    created: new Date('2019-01-04T11:17:29Z'),
    started: new Date('2019-01-04T11:17:29Z'),
    ended: new Date('2019-01-04T11:22:26Z'),
    status: ProgressStatus.Succeeded,
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
];

export default (
  <div style={{ backgroundColor: 'var(--color-bright)' }}>
    <JobsList jobs={jobs} appName="my-app" />
    <div style={{ height: '100px' }} />
    <JobsList jobs={[]} appName="my-app" />
  </div>
);
