import { createBrowserRouter, Navigate } from 'react-router'
import RootLayout from '../layouts/root/RootLayout'
import { routes, routeTree } from './routes'
import { buildRouteObjects } from './routes.utils'

export const router = createBrowserRouter([
  {
    path: routes.home,
    Component: RootLayout,
    children: [
      { index: true, element: <Navigate to={routes.apps} replace /> },
      ...buildRouteObjects(routeTree),
      { path: '*', element: <Navigate to={routes.apps} replace /> },
    ],
  },
])
