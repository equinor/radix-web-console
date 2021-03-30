import PropTypes from 'prop-types';
import React from 'react';
import ComponentItem from '../../models/component-summary';
import {
  getComponentMapByType,
  getComponentTypeLabel,
} from '../../models/component-type';
import environmentModel from '../../models/environment';
import ComponentListItem from './component-list-item';

export const ComponentList = ({ appName, environment, components }) => {
  let componentMap = getComponentMapByType(components);
  return Object.keys(componentMap).map((componentType) => (
    <section key={componentType}>
      <h2 className="o-heading-section">
        Active {getComponentTypeLabel(componentType)}s
      </h2>
      <ComponentListItem
        appName={appName}
        environment={environment}
        components={componentMap[componentType]}
      ></ComponentListItem>
    </section>
  ));
};

ComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(environmentModel),
  components: PropTypes.arrayOf(PropTypes.shape(ComponentItem)).isRequired,
};

export default ComponentList;
