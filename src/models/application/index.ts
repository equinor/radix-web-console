import * as PropTypes from 'prop-types';

import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../application-registration';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../environment-summary';
import { JobSummaryModel, JobSummaryModelValidationMap } from '../job-summary';

export interface ApplicationModel {
  name: string;
  owner: string;
  repository: string;
  creator: string;
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
    owner: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    jobs: PropTypes.arrayOf<JobSummaryModel>(
      PropTypes.shape(JobSummaryModelValidationMap) as any
    ),
    appAlias: PropTypes.exact({
      componentName: PropTypes.string.isRequired,
      environmentName: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    registration: PropTypes.shape(ApplicationRegistrationModelValidationMap)
      .isRequired as any,
    environments: PropTypes.arrayOf<EnvironmentSummaryModel>(
      PropTypes.shape(EnvironmentSummaryModelValidationMap) as any
    ).isRequired,
  };
