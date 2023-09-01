import { ComponentSummaryModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a ComponentSummaryModel object
 */
export const ComponentSummaryModelNormalizer: ModelNormalizerType<
  Readonly<ComponentSummaryModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
