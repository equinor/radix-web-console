import PropTypes from 'prop-types';

export default PropTypes.oneOf(['component', 'job']);

const componentTypeLabel = { component: 'Component', job: 'Job' };

export const buildComponentTypeLabelMap = (type) => {
  return componentTypeLabel['' + type];
};

export const buildComponentMap = (components) => {
  return components.reduce((componentMap, component) => {
    let key = component.type;
    componentMap[key] = componentMap[key] || [];
    componentMap[key].push(component);
    return componentMap;
  }, {});
};
