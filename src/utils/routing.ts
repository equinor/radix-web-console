import {
  type ComponentClass,
  type FunctionComponent,
  type ReactElement,
  createElement,
} from 'react';
import { useParams } from 'react-router-dom';

import { routeWithParams } from './string';

import { routes } from '../routes';

/** Mark specific keys of an object optional */
type Optionalize<T extends object, K extends keyof T> = Omit<T, keyof T & K> &
  Partial<Pick<T, K>>;

/**
 * Maps route parameters as defined in react-router and injects them as
 * first-class props into a component. This avoids components being tightly
 * coupled with the prop structure returned by useParams()
 *
 * @example
 * // Inject "family", "genus", and "species" in a URL like
 * // "/fam/:family/g/:genus/sp/:species" as props of the same name into Component
 *
 * // array of prop(s)
 * mapRouteParamsToProps(['family', 'genus', 'species'], Component);
 * // ['propName']
 * // note that propName will have to match urlMapping
 *
 * // mapped object of prop(s)
 * mapRouteParamsToProps({ family: 'family', genus: null, type: 'species' }, Component);
 * // { propName: 'urlMapping' }
 * // note if the urlMapping is left blank or null, propName will be used
 *
 * @todo Support object (key => function) as paramsToMap (like mapStateToProps)
 *
 * @param {string[] | {}} propMap List or object mapping of URL parameters to inject as props
 * @param {function(*)} Component Component to receive props
 */
export function mapRouteParamsToProps<
  P extends {},
  M extends (keyof P)[] | { [K in keyof P]?: string },
>(
  propMap: M extends (infer K)[] ? [K?, ...K[]] : M,
  Component: FunctionComponent<P> | ComponentClass<P>
): (
  props: Optionalize<P, M extends (infer K)[] ? Extract<keyof P, K> : keyof M>
) => ReactElement<P> {
  return function (props) {
    const params = useParams<P>();
    const mappedProps = (
      Array.isArray(propMap) ? (propMap as Array<string>) : Object.keys(propMap)
    ).reduce<Partial<P>>(
      // @ts-expect-error I gave up typing this //todo
      (obj, key) => ({ ...obj, [key]: params[propMap[key] || key] }),
      {}
    );

    return createElement(Component, { ...mappedProps, ...props } as P);
  };
}

export function getAppUrl(appName: string): string {
  return routeWithParams(routes.app, {
    appName,
  });
}

export function getAppConfigUrl(appName: string): string {
  return routeWithParams(routes.appConfig, {
    appName,
  });
}

export function getAppDeploymentUrl(
  appName: string,
  deploymentName: string
): string {
  return routeWithParams(routes.appDeployment, {
    appName,
    deploymentName,
  });
}

export function getAppDeploymentsUrl(appName: string): string {
  return routeWithParams(routes.appDeployments, {
    appName,
  });
}

export function getAppJobsUrl(appName: string): string {
  return routeWithParams(routes.appJobs, {
    appName,
  });
}

export function getEnvUrl(appName: string, envName: string): string {
  return routeWithParams(routes.appEnvironment, {
    appName,
    envName,
  });
}

export function getEnvsUrl(appName: string): string {
  return routeWithParams(routes.appEnvironments, {
    appName,
  });
}

export function getActiveComponentUrl(
  appName: string,
  envName: string,
  componentName: string
): string {
  return routeWithParams(routes.appActiveComponent, {
    appName,
    envName,
    componentName,
  });
}

export function getActiveJobComponentUrl(
  appName: string,
  envName: string,
  jobComponentName: string
): string {
  return routeWithParams(routes.appActiveJobComponent, {
    appName,
    envName,
    jobComponentName,
  });
}

export function getOAuthReplicaUrl(
  appName: string,
  envName: string,
  componentName: string,
  replicaName: string,
  type?: 'oauth' | 'oauth-redis' | '""'
): string {
  const cleanedType = type && type.length > 0 ? type : 'oauth';
  return routeWithParams(routes.appOAuthAuxiliaryReplica, {
    appName,
    envName,
    componentName,
    replicaName,
    type: cleanedType,
  });
}

export function getReplicaUrl(
  appName: string,
  envName: string,
  componentName: string,
  replicaName: string
): string {
  return routeWithParams(routes.appReplica, {
    appName,
    envName,
    componentName,
    replicaName,
  });
}

export function getScheduledJobUrl(
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledJobName: string
): string {
  return routeWithParams(routes.appScheduledJob, {
    appName,
    envName,
    jobComponentName,
    scheduledJobName,
  });
}

export function getScheduledBatchJobUrl(
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledBatchName: string,
  scheduledJobName: string
): string {
  return routeWithParams(routes.appScheduledBatchJob, {
    appName,
    envName,
    jobComponentName,
    scheduledBatchName,
    scheduledJobName,
  });
}

export function getScheduledBatchUrl(
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledBatchName: string
): string {
  return routeWithParams(routes.appScheduledBatch, {
    appName,
    envName,
    jobComponentName,
    scheduledBatchName,
  });
}
