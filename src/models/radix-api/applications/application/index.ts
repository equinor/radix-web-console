import * as PropTypes from 'prop-types';

import {
  ApplicationAliasModel,
  ApplicationAliasModelValidationMap,
} from '../application-alias';
import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../application-registration';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../environments/environment-summary';
import {
  JobSummaryModel,
  JobSummaryModelValidationMap,
} from '../../jobs/job-summary';
import { DNSAliasModel, DNSAliasModelValidationMap } from '../dns-alias';

export interface ApplicationModel {
  name: string;
  registration: ApplicationRegistrationModel;
  environments?: Array<EnvironmentSummaryModel>;
  jobs?: Array<JobSummaryModel>;
  appAlias?: ApplicationAliasModel;
  dnsAlias?: Array<DNSAliasModel>;
  userIsAdmin: boolean;
}

/* PropTypes validation map for ApplicationModel */
export const ApplicationModelValidationMap: PropTypes.ValidationMap<ApplicationModel> =
  {
    name: PropTypes.string.isRequired,
    registration: PropTypes.shape(ApplicationRegistrationModelValidationMap)
      .isRequired as PropTypes.Validator<ApplicationRegistrationModel>,
    environments: PropTypes.arrayOf(
      PropTypes.shape(
        EnvironmentSummaryModelValidationMap
      ) as PropTypes.Validator<EnvironmentSummaryModel>
    ),
    jobs: PropTypes.arrayOf(
      PropTypes.shape(
        JobSummaryModelValidationMap
      ) as PropTypes.Validator<JobSummaryModel>
    ),
    appAlias: PropTypes.shape(
      ApplicationAliasModelValidationMap
    ) as PropTypes.Validator<ApplicationAliasModel>,
    dnsAlias: PropTypes.arrayOf(
      PropTypes.shape(
        DNSAliasModelValidationMap
      ) as PropTypes.Validator<DNSAliasModel>
    ),
    userIsAdmin: PropTypes.bool.isRequired,
  };
