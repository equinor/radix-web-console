import PropTypes from 'prop-types';
import React from 'react';
import ComponentItem from '../../models/component-summary';
import {
  buildComponentMap,
  buildComponentTypeLabelMap,
} from '../../models/component-type';
import environmentModel from '../../models/environment';
import ComponentListItem from './component-list-item';

export const ComponentList = ({ appName, environment, components }) => {
  const compMap = buildComponentMap(components);
  return Object.keys(compMap).map((componentType) => (
    <section key={componentType}>
      <h2 className="o-heading-section">
        Active {buildComponentTypeLabelMap(componentType)}s
      </h2>
      <ComponentListItem
        appName={appName}
        environment={environment}
        components={compMap[componentType]}
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
