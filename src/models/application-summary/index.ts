import * as PropTypes from 'prop-types';

import { ComponentModel, ComponentModelValidationMap } from '../component';
import { JobSummaryModel, JobSummaryModelValidationMap } from '../job-summary';

export interface ApplicationSummaryModel {
  name: string;
  latestJob?: JobSummaryModel;
  activeDeploymentComponents?: Array<ComponentModel>;
}

/* PropTypes validation map for ApplicationSummaryModel */
export const ApplicationSummaryModelValidationMap: PropTypes.ValidationMap<ApplicationSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    latestJob: PropTypes.shape(
      JobSummaryModelValidationMap
    ) as PropTypes.Validator<JobSummaryModel>,
    activeDeploymentComponents: PropTypes.arrayOf(
      PropTypes.shape(
        ComponentModelValidationMap
      ) as PropTypes.Validator<ComponentModel>
    ),
  };
