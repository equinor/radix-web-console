import { Divider } from '@equinor/eds-core-react';
import { Fragment } from 'react';

import { PipelineRunTaskSteps } from '.';

import type { PipelineRunTaskStep as PipelineRunTaskStepModel } from '../../store/radix-api';

const testData: Array<PipelineRunTaskStepModel[]> = [
  [
    {
      name: 'some-pipeline-run-task',
      started: new Date('2022-05-10T14:31:23Z').toISOString(),
      ended: new Date().toISOString(),
      status: 'Succeeded',
    },
    {
      name: 'some-pipeline-run-task',
      started: new Date('2022-05-10T14:31:23Z').toISOString(),
      status: 'Started',
    },
    {
      name: 'some-pipeline-run-task',
      started: new Date('2022-05-10T14:31:23Z').toISOString(),
      ended: new Date().toISOString(),
      status: 'Succeeded',
    },
    {
      name: 'some-pipeline-run-task',
      started: new Date('2022-05-10T14:31:23Z').toISOString(),
      status: 'Succeeded',
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
