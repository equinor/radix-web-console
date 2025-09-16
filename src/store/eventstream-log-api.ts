export function getReplicaLogStreamUrl(appName: string, envName: string, componentName: string, podName: string) {
  return `/api/v1/applications/${appName}/environments/${envName}/components/${componentName}/replicas/${podName}/logs?follow=true&lines=100`
}

export function getOauthAuxiliaryLogStreamUrl(
  appName: string,
  envName: string,
  componentName: string,
  auxType: 'oauth' | 'oauth-redis',
  podName: string
) {
  return `/api/v1/applications/${appName}/environments/${envName}/components/${componentName}/aux/${auxType}/replicas/${podName}/logs?follow=true&lines=1000`
}

export function getJobContainerLogStreamUrl(
  appName: string,
  pipelineJobName: string,
  replicaName: string,
  containerId: string
) {
  return `/api/v1/applications/${appName}/pipelinejobs/${pipelineJobName}/replicas/${replicaName}/containers/${containerId}/log?follow=true&lines=1000`
}

export function getPipelineJobStepLogsStreamUrl(appName: string, jobName: string, stepName: string) {
  return `/api/v1/applications/${appName}/jobs/${jobName}/logs/${stepName}?follow=true&lines=1000`
}

export function getTektonPipelineRunTaskStepLogsStreamUrl(
  appName: string,
  jobName: string,
  pipelineRunName: string,
  taskName: string,
  stepName: string
) {
  return `/api/v1/applications/${appName}/jobs/${jobName}/pipelineruns/${pipelineRunName}/tasks/${taskName}/logs/${stepName}?follow=true&lines=1000`
}

export function getJobLogStreamUrl(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string,
  replicaName: string
) {
  return `/api/v1/applications/${appName}/environments/${envName}/jobcomponents/${jobComponentName}/jobs/${jobName}/log?replicaName=${replicaName}&follow=true&lines=1000`
}

export function getScheduledJobLogStreamUrl(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string,
  replicaName?: string
) {
  return `/api/v1/applications/${appName}/environments/${envName}/jobcomponents/${jobComponentName}/scheduledjobs/${jobName}/logs?follow=true&lines=1000${replicaName ? `&replicaName=${replicaName}` : ''}`
}
