import PropTypes from 'prop-types';

export default PropTypes.oneOf(['component', 'job']);

export const componentType = {
  component: 'component',
  job: 'job',
};

const componentTypeLabel = { component: 'Component', job: 'Job' };
const componentTypeLabelPlural = { component: 'Components', job: 'Jobs' };

export const buildComponentTypeLabelMap = (type) => {
  return componentTypeLabel['' + type];
};

export const buildComponentTypeLabelPluralMap = (type) => {
  return componentTypeLabelPlural['' + type];
};

export const buildComponentMap = (components) => {
  return components.reduce((componentMap, component) => {
    let key = component.type;
    componentMap[key] = componentMap[key] || [];
    componentMap[key].push(component);
    return componentMap;
  }, {});
};
