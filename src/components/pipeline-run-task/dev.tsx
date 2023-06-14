import { Divider } from '@equinor/eds-core-react';
import { Fragment } from 'react';

import { PipelineRunTask } from '.';

import { PipelineRunTaskModel } from '../../models/radix-api/jobs/pipeline-run-task';
import { PipelineTaskRunStatus } from '../../models/radix-api/jobs/pipeline-task-run-status';

const testData: Array<PipelineRunTaskModel> = [
  {
    name: 'some-pipeline-run',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    status: PipelineTaskRunStatus.Succeeded,
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
  },
  {
    name: 'some-pipeline-run',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    status: PipelineTaskRunStatus.Pending,
    started: new Date('2022-05-10T14:31:23Z'),
  },
  {
    name: 'some-pipeline-run',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    status: PipelineTaskRunStatus.Succeeded,
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
  },
  {
    name: 'some-pipeline-run',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    status: PipelineTaskRunStatus.Succeeded,
    started: new Date('2022-05-10T14:31:23Z'),
  },
];

export default (
  <div
    className="grid grid--gap-large"
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    {testData.map((data, i, { length }) => (
      <Fragment key={i}>
        <div
          className="grid grid--gap-large"
          style={{
            border: 'solid 2px gray',
            borderRadius: 'var(--eds_shape_corners_border_radius)',
            margin: '4px',
            padding: 'var(--eds_spacing_large)',
          }}
        >
          <PipelineRunTask task={data} />
        </div>
        <div>{i < length - 1 && <Divider />}</div>
      </Fragment>
    ))}
  </div>
);
