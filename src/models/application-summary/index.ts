import * as PropTypes from 'prop-types';

import { JobSummaryModel, JobSummaryModelValidationMap } from '../job-summary';

export interface ApplicationSummaryModel {
  name: string;
  latestJob?: JobSummaryModel;
}

/* PropTypes validation map for ApplicationSummaryModel */
export const ApplicationSummaryModelValidationMap: PropTypes.ValidationMap<ApplicationSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    latestJob: PropTypes.shape(JobSummaryModelValidationMap) as any,
  };
