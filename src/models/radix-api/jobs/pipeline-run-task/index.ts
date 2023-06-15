import * as PropTypes from 'prop-types';

import { PipelineTaskRunReason } from '../pipeline-task-run-reason';

export interface PipelineRunTaskModel {
  name: string;
  realName: string;
  pipelineRunEnv: string;
  pipelineName: string;
  status: PipelineTaskRunReason;
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
    status: PropTypes.oneOf(Object.values(PipelineTaskRunReason)).isRequired,
    statusMessage: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
  };
