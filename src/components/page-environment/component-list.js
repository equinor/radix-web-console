import PropTypes from 'prop-types';
import React from 'react';
import ComponentItem from '../../models/component-summary';
import {
  getComponentMapByType,
  getComponentTypeLabel,
} from '../../models/component-type';
import environmentModel from '../../models/environment';

export const ComponentList = ({ appName, environment, components }) => {
  let componentMap = getComponentMapByType(components);
  return Object.keys(componentMap).map((componentType) => {
    console.log(componentType);
    <h2>Active s</h2>;
    // <h2>Active {getComponentTypeLabel(componentType)}s</h2>;
    // return (
    //   <ComponentListItem
    //     appName={appName}
    //     environment={environment}
    //     components={componentMap[compType]}
    //   ></ComponentListItem>
    // );
  });
};

ComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(environmentModel),
  components: PropTypes.arrayOf(PropTypes.shape(ComponentItem)).isRequired,
};

export default ComponentList;
