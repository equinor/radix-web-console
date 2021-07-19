import PropTypes from 'prop-types';
import React from 'react';
import ComponentItem from '../../models/component-summary';
import {
  buildComponentMap,
  buildComponentTypeLabelMap,
} from '../../models/component-type';

export const ComponentList = ({ components }) => {
  let compMap = buildComponentMap(components);
  return Object.keys(compMap).map((compType) =>
    compMap[compType].map((component) => (
      <p key={component.name}>
        {buildComponentTypeLabelMap(compType)} <strong>{component.name}</strong>
      </p>
    ))
  );
};

ComponentList.propTypes = {
  components: PropTypes.arrayOf(PropTypes.shape(ComponentItem)).isRequired,
};

export default ComponentList;
