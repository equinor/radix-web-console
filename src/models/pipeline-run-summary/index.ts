import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';
import {
  PipelineTaskSummaryModel,
  PipelineTaskSummaryModelValidationMap,
} from '../pipeline-task-summary';

export interface PipelineRunSummaryModel {
  name: string;
  realName?: string;
  started?: Date;
  ended?: Date;
  status?: ProgressStatus;
  statusMessage?: string;
  tasks?: Array<PipelineTaskSummaryModel>;
}

/* PropTypes validation map for JobTaskSummaryModel */
export const PipelineRunSummaryModelValidationMap: PropTypes.ValidationMap<PipelineRunSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    realName: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    statusMessage: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.shape(
        PipelineTaskSummaryModelValidationMap
      ) as PropTypes.Requireable<PipelineTaskSummaryModel>
    ),
  };
