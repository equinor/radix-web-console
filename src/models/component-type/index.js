import PropTypes from 'prop-types';

export default PropTypes.oneOf(['component', 'job']);

const componentTypeLabel = { component: 'Component', job: 'Job' };

export const getComponentTypeLabel = function (type) {
  return componentTypeLabel['' + type];
};

export const getComponentMapByType = (components) => {
  return components.reduce((componentMap, component) => {
    let key = component.type;
    componentMap[key] = componentMap[key] || [];
    componentMap[key].push(component);
    return componentMap;
  }, {});
};
