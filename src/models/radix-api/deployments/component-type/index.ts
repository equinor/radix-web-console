import { upperFirst } from 'lodash';

import { Component, ComponentSummary } from '../../../../store/radix-api';

export enum ComponentType {
  component = 'component',
  job = 'job',
}

/* utilities below, should be moved */
export function buildComponentTypeLabel(
  type: (Component | ComponentSummary)['type'] | string
): string {
  return upperFirst(type);
}

export function buildComponentTypeLabelPlural(
  type: (Component | ComponentSummary)['type'] | string
): string {
  return `${buildComponentTypeLabel(type)}s`;
}

export function buildComponentMap<T extends Component | ComponentSummary>(
  components: Readonly<Array<T>>
): Record<(Component | ComponentSummary)['type'], Array<T>> {
  return (components ?? []).reduce(
    (componentMap, component) => {
      const key = component.type;
      (componentMap[key] = componentMap[key] ?? []).push(component);
      return componentMap;
    },
    {} as Record<(Component | ComponentSummary)['type'], Array<T>>
  );
}
