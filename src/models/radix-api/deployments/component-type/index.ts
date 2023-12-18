import { Component, ComponentSummary } from '../../../../store/radix-api';

export enum ComponentType {
  component = 'component',
  job = 'job',
}

/* utility below, should be moved */
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
