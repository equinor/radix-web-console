import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';
import {
  ScheduledJobSummaryModel,
  ScheduledJobSummaryModelValidationMap,
} from '../scheduled-job-summary';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../replica-summary';

export interface ScheduledBatchSummaryModel {
  name: string;
  created: Date;
  started?: Date;
  ended?: Date;
  status: ProgressStatus;
  message: string;
  replica?: ReplicaSummaryNormalizedModel;
  jobList?: Array<ScheduledJobSummaryModel>;
}

/* PropTypes validation map for ScheduledJobSummaryModel */
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
    ) as PropTypes.Requireable<ReplicaSummaryNormalizedModel>,
    jobList: PropTypes.arrayOf(
      PropTypes.shape(
        ScheduledJobSummaryModelValidationMap
      ) as PropTypes.Requireable<ScheduledJobSummaryModel>
    ),
  };
