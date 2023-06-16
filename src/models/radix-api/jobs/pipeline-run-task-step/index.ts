import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../../../progress-status';

export interface PipelineRunTaskStepModel {
  name: string;
  status: ProgressStatus;
  statusMessage?: string;
  started?: Date;
  ended?: Date;
}

/* PropTypes validation map for PipelineRunTaskStepModel */
export const PipelineRunTaskStepModelValidationMap: PropTypes.ValidationMap<PipelineRunTaskStepModel> =
  {
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    statusMessage: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
  };
