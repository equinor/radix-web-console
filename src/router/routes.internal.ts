import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router'

/**
 * One node in the route tree.
 *
 * - `path`        — relative URL segment (no leading slash).
 * - `Component`   — rendered for this route. If `children` exist, this acts
 *                   as the layout (must contain an `<Outlet />`).
 * - `index`       — page rendered at this route's exact URL when it has
 *                   children. Mounted as `{ index: true, Component: index }`.
 * - `key`         — stable identifier exposed via the `routes` map so that
 *                   consumers can do `routes.appConfig` etc.
 */
export type RouteNode = {
  readonly key: string
  readonly path: string
  readonly Component?: ComponentType
  readonly index?: ComponentType
  readonly children?: readonly RouteNode[]
}

/** Recursively collect every `key` (and descendants') from a tree. */
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
  statics: Statics
): RouteMap<Tree, Statics> {
  const out: Record<string, string> = { ...statics }
  walk(tree, '', out)
  return out as RouteMap<Tree, Statics>
}

function walk(nodes: readonly RouteNode[], parent: string, out: Record<string, string>): void {
  for (const n of nodes) {
    const absolute = `${parent}/${n.path}`
    out[n.key] = absolute
    if (n.children) walk(n.children, absolute, out)
  }
}

/**
 * Convert the route tree into the array of `RouteObject`s consumed by
 * `createBrowserRouter`. `index` becomes an index child route; `children` are
 * recursed.
 */
export function buildRouteObjects(nodes: readonly RouteNode[]): RouteObject[] {
  return nodes.map((n) => {
    const children: RouteObject[] = []
    if (n.index) children.push({ index: true, Component: n.index })
    if (n.children) children.push(...buildRouteObjects(n.children))
    return {
      path: n.path,
      Component: n.Component,
      ...(children.length ? { children } : {}),
    }
  })
}
