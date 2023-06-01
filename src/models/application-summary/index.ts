import * as PropTypes from 'prop-types';

import { JobSummaryModel, JobSummaryModelValidationMap } from '../job-summary';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../radix-api/deployments/component';

export interface ApplicationSummaryModel {
  name: string;
  latestJob?: JobSummaryModel;
  environmentActiveComponents?: Record<string, Array<ComponentModel>>;
}

/* PropTypes validation map for ApplicationSummaryModel */
export const ApplicationSummaryModelValidationMap: PropTypes.ValidationMap<ApplicationSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    latestJob: PropTypes.shape(
      JobSummaryModelValidationMap
    ) as PropTypes.Validator<JobSummaryModel>,
    environmentActiveComponents: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape(
          ComponentModelValidationMap
        ) as PropTypes.Validator<ComponentModel>
      )
    ),
  };
