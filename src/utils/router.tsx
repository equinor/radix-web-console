import { Attributes, ComponentType, FunctionComponent } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router';

import { RouteParams } from '../routes';
import { useParams } from 'react-router-dom';

type PartializeProps<T extends object, U = object> = T extends U
  ? Omit<T, keyof U> & Partial<Extract<T, U>>
  : T;

const ComponentLoaderDataWrapper = <T extends Attributes>({
  Component,
  ...props
}: Omit<T, keyof RouteParams> & {
  Component: ComponentType<T & RouteParams>;
}): React.JSX.Element => {
  const loaderData = useLoaderData() as RouteParams;
  return <Component {...({ ...loaderData, ...props } as unknown as T)} />;
};

/**
 * Connects RouteParameters prepared by a route loader to a component
 */
export function connectRouteParams<T extends object>(
  Component: ComponentType<T>
): FunctionComponent<PartializeProps<T, RouteParams>> {
  return (props) => <ComponentLoaderDataWrapper {...{ ...props, Component }} />;
}

/** Default RouteLoader function for handling loading RouteParameters */
export async function routeParamLoader({
  params,
}: LoaderFunctionArgs): Promise<RouteParams> {
  return params;
}

const WithParams = ({ Component }: { Component: FunctionComponent }) => {
  const params = useParams();
  return <Component {...params} />;
};
export const withRouteParams = (Component: FunctionComponent) => {
  return ({ ...props }) => <WithParams {...props} Component={Component} />;
};
