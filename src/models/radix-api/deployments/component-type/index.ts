import { upperFirst } from 'lodash';

import { ComponentModel } from '../component';
import { ComponentSummaryModel } from '../component-summary';

export enum ComponentType {
  component = 'component',
  job = 'job',
}

export function buildComponentTypeLabel(type: ComponentType | string): string {
  return upperFirst(type);
}

export function buildComponentTypeLabelPlural(
  type: ComponentType | string
): string {
  return `${buildComponentTypeLabel(type)}s`;
}

export function buildComponentMap<
  T extends ComponentModel | ComponentSummaryModel,
>(components: Array<T>): Record<ComponentType, Array<T>> {
  return (components ?? []).reduce(
    (componentMap, component) => {
      const key = component.type;
      (componentMap[key] = componentMap[key] ?? []).push(component);
      return componentMap;
    },
    {} as Record<ComponentType, Array<T>>
  );
}
