import { ApplicationModel } from '.';

import { ApplicationAliasModelNormalizer } from '../application-alias/normalizer';
import { ApplicationRegistrationModelNormalizer } from '../application-registration/normalizer';
import { EnvironmentSummaryModelNormalizer } from '../../environments/environment-summary/normalizer';
import { JobSummaryModelNormalizer } from '../../jobs/job-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, objectNormalizer } from '../../../model-utils';
import { DNSAliasModelNormalizer } from '../dns-alias/normalizer';

/**
 * Create an ApplicationModel object
 */
export const ApplicationModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      registration: ApplicationRegistrationModelNormalizer,
      environments: (x) =>
        arrayNormalizer(x, EnvironmentSummaryModelNormalizer),
      jobs: (x) => arrayNormalizer(x, JobSummaryModelNormalizer),
      appAlias: ApplicationAliasModelNormalizer,
      dnsAliases: (x) => arrayNormalizer(x, DNSAliasModelNormalizer),
    })
  );
