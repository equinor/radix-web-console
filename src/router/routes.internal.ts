import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router'

/**
 * One node in the route tree.
 */
export type RouteNode = {
  /**
   * Stable identifier for this route, used as the key in the final `routes` map.
   */
  readonly key: string
  /**
   * Relative URL segment (no leading slash).
   */
  readonly path: string
  /**
   * Component to render at this route. If the node has children, this will be a layout component; otherwise, a page component.
   */
  readonly Component?: ComponentType
  /**
   * Component to render at this route's exact URL when it has children.
   * This allows a layout route to also have a page at its own URL, instead of just rendering the first child.
   */
  readonly index?: ComponentType
  /**
   * Child routes, which will be rendered inside this route's `Component` if present.
   * Each child node's `path` is relative to this node's `path`.
   */
  readonly children?: readonly RouteNode[]
}

/**
 * Recursively collect every `key` (and descendants') from a tree.
 */
type TreeKeys<T> = T extends readonly (infer N)[]
  ? N extends { readonly key: infer K extends string }
    ? K | (N extends { readonly children: readonly RouteNode[] } ? TreeKeys<N['children']> : never)
    : never
  : never

export type RouteMap<Tree extends readonly RouteNode[], Statics extends Readonly<Record<string, string>>> = Record<
  TreeKeys<Tree> | keyof Statics,
  string
>

/**
 * Walk the tree, joining each node's relative `path` with its ancestors' to
 * produce an absolute URL. Combined with the caller's static routes into a
 * single `{ key: absolutePath }` map.
 */
export function buildPathMap<Tree extends readonly RouteNode[], Statics extends Readonly<Record<string, string>>>(
  tree: Tree,
  staticRoutes: Statics
): RouteMap<Tree, Statics> {
  const pathsByKey: Record<string, string> = { ...staticRoutes }
  collectAbsolutePaths(tree, '', pathsByKey)
  return pathsByKey as RouteMap<Tree, Statics>
}

/**
 * Helper for `buildPathMap` to recursively walk the tree and collect absolute paths.
 */
function collectAbsolutePaths(
  nodes: readonly RouteNode[],
  parentPath: string,
  pathsByKey: Record<string, string>
): void {
  for (const node of nodes) {
    const absolutePath = `${parentPath}/${node.path}`
    pathsByKey[node.key] = absolutePath
    if (node.children) collectAbsolutePaths(node.children, absolutePath, pathsByKey)
  }
}

/**
 * Convert the route tree into the array of `RouteObject`s consumed by
 * `createBrowserRouter`. `index` becomes an index child route; `children` are
 * recursed.
 */
export function buildRouteObjects(nodes: readonly RouteNode[]): RouteObject[] {
  return nodes.map((node) => {
    const childRoutes: RouteObject[] = []
    if (node.index) childRoutes.push({ index: true, Component: node.index })
    if (node.children) childRoutes.push(...buildRouteObjects(node.children))
    return {
      path: node.path,
      Component: node.Component,
      ...(childRoutes.length ? { children: childRoutes } : {}),
    }
  })
}
