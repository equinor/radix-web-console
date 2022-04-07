import { Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';

import ComponentItem from '../../models/component-summary';
import {
  buildComponentMap,
  buildComponentTypeLabel,
} from '../../models/component-type';

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
  components: PropTypes.arrayOf(PropTypes.shape(ComponentItem)).isRequired,
};

export default ComponentList;
