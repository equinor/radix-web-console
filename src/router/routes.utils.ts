import type { RouteObject } from 'react-router'
import type { ResolvedRoutes, RouteTree, StaticRoutes } from './router.types'

/**
 * Builds the absolute URL for every route by joining each node's path with
 * its parents'. Returns a single map combining tree routes and static routes,
 * keyed by their `key` property.
 *
 * Why the generics: they preserve the literal keys of the inputs.
 *   routes.appConfig  // OK since 'appConfig' is a key in the tree or static routes
 *   routes.typo       // Compile error — property does not exist as a key in the tree or static routes
 *
 * Without them, the return type collapses to `Record<string, string>` and
 * any property access compiles.
 */
export function buildPathMap<Tree extends RouteTree, Statics extends StaticRoutes>(
  tree: Tree,
  staticRoutes: Statics
): ResolvedRoutes<Tree, Statics> {
  const pathsByKey: Record<string, string> = { ...staticRoutes }
  collectAbsolutePaths(tree, '', pathsByKey)

  return pathsByKey as ResolvedRoutes<Tree, Statics>
}

/**
 * Helper for `buildPathMap` to recursively walk the tree and collect absolute paths.
 */
function collectAbsolutePaths(nodes: RouteTree, parentPath: string, pathsByKey: Record<string, string>): void {
  for (const node of nodes) {
    const absolutePath = `${parentPath}/${node.path}`
    pathsByKey[node.key] = absolutePath

    if (node.children) collectAbsolutePaths(node.children, absolutePath, pathsByKey)
  }
}

/**
 * Convert the route tree into the array of `RouteObject`s consumed by `createBrowserRouter`.
 */
export function buildRouteObjects(nodes: RouteTree): RouteObject[] {
  return nodes.map((node) => {
    const childRoutes: RouteObject[] = []

    if (node.index) {
      childRoutes.push({ index: true, Component: node.index })
    }
    if (node.children) {
      childRoutes.push(...buildRouteObjects(node.children))
    }

    return {
      path: node.path,
      Component: node.Component,
      children: childRoutes.length ? childRoutes : undefined,
    }
  })
}
