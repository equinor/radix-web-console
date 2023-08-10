import {
  ComponentClass,
  createElement,
  FunctionComponent,
  ReactElement,
} from 'react';
import { useParams } from 'react-router-dom';

import { routeWithParams } from './string';

import { routes } from '../routes';

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
 * // ['${propName}']
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
  S = {},
>(
  propMap: M,
  Component: FunctionComponent<P> | ComponentClass<P, S>
): (
  props: Pick<P, Exclude<keyof P, M extends (keyof P)[] ? keyof P : keyof M>>
) => ReactElement<P> {
  return function (props) {
    const params = useParams<P>();
    const mappedProps = (
      Array.isArray(propMap) ? (propMap as Array<string>) : Object.keys(propMap)
    ).reduce<Partial<P>>(
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

export function getOAuthReplicaUrl(
  appName: string,
  envName: string,
  componentName: string,
  replicaName: string
): string {
  return routeWithParams(routes.appOAuthAuxiliaryReplica, {
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

export function getSecretUrl(
  appName: string,
  envName: string,
  componentName: string,
  secretName: string
): string {
  return routeWithParams(routes.appSecret, {
    appName,
    envName,
    componentName,
    secretName,
  });
}

export function getPrivateImageHubUrl(
  appName: string,
  imageHubName: string
): string {
  return routeWithParams(routes.appPrivateImageHub, {
    appName,
    imageHubName,
  });
}

export function getBuildSecretUrl(appName: string, secretName: string): string {
  return routeWithParams(routes.appBuildSecret, {
    appName,
    secretName,
  });
}
