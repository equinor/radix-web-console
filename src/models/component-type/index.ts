import { upperFirst } from 'lodash';

export enum ComponentType {
  component = 'component',
  job = 'job',
}

export const buildComponentTypeLabelMap = (type: ComponentType) =>
  upperFirst(type);

export const buildComponentTypeLabelPluralMap = (type: ComponentType) =>
  `${buildComponentTypeLabelMap(type)}s`;

// TODO: type
export const buildComponentMap = (components) =>
  components.reduce((componentMap, component) => {
    const key = component.type;
    componentMap[key] = componentMap[key] || [];
    componentMap[key].push(component);
    return componentMap;
  }, {});
