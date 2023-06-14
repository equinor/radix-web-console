import * as PropTypes from 'prop-types';

import { PipelineTaskRunStatus } from '../pipeline-task-run-status';

export interface PipelineRunTaskModel {
  name: string;
  realName: string;
  pipelineRunEnv: string;
  pipelineName: string;
  status: PipelineTaskRunStatus;
  statusMessage?: string;
  started?: Date;
  ended?: Date;
}

/* PropTypes validation map for PipelineRunTaskModel */
export const PipelineRunTaskModelValidationMap: PropTypes.ValidationMap<PipelineRunTaskModel> =
  {
    name: PropTypes.string.isRequired,
    realName: PropTypes.string.isRequired,
    pipelineRunEnv: PropTypes.string.isRequired,
    pipelineName: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(PipelineTaskRunStatus)).isRequired,
    statusMessage: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
  };
