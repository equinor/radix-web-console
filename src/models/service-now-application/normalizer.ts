import { ServiceNowApplicationModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ServiceNowApplicationModel object
 */
export const ServiceNowApplicationModelNormalizer: ModelNormalizerType<
  ServiceNowApplicationModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({
      ...(props as ServiceNowApplicationModel),
    })
  );
