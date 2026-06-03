import { createBrowserRouter, Navigate } from "react-router";
import PageLayoutRoot from "../pages/page-root";
import { routes, routeTree } from "./routes";
import { buildRouteObjects } from "./routes.internal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PageLayoutRoot,
    children: [
      { index: true, element: <Navigate to={routes.apps} replace /> },
      ...buildRouteObjects(routeTree),
      { path: "*", element: <Navigate to={routes.apps} replace /> },
    ],
  },
]);
