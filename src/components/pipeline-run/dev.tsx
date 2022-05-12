import { ProgressStatus } from '../../models/progress-status';
import { PipelineRunModel } from '../../models/pipeline-run';
import PipelineRun from './index';
import { map } from 'lodash';

const testData: Array<PipelineRunModel> = [
  {
    name: 'some-pipeline-run',
    env: 'dev',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run',
    env: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Queued,
  },
  {
    name: 'some-pipeline-run',
    env: 'dev',
    realName: '',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: '',
    env: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Succeeded,
  },
  {
    name: undefined,
    env: 'dev',
    status: undefined,
  },
];

export default (
  <>
    {testData.map((pipelineRun, i) => (
      <div style={{ backgroundColor: 'var(--color-bright)' }}>
        <PipelineRun
          pipelineRun={pipelineRun}
          appName="my-app"
          jobName={'radix-pipeline-abc'}
        />
      </div>
    ))}
  </>
);
