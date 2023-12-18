import { Typography } from '@equinor/eds-core-react';
import { upperFirst } from 'lodash';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  ComponentSummaryModel,
  ComponentSummaryModelValidationMap,
} from '../../models/radix-api/deployments/component-summary';
import {
  ComponentType,
  buildComponentMap,
} from '../../models/radix-api/deployments/component-type';

export interface ComponentListProps {
  components: Array<ComponentSummaryModel>;
}

export const ComponentList: FunctionComponent<ComponentListProps> = ({
  components,
}) => {
  const compMap = buildComponentMap(components);

  return (
    <>
      {Object.keys(compMap).map((type: ComponentType) =>
        compMap[type].map(({ name }) => (
          <Typography key={`${type}-${name}`}>
            {upperFirst(type)} <strong>{name}</strong>
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
