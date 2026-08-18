import type { Component } from '../store/radix-api'

export function buildComponentMap<T extends Component>(
  components: Readonly<Array<T>>
): { components: Array<T>; jobs: Array<T> } {
  const componentMap = components.reduce(
    (componentMap, component) => {
      const key = component.type
      ;(componentMap[key] = componentMap[key] ?? []).push(component)
      return componentMap
    },
    {} as Record<Component['type'], Array<T>>
  )
  return {
    components: componentMap.component ?? [],
    jobs: componentMap.job ?? [],
  }
}
