import * as PropTypes from 'prop-types';

import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../application-registration';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../radix-api/environments/environment-summary';
import {
  JobSummaryModel,
  JobSummaryModelValidationMap,
} from '../radix-api/jobs/job-summary';

export interface ApplicationModel {
  name: string;
  jobs: Array<JobSummaryModel>;
  appAlias?: {
    url: string;
    componentName: string;
    environmentName: string;
  };
  registration: ApplicationRegistrationModel;
  environments: Array<EnvironmentSummaryModel>;
}

/* PropTypes validation map for ApplicationModel */
export const ApplicationModelValidationMap: PropTypes.ValidationMap<ApplicationModel> =
  {
    name: PropTypes.string.isRequired,
    jobs: PropTypes.arrayOf(
      PropTypes.shape(
        JobSummaryModelValidationMap
      ) as PropTypes.Validator<JobSummaryModel>
    ),
    appAlias: PropTypes.exact({
      componentName: PropTypes.string.isRequired,
      environmentName: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    registration: PropTypes.shape(ApplicationRegistrationModelValidationMap)
      .isRequired as PropTypes.Validator<ApplicationRegistrationModel>,
    environments: PropTypes.arrayOf(
      PropTypes.shape(
        EnvironmentSummaryModelValidationMap
      ) as PropTypes.Validator<EnvironmentSummaryModel>
    ).isRequired,
  };
