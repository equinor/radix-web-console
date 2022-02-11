import React from 'react';
import { withRouter } from 'react-router';

import { routeWithParams } from './string';
import routes from '../routes';

/**
 * Maps route parameters as defined in react-router and injects them as
 * first-class props into a component. This avoids components being tightly
 * coupled with the prop structure returned by withRouter()
 *
 * @example
 * // Inject "family", "genus", and "species" in a URL like
 * // "/fam/:family/g/:genus/sp/:species" as props of the same name into MyComponent
 * mapRouteParamsToProps(['family', 'genus', 'species'], MyComponent);
 *
 * @todo Support object (key => string) as paramsToMap (rename params)
 * @todo Support object (key => function) as paramsToMap (like mapStateToProps)
 *
 * @param {string[]} paramsToMap List of URL parameters to inject as props
 * @param {function(*)} Component Component to receive props
 */
export function mapRouteParamsToProps(paramsToMap, Component) {
  return withRouter((props) => {
    const mappedProps = {};

    paramsToMap.forEach(
      (param) =>
        (mappedProps[param] =
          props.match && props.match.params
            ? props.match.params[param]
            : undefined)
    );

    return React.createElement(Component, { ...mappedProps, ...props });
  });
}

export const getAppUrl = (appName) =>
  routeWithParams(routes.app, {
    appName,
  });

export const getAppConfigUrl = (appName) =>
  routeWithParams(routes.appConfig, {
    appName,
  });

export const getAppDeploymentUrl = (appName, deploymentName) =>
  routeWithParams(routes.appDeployment, {
    appName,
    deploymentName,
  });

export const getAppDeploymentsUrl = (appName) =>
  routeWithParams(routes.appDeployments, {
    appName,
  });

export const getAppJobsUrl = (appName) =>
  routeWithParams(routes.appJobs, {
    appName,
  });

export const getEnvUrl = (appName, envName) =>
  routeWithParams(routes.appEnvironment, {
    appName,
    envName,
  });

export const getEnvsUrl = (appName) =>
  routeWithParams(routes.appEnvironments, {
    appName,
  });

export const getActiveComponentUrl = (appName, envName, componentName) =>
  routeWithParams(routes.appActiveComponent, {
    appName,
    envName,
    componentName,
  });

export const getActiveJobComponentUrl = (appName, envName, jobComponentName) =>
  routeWithParams(routes.appActiveJobComponent, {
    appName,
    envName,
    jobComponentName,
  });

export const getReplicaUrl = (appName, envName, componentName, replicaName) =>
  routeWithParams(routes.appReplica, {
    appName,
    envName,
    componentName,
    replicaName,
  });
export const getOAuthReplicaUrl = (
  appName,
  envName,
  componentName,
  replicaName
) =>
  routeWithParams(routes.appOAuthAuxiliaryReplica, {
    appName,
    envName,
    componentName,
    replicaName,
  });
export const getScheduledJobUrl = (
  appName,
  envName,
  jobComponentName,
  scheduledJobName
) =>
  routeWithParams(routes.appScheduledJob, {
    appName,
    envName,
    jobComponentName,
    scheduledJobName,
  });

export const getSecretUrl = (appName, envName, componentName, secretName) =>
  routeWithParams(routes.appSecret, {
    appName,
    envName,
    componentName,
    secretName,
  });

export const getPrivateImageHubUrl = (appName, imageHubName) =>
  routeWithParams(routes.appPrivateImageHub, {
    appName,
    imageHubName,
  });

export const getBuildSecretUrl = (appName, secretName) =>
  routeWithParams(routes.appBuildSecret, {
    appName,
    secretName,
  });
