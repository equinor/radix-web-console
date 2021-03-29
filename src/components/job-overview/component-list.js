import PropTypes from 'prop-types';
import React from 'react';
import ComponentItem from '../../models/component-summary';
import {
  getComponentMapByType,
  getComponentTypeLabel,
} from '../../models/component-type';

export const ComponentList = ({ components }) => {
  let componentMap = getComponentMapByType(components);
  return Object.keys(componentMap).map((compType) =>
    componentMap[compType].map((component) => (
      <p key={component.name}>
        {getComponentTypeLabel(compType)} <strong>{component.name}</strong>
      </p>
    ))
  );
};

ComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.shape(ComponentItem)).isRequired,
};

export default ComponentList;
