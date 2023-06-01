import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { ComponentSummaryModelValidationMap } from '../../models/radix-api/deployments/component-summary';
import {
  buildComponentMap,
  buildComponentTypeLabel,
} from '../../models/radix-api/deployments/component-type';

export const ComponentList = ({ components }) => {
  const compMap = buildComponentMap(components);
  return Object.keys(compMap).map((compType) =>
    compMap[compType].map((component) => (
      <Typography key={component.name}>
        {buildComponentTypeLabel(compType)} <strong>{component.name}</strong>
      </Typography>
    ))
  );
};

ComponentList.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape(ComponentSummaryModelValidationMap)
  ).isRequired,
};

export default ComponentList;
