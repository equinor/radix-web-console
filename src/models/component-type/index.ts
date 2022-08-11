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
): Record<ComponentType, Array<ComponentModel>> =>
  (components ?? []).reduce((componentMap, component) => {
    const key = component.type;
    (componentMap[key] = componentMap[key] ?? []).push(component);
    return componentMap;
  }, {} as Record<ComponentType, Array<ComponentModel>>);
