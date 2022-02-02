import { DeploymentsList } from '.';

import { DeploymentSummaryModel } from '../../models/deployment-summary';

const deployments: DeploymentSummaryModel[] = [
  {
    name: 'qa-s7zie-vlok4myf',
    createdByJob: 'radix-pipeline-20190124132335-s7zie',
    environment: 'qa',
    activeFrom: new Date('2019-01-24T13:27:17Z'),
  },
  {
    name: 'qa-cg4hz-xx1fbluj',
    createdByJob: 'radix-pipeline-20190124081746-cg4hz',
    environment: 'qa',
    activeFrom: new Date('2019-01-24T08:21:28Z'),
    activeTo: new Date('2019-01-24T13:27:17Z'),
  },
  {
    name: 'qa-y8ib5-kjtalhmj',
    createdByJob: 'radix-pipeline-20190122134120-y8ib5',
    environment: 'qa',
    activeFrom: new Date('2019-01-22T13:44:46Z'),
    activeTo: new Date('2019-01-24T08:21:28Z'),
  },
  {
    name: 'prod-tq9nx-l0jaycnm',
    createdByJob: 'radix-pipeline-20190122134007-tq9nx',
    environment: 'prod',
    activeFrom: new Date('2019-01-22T13:43:41Z'),
  },
  {
    name: 'qa-boo06-ixgfw4jt',
    createdByJob: 'radix-pipeline-20190122133805-boo06',
    environment: 'qa',
    activeFrom: new Date('2019-01-22T13:41:44Z'),
    activeTo: new Date('2019-01-22T13:44:46Z'),
  },
  {
    name: 'qa-sywcg-zzbdpnxm',
    createdByJob: 'radix-pipeline-20190122132828-sywcg',
    environment: 'qa',
    activeFrom: new Date('2019-01-22T13:32:10Z'),
    activeTo: new Date('2019-01-22T13:41:44Z'),
  },
  {
    name: 'qa-qn1cp-cuimkggt',
    createdByJob: 'radix-pipeline-20190121110657-qn1cp',
    environment: 'qa',
    activeFrom: new Date('2019-01-21T11:10:52Z'),
    activeTo: new Date('2019-01-22T13:32:10Z'),
  },
  {
    name: 'qa-zgase-liokot45',
    createdByJob: 'radix-pipeline-20190121110526-zgase',
    environment: 'qa',
    activeFrom: new Date('2019-01-21T11:09:09Z'),
    activeTo: new Date('2019-01-21T11:10:52Z'),
  },
  {
    name: 'qa-mzq2n-arszwzjv',
    environment: 'qa',
    activeFrom: new Date('2019-01-18T14:38:36Z'),
    activeTo: new Date('2019-01-21T11:09:09Z'),
  },
  {
    name: 'prod-nje0n-0wrmvkmv',
    environment: 'prod',
    activeFrom: new Date('2019-01-18T14:38:25Z'),
    activeTo: new Date('2019-01-22T13:43:41Z'),
  },
];

export default (
  <div style={{ backgroundColor: 'var(--color-bright)' }}>
    <DeploymentsList deployments={deployments} appName="my-app" />
    <hr />
    <DeploymentsList deployments={[]} appName="my-app" />
  </div>
);
