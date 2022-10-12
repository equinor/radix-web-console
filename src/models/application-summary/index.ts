import * as PropTypes from 'prop-types';

import { DeploymentModel, DeploymentModelValidationMap } from '../deployment';
import { JobSummaryModel, JobSummaryModelValidationMap } from '../job-summary';

export interface ApplicationSummaryModel {
  name: string;
  latestJob?: JobSummaryModel;
  activeDeployments?: Array<DeploymentModel>;
}

/* PropTypes validation map for ApplicationSummaryModel */
export const ApplicationSummaryModelValidationMap: PropTypes.ValidationMap<ApplicationSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    latestJob: PropTypes.shape(
      JobSummaryModelValidationMap
    ) as PropTypes.Validator<JobSummaryModel>,
    activeDeployments: PropTypes.arrayOf(
      PropTypes.shape(
        DeploymentModelValidationMap
      ) as PropTypes.Validator<DeploymentModel>
    ),
  };
