import { ApplicationCostSetModel } from '.';

import { ApplicationCostModelNormalizer } from '../application-cost/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  objectNormalizer,
} from '../../../model-utils';

/**
 * Create an ApplicationCostSetModel object
 */
export const ApplicationCostSetModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationCostSetModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      from: dateNormalizer,
      to: dateNormalizer,
      applicationCosts: (x) =>
        arrayNormalizer(x, ApplicationCostModelNormalizer),
    })
  );
