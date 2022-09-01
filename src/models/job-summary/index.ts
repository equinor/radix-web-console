import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';

export interface JobSummaryModel {
  name: string;
  appName?: string;
  branch?: string;
  commitID?: string;
  created: Date;
  triggeredBy?: string;
  started?: Date;
  ended?: Date;
  status: ProgressStatus;
  pipeline: string;
  environments?: Array<string>;
}

/* PropTypes validation map for JobSummaryModel */
export const JobSummaryModelValidationMap: PropTypes.ValidationMap<JobSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    appName: PropTypes.string,
    branch: PropTypes.string,
    commitID: PropTypes.string,
    created: PropTypes.instanceOf(Date).isRequired,
    triggeredBy: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    pipeline: PropTypes.string.isRequired,
    environments: PropTypes.arrayOf(PropTypes.string),
  };
