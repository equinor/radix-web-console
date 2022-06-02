import * as PropTypes from 'prop-types';

import { ComponentType } from '../component-type';

export interface ComponentSummaryModel {
  image: string;
  name: string;
  type: ComponentType;
}

/* PropTypes validation map for ComponentSummaryModel */
export const ComponentSummaryModelValidationMap: PropTypes.ValidationMap<ComponentSummaryModel> =
  {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(ComponentType)).isRequired,
  };
