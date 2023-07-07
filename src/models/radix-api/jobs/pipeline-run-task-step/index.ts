import * as PropTypes from 'prop-types';

import { PipelineTaskRunReason } from '../pipeline-task-run-reason';

export interface PipelineRunTaskStepModel {
  name: string;
  status: PipelineTaskRunReason;
  statusMessage?: string;
  started?: Date;
  ended?: Date;
}

/* PropTypes validation map for PipelineRunTaskStepModel */
export const PipelineRunTaskStepModelValidationMap: PropTypes.ValidationMap<PipelineRunTaskStepModel> =
  {
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(PipelineTaskRunReason)).isRequired,
    statusMessage: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
  };
