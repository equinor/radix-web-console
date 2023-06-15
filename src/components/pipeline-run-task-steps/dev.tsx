import { Divider } from '@equinor/eds-core-react';
import { Fragment } from 'react';

import { PipelineRunTaskSteps } from '.';

import { PipelineRunReason } from '../../models/radix-api/jobs/pipeline-run-reason';
import { PipelineRunTaskStepModel } from '../../models/radix-api/jobs/pipeline-run-task-step';

const testData: Array<PipelineRunTaskStepModel[]> = [
  [
    {
      name: 'some-pipeline-run-task',
      started: new Date('2022-05-10T14:31:23Z'),
      ended: new Date(),
      status: PipelineRunReason.Succeeded,
    },
    {
      name: 'some-pipeline-run-task',
      started: new Date('2022-05-10T14:31:23Z'),
      status: PipelineRunReason.Started,
    },
    {
      name: 'some-pipeline-run-task',
      started: new Date('2022-05-10T14:31:23Z'),
      ended: new Date(),
      status: PipelineRunReason.Succeeded,
    },
    {
      name: 'some-pipeline-run-task',
      started: new Date('2022-05-10T14:31:23Z'),
      status: PipelineRunReason.Succeeded,
    },
  ],
  [],
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
          <PipelineRunTaskSteps steps={data} />
        </div>
        <div>{i < length - 1 && <Divider />}</div>
      </Fragment>
    ))}
  </div>
);
