import * as PropTypes from 'prop-types';

import { PipelineRunStatus } from '../pipeline-run-status';

export interface PipelineRunTaskStepModel {
  name: string;
  status: PipelineRunStatus;
  statusMessage?: string;
  started?: Date;
  ended?: Date;
}

/* PropTypes validation map for PipelineRunTaskStepModel */
export const PipelineRunTaskStepModelValidationMap: PropTypes.ValidationMap<PipelineRunTaskStepModel> =
  {
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(PipelineRunStatus)).isRequired,
    statusMessage: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
  };
