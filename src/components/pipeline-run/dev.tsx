import { Divider } from '@equinor/eds-core-react';
import { Fragment } from 'react';

import { PipelineRun } from '.';

import { PipelineRunModel } from '../../models/radix-api/jobs/pipeline-run';
import { PipelineRunStatus } from '../../models/radix-api/jobs/pipeline-run-status';

const testData: Array<PipelineRunModel> = [
  {
    name: 'some-pipeline-run',
    env: 'dev',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: PipelineRunStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run',
    env: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: PipelineRunStatus.Started,
  },
  {
    name: 'some-pipeline-run',
    env: 'dev',
    realName: '',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: PipelineRunStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run',
    env: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: PipelineRunStatus.Running,
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
          <PipelineRun pipelineRun={data} />
        </div>
        <div>{i < length - 1 && <Divider />}</div>
      </Fragment>
    ))}
  </div>
);
