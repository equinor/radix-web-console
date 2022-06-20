import { upperFirst } from 'lodash';

import { ComponentModel } from '../component';

export enum ComponentType {
  component = 'component',
  job = 'job',
}

export const buildComponentTypeLabel = (type: ComponentType | string) =>
  upperFirst(type);

export const buildComponentTypeLabelPlural = (type: ComponentType | string) =>
  `${buildComponentTypeLabel(type)}s`;

export const buildComponentMap = (
  components: Array<ComponentModel>
): { [key: string]: Array<ComponentModel> } =>
  (components || []).reduce<{ [key: string]: Array<ComponentModel> }>(
    (componentMap, component) => {
      const key = component.type;
      componentMap[key] = componentMap[key] || [];
      componentMap[key].push(component);
      return componentMap;
    },
    {}
  );
