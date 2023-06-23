import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  ComponentSummaryModel,
  ComponentSummaryModelValidationMap,
} from '../../models/radix-api/deployments/component-summary';
import {
  ComponentType,
  buildComponentMap,
  buildComponentTypeLabel,
} from '../../models/radix-api/deployments/component-type';

export interface ComponentListProps {
  components: Array<ComponentSummaryModel>;
}

export const ComponentList: {
  (props: ComponentListProps): JSX.Element;
  propTypes: Required<PropTypes.ValidationMap<ComponentListProps>>;
} = ({ components }) => {
  const compMap = buildComponentMap(components);

  return (
    <>
      {Object.keys(compMap).map((type: ComponentType) =>
        compMap[type].map(({ name }) => (
          <Typography key={`${type}-${name}`}>
            {buildComponentTypeLabel(type)} <strong>{name}</strong>
          </Typography>
        ))
      )}
    </>
  );
};

ComponentList.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape(
      ComponentSummaryModelValidationMap
    ) as PropTypes.Validator<ComponentSummaryModel>
  ).isRequired,
};
