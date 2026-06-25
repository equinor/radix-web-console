import type { ComponentType } from 'react'

/**
 * One node in the route tree. Follows the structure of React Router route
 * objects with some custom properties.
 */
type RouteNode = {
  /**
   * Identifier for this route, used as the key in the final `routes` map.
   */
  readonly key: string
  /**
   * Relative URL segment (no leading slash).
   * Follows React Router path syntax, e.g. `:paramName` for dynamic segments.
   */
  readonly path: string
  /**
   * Component to render at this route. If the node has children, this will be a layout component. Otherwise, a page component.
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
  readonly children?: RouteTree
}

/**
 * Tree of route nodes, used to derive both the React Router config and the
 * `routes` map of absolute URL templates.
 */
export type RouteTree = readonly RouteNode[]

/**
 * Union of all `key` values found anywhere in a route tree (including descendants).
 */
type TreeKeys<Tree extends RouteTree> = KeyOf<Tree[number]> | ChildKeysOf<Tree[number]>
type KeyOf<Node> = Node extends { readonly key: infer K extends string } ? K : never
type ChildKeysOf<Node> = Node extends { readonly children: infer Children extends RouteTree }
  ? TreeKeys<Children>
  : never

export type StaticRoutes = Readonly<Record<string, string>>

/**
 * Final `{ key: absolutePath }` map produced by `buildPathMap`. Combines
 * every key in the tree with the caller's static routes.
 * Preserves the literal keys of the inputs.
 */
export type ResolvedRoutes<Tree extends RouteTree, Statics extends StaticRoutes> = Record<
  TreeKeys<Tree> | keyof Statics,
  string
>
