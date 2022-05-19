import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';

export interface PipelineRunTaskStepModel {
  name: string;
  started?: Date;
  ended?: Date;
  status?: ProgressStatus;
  statusMessage?: string;
}

/* PropTypes validation map for PipelineRunTaskStepSummaryModel */
export const PipelineRunTaskStepModelValidationMap: PropTypes.ValidationMap<PipelineRunTaskStepModel> =
  {
    name: PropTypes.string.isRequired,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    statusMessage: PropTypes.string,
  };
