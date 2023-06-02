import * as PropTypes from 'prop-types';

import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../replica-summary';
import {
  ScheduledJobSummaryModel,
  ScheduledJobSummaryModelValidationMap,
} from '../scheduled-job-summary';
import { ProgressStatus } from '../../../progress-status';

export interface ScheduledBatchSummaryModel {
  name: string;
  created: Date;
  started?: Date;
  ended?: Date;
  status: ProgressStatus;
  message?: string;
  replica?: ReplicaSummaryNormalizedModel;
  jobList?: Array<ScheduledJobSummaryModel>;
  totalJobCount: number;
  deploymentName?: string;
}

/* PropTypes validation map for ScheduledBatchSummaryModel */
export const ScheduledBatchSummaryModelValidationMap: PropTypes.ValidationMap<ScheduledBatchSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    message: PropTypes.string,
    replica: PropTypes.shape(
      ReplicaSummaryNormalizedModelValidationMap
    ) as PropTypes.Validator<ReplicaSummaryNormalizedModel>,
    jobList: PropTypes.arrayOf(
      PropTypes.shape(
        ScheduledJobSummaryModelValidationMap
      ) as PropTypes.Validator<ScheduledJobSummaryModel>
    ),
    totalJobCount: PropTypes.number.isRequired,
    deploymentName: PropTypes.string,
  };
