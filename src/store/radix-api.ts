import { radixStoreApi as api } from './configs/index';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    showApplications: build.query<
      ShowApplicationsApiResponse,
      ShowApplicationsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: { sshRepo: queryArg.sshRepo },
      }),
    }),
    registerApplication: build.mutation<
      RegisterApplicationApiResponse,
      RegisterApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/applications`,
        method: 'POST',
        body: queryArg.applicationRegistrationRequest,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getSearchApplications: build.query<
      GetSearchApplicationsApiResponse,
      GetSearchApplicationsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/_search`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: {
          apps: queryArg.apps,
          includeLatestJobSummary: queryArg.includeLatestJobSummary,
          includeEnvironmentActiveComponents:
            queryArg.includeEnvironmentActiveComponents,
        },
      }),
    }),
    searchApplications: build.mutation<
      SearchApplicationsApiResponse,
      SearchApplicationsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/_search`,
        method: 'POST',
        body: queryArg.applicationsSearchRequest,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getApplication: build.query<
      GetApplicationApiResponse,
      GetApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    changeRegistrationDetails: build.mutation<
      ChangeRegistrationDetailsApiResponse,
      ChangeRegistrationDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}`,
        method: 'PUT',
        body: queryArg.applicationRegistrationRequest,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    deleteApplication: build.mutation<
      DeleteApplicationApiResponse,
      DeleteApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}`,
        method: 'DELETE',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    modifyRegistrationDetails: build.mutation<
      ModifyRegistrationDetailsApiResponse,
      ModifyRegistrationDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}`,
        method: 'PATCH',
        body: queryArg.applicationRegistrationPatchRequest,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getApplicationAlertingConfig: build.query<
      GetApplicationAlertingConfigApiResponse,
      GetApplicationAlertingConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/alerting`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    updateApplicationAlertingConfig: build.mutation<
      UpdateApplicationAlertingConfigApiResponse,
      UpdateApplicationAlertingConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/alerting`,
        method: 'PUT',
        body: queryArg.updateAlertingConfig,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    disableApplicationAlerting: build.mutation<
      DisableApplicationAlertingApiResponse,
      DisableApplicationAlertingApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/alerting/disable`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    enableApplicationAlerting: build.mutation<
      EnableApplicationAlertingApiResponse,
      EnableApplicationAlertingApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/alerting/enable`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getBuildSecrets: build.query<
      GetBuildSecretsApiResponse,
      GetBuildSecretsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/buildsecrets`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    updateBuildSecretsSecretValue: build.mutation<
      UpdateBuildSecretsSecretValueApiResponse,
      UpdateBuildSecretsSecretValueApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/buildsecrets/${queryArg.secretName}`,
        method: 'PUT',
        body: queryArg.secretParameters,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getDeployKeyAndSecret: build.query<
      GetDeployKeyAndSecretApiResponse,
      GetDeployKeyAndSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/deploy-key-and-secret`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    isDeployKeyValid: build.query<
      IsDeployKeyValidApiResponse,
      IsDeployKeyValidApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/deploykey-valid`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getDeployments: build.query<
      GetDeploymentsApiResponse,
      GetDeploymentsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/deployments`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: { environment: queryArg.environment, latest: queryArg.latest },
      }),
    }),
    getDeployment: build.query<GetDeploymentApiResponse, GetDeploymentApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/deployments/${queryArg.deploymentName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    components: build.query<ComponentsApiResponse, ComponentsApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/deployments/${queryArg.deploymentName}/components`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    log: build.query<LogApiResponse, LogApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/deployments/${queryArg.deploymentName}/components/${queryArg.componentName}/replicas/${queryArg.podName}/logs`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: {
          sinceTime: queryArg.sinceTime,
          lines: queryArg.lines,
          file: queryArg.file,
          previous: queryArg.previous,
        },
      }),
    }),
    getEnvironmentSummary: build.query<
      GetEnvironmentSummaryApiResponse,
      GetEnvironmentSummaryApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getEnvironment: build.query<
      GetEnvironmentApiResponse,
      GetEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    createEnvironment: build.mutation<
      CreateEnvironmentApiResponse,
      CreateEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    deleteEnvironment: build.mutation<
      DeleteEnvironmentApiResponse,
      DeleteEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}`,
        method: 'DELETE',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getEnvironmentAlertingConfig: build.query<
      GetEnvironmentAlertingConfigApiResponse,
      GetEnvironmentAlertingConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/alerting`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    updateEnvironmentAlertingConfig: build.mutation<
      UpdateEnvironmentAlertingConfigApiResponse,
      UpdateEnvironmentAlertingConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/alerting`,
        method: 'PUT',
        body: queryArg.updateAlertingConfig,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    disableEnvironmentAlerting: build.mutation<
      DisableEnvironmentAlertingApiResponse,
      DisableEnvironmentAlertingApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/alerting/disable`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    enableEnvironmentAlerting: build.mutation<
      EnableEnvironmentAlertingApiResponse,
      EnableEnvironmentAlertingApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/alerting/enable`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getBuildStatus: build.query<
      GetBuildStatusApiResponse,
      GetBuildStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/buildstatus`,
        params: { pipeline: queryArg.pipeline },
      }),
    }),
    getOAuthPodLog: build.query<
      GetOAuthPodLogApiResponse,
      GetOAuthPodLogApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/aux/oauth/replicas/${queryArg.podName}/logs`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: {
          sinceTime: queryArg.sinceTime,
          lines: queryArg.lines,
          file: queryArg.file,
        },
      }),
    }),
    restartOAuthAuxiliaryResource: build.mutation<
      RestartOAuthAuxiliaryResourceApiResponse,
      RestartOAuthAuxiliaryResourceApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/aux/oauth/restart`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    envVars: build.query<EnvVarsApiResponse, EnvVarsApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/envvars`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    changeEnvVar: build.mutation<ChangeEnvVarApiResponse, ChangeEnvVarApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/envvars`,
        method: 'PATCH',
        body: queryArg.body,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    setComponentExternalDnstls: build.mutation<
      SetComponentExternalDnstlsApiResponse,
      SetComponentExternalDnstlsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/externaldns/${queryArg.fqdn}/tls`,
        method: 'PUT',
        body: queryArg.setExternalDnstlsRequest,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    replicaLog: build.query<ReplicaLogApiResponse, ReplicaLogApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/replicas/${queryArg.podName}/logs`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: {
          sinceTime: queryArg.sinceTime,
          lines: queryArg.lines,
          file: queryArg.file,
          previous: queryArg.previous,
        },
      }),
    }),
    restartComponent: build.mutation<
      RestartComponentApiResponse,
      RestartComponentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/restart`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    scaleComponent: build.mutation<
      ScaleComponentApiResponse,
      ScaleComponentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/scale/${queryArg.replicas}`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getAzureKeyVaultSecretVersions: build.query<
      GetAzureKeyVaultSecretVersionsApiResponse,
      GetAzureKeyVaultSecretVersionsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/secrets/azure/keyvault/${queryArg.azureKeyVaultName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: { secretName: queryArg.secretName },
      }),
    }),
    changeComponentSecret: build.mutation<
      ChangeComponentSecretApiResponse,
      ChangeComponentSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/secrets/${queryArg.secretName}`,
        method: 'PUT',
        body: queryArg.secretParameters,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    startComponent: build.mutation<
      StartComponentApiResponse,
      StartComponentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/start`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    stopComponent: build.mutation<
      StopComponentApiResponse,
      StopComponentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/components/${queryArg.componentName}/stop`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getApplicationEnvironmentDeployments: build.query<
      GetApplicationEnvironmentDeploymentsApiResponse,
      GetApplicationEnvironmentDeploymentsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/deployments`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: { latest: queryArg.latest },
      }),
    }),
    getEnvironmentEvents: build.query<
      GetEnvironmentEventsApiResponse,
      GetEnvironmentEventsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/events`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getBatches: build.query<GetBatchesApiResponse, GetBatchesApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/batches`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getBatch: build.query<GetBatchApiResponse, GetBatchApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/batches/${queryArg.batchName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    deleteBatch: build.mutation<DeleteBatchApiResponse, DeleteBatchApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/batches/${queryArg.batchName}`,
        method: 'DELETE',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    copyBatch: build.mutation<CopyBatchApiResponse, CopyBatchApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/batches/${queryArg.batchName}/copy`,
        method: 'POST',
        body: queryArg.scheduledBatchRequest,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    restartBatch: build.mutation<RestartBatchApiResponse, RestartBatchApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/batches/${queryArg.batchName}/restart`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    stopBatch: build.mutation<StopBatchApiResponse, StopBatchApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/batches/${queryArg.batchName}/stop`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getJobComponentDeployments: build.query<
      GetJobComponentDeploymentsApiResponse,
      GetJobComponentDeploymentsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/deployments`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getJobs: build.query<GetJobsApiResponse, GetJobsApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getJob: build.query<GetJobApiResponse, GetJobApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    deleteJob: build.mutation<DeleteJobApiResponse, DeleteJobApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}`,
        method: 'DELETE',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    copyJob: build.mutation<CopyJobApiResponse, CopyJobApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}/copy`,
        method: 'POST',
        body: queryArg.scheduledJobRequest,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getJobPayload: build.query<GetJobPayloadApiResponse, GetJobPayloadApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}/payload`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    restartJob: build.mutation<RestartJobApiResponse, RestartJobApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}/restart`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    stopJob: build.mutation<StopJobApiResponse, StopJobApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/jobs/${queryArg.jobName}/stop`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    jobLog: build.query<JobLogApiResponse, JobLogApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/jobcomponents/${queryArg.jobComponentName}/scheduledjobs/${queryArg.scheduledJobName}/logs`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: {
          sinceTime: queryArg.sinceTime,
          lines: queryArg.lines,
          file: queryArg.file,
        },
      }),
    }),
    restartEnvironment: build.mutation<
      RestartEnvironmentApiResponse,
      RestartEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/restart`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    startEnvironment: build.mutation<
      StartEnvironmentApiResponse,
      StartEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/start`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    stopEnvironment: build.mutation<
      StopEnvironmentApiResponse,
      StopEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/environments/${queryArg.envName}/stop`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getApplicationJobs: build.query<
      GetApplicationJobsApiResponse,
      GetApplicationJobsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getApplicationJob: build.query<
      GetApplicationJobApiResponse,
      GetApplicationJobApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getPipelineJobStepLogs: build.query<
      GetPipelineJobStepLogsApiResponse,
      GetPipelineJobStepLogsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}/logs/${queryArg.stepName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: {
          sinceTime: queryArg.sinceTime,
          lines: queryArg.lines,
          file: queryArg.file,
        },
      }),
    }),
    getTektonPipelineRuns: build.query<
      GetTektonPipelineRunsApiResponse,
      GetTektonPipelineRunsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}/pipelineruns`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getTektonPipelineRun: build.query<
      GetTektonPipelineRunApiResponse,
      GetTektonPipelineRunApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}/pipelineruns/${queryArg.pipelineRunName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getTektonPipelineRunTasks: build.query<
      GetTektonPipelineRunTasksApiResponse,
      GetTektonPipelineRunTasksApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}/pipelineruns/${queryArg.pipelineRunName}/tasks`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getTektonPipelineRunTask: build.query<
      GetTektonPipelineRunTaskApiResponse,
      GetTektonPipelineRunTaskApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}/pipelineruns/${queryArg.pipelineRunName}/tasks/${queryArg.taskName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getTektonPipelineRunTaskStepLogs: build.query<
      GetTektonPipelineRunTaskStepLogsApiResponse,
      GetTektonPipelineRunTaskStepLogsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}/pipelineruns/${queryArg.pipelineRunName}/tasks/${queryArg.taskName}/logs/${queryArg.stepName}`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
        params: {
          sinceTime: queryArg.sinceTime,
          lines: queryArg.lines,
          file: queryArg.file,
        },
      }),
    }),
    getTektonPipelineRunTaskSteps: build.query<
      GetTektonPipelineRunTaskStepsApiResponse,
      GetTektonPipelineRunTaskStepsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}/pipelineruns/${queryArg.pipelineRunName}/tasks/${queryArg.taskName}/steps`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    rerunApplicationJob: build.mutation<
      RerunApplicationJobApiResponse,
      RerunApplicationJobApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}/rerun`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    stopApplicationJob: build.mutation<
      StopApplicationJobApiResponse,
      StopApplicationJobApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/jobs/${queryArg.jobName}/stop`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    listPipelines: build.query<ListPipelinesApiResponse, ListPipelinesApiArg>({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/pipelines`,
      }),
    }),
    triggerPipelineBuild: build.mutation<
      TriggerPipelineBuildApiResponse,
      TriggerPipelineBuildApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/pipelines/build`,
        method: 'POST',
        body: queryArg.pipelineParametersBuild,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    triggerPipelineBuildDeploy: build.mutation<
      TriggerPipelineBuildDeployApiResponse,
      TriggerPipelineBuildDeployApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/pipelines/build-deploy`,
        method: 'POST',
        body: queryArg.pipelineParametersBuild,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    triggerPipelineDeploy: build.mutation<
      TriggerPipelineDeployApiResponse,
      TriggerPipelineDeployApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/pipelines/deploy`,
        method: 'POST',
        body: queryArg.pipelineParametersDeploy,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    triggerPipelinePromote: build.mutation<
      TriggerPipelinePromoteApiResponse,
      TriggerPipelinePromoteApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/pipelines/promote`,
        method: 'POST',
        body: queryArg.pipelineParametersPromote,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    getPrivateImageHubs: build.query<
      GetPrivateImageHubsApiResponse,
      GetPrivateImageHubsApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/privateimagehubs`,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    updatePrivateImageHubsSecretValue: build.mutation<
      UpdatePrivateImageHubsSecretValueApiResponse,
      UpdatePrivateImageHubsSecretValueApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/privateimagehubs/${queryArg.serverName}`,
        method: 'PUT',
        body: queryArg.secretParameters,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    regenerateDeployKey: build.mutation<
      RegenerateDeployKeyApiResponse,
      RegenerateDeployKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/regenerate-deploy-key`,
        method: 'POST',
        body: queryArg.regenerateDeployKeyAndSecretData,
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    restartApplication: build.mutation<
      RestartApplicationApiResponse,
      RestartApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/restart`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    startApplication: build.mutation<
      StartApplicationApiResponse,
      StartApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/start`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
    stopApplication: build.mutation<
      StopApplicationApiResponse,
      StopApplicationApiArg
    >({
      query: (queryArg) => ({
        url: `/applications/${queryArg.appName}/stop`,
        method: 'POST',
        headers: {
          'Impersonate-User': queryArg['Impersonate-User'],
          'Impersonate-Group': queryArg['Impersonate-Group'],
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as radixApi };
export type ShowApplicationsApiResponse =
  /** status 200 Successful operation */ ApplicationSummary[];
export type ShowApplicationsApiArg = {
  /** ssh repo to identify Radix application if exists */
  sshRepo?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type RegisterApplicationApiResponse =
  /** status 200 Application registration operation details */ ApplicationRegistrationUpsertResponse;
export type RegisterApplicationApiArg = {
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Request for an Application to register */
  applicationRegistrationRequest: ApplicationRegistrationRequest;
};
export type GetSearchApplicationsApiResponse =
  /** status 200 Successful operation */ ApplicationSummary[];
export type GetSearchApplicationsApiArg = {
  /** Comma separated list of application names to search for */
  apps: string;
  /** true to include LatestJobSummary */
  includeLatestJobSummary?: string;
  /** true to include ActiveComponents in Environments */
  includeEnvironmentActiveComponents?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type SearchApplicationsApiResponse =
  /** status 200 Successful operation */ ApplicationSummary[];
export type SearchApplicationsApiArg = {
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** List of application names to search for */
  applicationsSearchRequest: ApplicationsSearchRequest;
};
export type GetApplicationApiResponse =
  /** status 200 Successful get application */ Application;
export type GetApplicationApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type ChangeRegistrationDetailsApiResponse =
  /** status 200 Change registration operation result */ ApplicationRegistrationUpsertResponse;
export type ChangeRegistrationDetailsApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** request for Application to change */
  applicationRegistrationRequest: ApplicationRegistrationRequest;
};
export type DeleteApplicationApiResponse = unknown;
export type DeleteApplicationApiArg = {
  /** name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type ModifyRegistrationDetailsApiResponse =
  /** status 200 Modifying registration operation details */ ApplicationRegistrationUpsertResponse;
export type ModifyRegistrationDetailsApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Request for Application to patch */
  applicationRegistrationPatchRequest: ApplicationRegistrationPatchRequest;
};
export type GetApplicationAlertingConfigApiResponse =
  /** status 200 Successful get alerts config */ AlertingConfig;
export type GetApplicationAlertingConfigApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type UpdateApplicationAlertingConfigApiResponse =
  /** status 200 Successful alerts config update */ AlertingConfig;
export type UpdateApplicationAlertingConfigApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Alerts configuration */
  updateAlertingConfig: UpdateAlertingConfig;
};
export type DisableApplicationAlertingApiResponse =
  /** status 200 Successful disable alerting */ AlertingConfig;
export type DisableApplicationAlertingApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type EnableApplicationAlertingApiResponse =
  /** status 200 Successful enable alerting */ AlertingConfig;
export type EnableApplicationAlertingApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetBuildSecretsApiResponse =
  /** status 200 Successful operation */ BuildSecret[];
export type GetBuildSecretsApiArg = {
  /** name of Radix application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type UpdateBuildSecretsSecretValueApiResponse = unknown;
export type UpdateBuildSecretsSecretValueApiArg = {
  /** Name of application */
  appName: string;
  /** name of secret */
  secretName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** New secret value */
  secretParameters: SecretParameters;
};
export type GetDeployKeyAndSecretApiResponse =
  /** status 200 Successful get deploy key and secret */ DeployKeyAndSecret;
export type GetDeployKeyAndSecretApiArg = {
  /** name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type IsDeployKeyValidApiResponse = unknown;
export type IsDeployKeyValidApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetDeploymentsApiResponse =
  /** status 200 Successful operation */ DeploymentSummary[];
export type GetDeploymentsApiArg = {
  /** name of Radix application */
  appName: string;
  /** environment of Radix application */
  environment?: string;
  /** indicator to allow only listing latest */
  latest?: boolean;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetDeploymentApiResponse =
  /** status 200 Successful get deployment */ Deployment;
export type GetDeploymentApiArg = {
  /** name of Radix application */
  appName: string;
  /** name of deployment */
  deploymentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type ComponentsApiResponse = /** status 200 pod log */ Component[];
export type ComponentsApiArg = {
  /** Name of application */
  appName: string;
  /** Name of deployment */
  deploymentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type LogApiResponse = /** status 200 pod log */ string;
export type LogApiArg = {
  /** Name of application */
  appName: string;
  /** Name of deployment */
  deploymentName: string;
  /** Name of component */
  componentName: string;
  /** Name of pod */
  podName: string;
  /** Get log only from sinceTime (example 2020-03-18T07:20:41+00:00) */
  sinceTime?: string;
  /** Get log lines (example 1000) */
  lines?: string;
  /** Get log as a file if true */
  file?: string;
  /** Get previous container log if true */
  previous?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetEnvironmentSummaryApiResponse =
  /** status 200 Successful operation */ EnvironmentSummary[];
export type GetEnvironmentSummaryApiArg = {
  /** name of Radix application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetEnvironmentApiResponse =
  /** status 200 Successful get environment */ Environment;
export type GetEnvironmentApiArg = {
  /** name of Radix application */
  appName: string;
  /** name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type CreateEnvironmentApiResponse = unknown;
export type CreateEnvironmentApiArg = {
  /** name of Radix application */
  appName: string;
  /** name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type DeleteEnvironmentApiResponse = unknown;
export type DeleteEnvironmentApiArg = {
  /** name of Radix application */
  appName: string;
  /** name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetEnvironmentAlertingConfigApiResponse =
  /** status 200 Successful get alerts config */ AlertingConfig;
export type GetEnvironmentAlertingConfigApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type UpdateEnvironmentAlertingConfigApiResponse =
  /** status 200 Successful alerts config update */ AlertingConfig;
export type UpdateEnvironmentAlertingConfigApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Alerts configuration */
  updateAlertingConfig: UpdateAlertingConfig;
};
export type DisableEnvironmentAlertingApiResponse =
  /** status 200 Successful disable alerting */ AlertingConfig;
export type DisableEnvironmentAlertingApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type EnableEnvironmentAlertingApiResponse =
  /** status 200 Successful enable alerting */ AlertingConfig;
export type EnableEnvironmentAlertingApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetBuildStatusApiResponse = unknown;
export type GetBuildStatusApiArg = {
  /** name of Radix application */
  appName: string;
  /** name of the environment */
  envName: string;
  /** Type of pipeline job to get status for. */
  pipeline?: 'build-deploy' | 'deploy' | 'promote';
};
export type GetOAuthPodLogApiResponse = /** status 200 pod log */ string;
export type GetOAuthPodLogApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of component */
  componentName: string;
  /** Name of pod */
  podName: string;
  /** Get log only from sinceTime (example 2020-03-18T07:20:41+00:00) */
  sinceTime?: string;
  /** Get log lines (example 1000) */
  lines?: string;
  /** Get log as a file if true */
  file?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type RestartOAuthAuxiliaryResourceApiResponse = unknown;
export type RestartOAuthAuxiliaryResourceApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of component */
  componentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type EnvVarsApiResponse =
  /** status 200 environment variables */ EnvVar[];
export type EnvVarsApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of component */
  componentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type ChangeEnvVarApiResponse = unknown;
export type ChangeEnvVarApiArg = {
  /** Name of application */
  appName: string;
  /** environment of Radix application */
  envName: string;
  /** environment component of Radix application */
  componentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Environment variables new values and metadata */
  body: EnvVarParameter[];
};
export type SetComponentExternalDnstlsApiResponse = unknown;
export type SetComponentExternalDnstlsApiArg = {
  /** Name of application */
  appName: string;
  /** secret of Radix application */
  envName: string;
  /** secret component of Radix application */
  componentName: string;
  /** FQDN to be updated */
  fqdn: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** New TLS private key and certificate */
  setExternalDnstlsRequest: SetExternalDnstlsRequest;
};
export type ReplicaLogApiResponse = /** status 200 pod log */ string;
export type ReplicaLogApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of component */
  componentName: string;
  /** Name of pod */
  podName: string;
  /** Get log only from sinceTime (example 2020-03-18T07:20:41+00:00) */
  sinceTime?: string;
  /** Get log lines (example 1000) */
  lines?: string;
  /** Get log as a file if true */
  file?: string;
  /** Get previous container log if true */
  previous?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type RestartComponentApiResponse = unknown;
export type RestartComponentApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of component */
  componentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type ScaleComponentApiResponse = unknown;
export type ScaleComponentApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of component */
  componentName: string;
  /** New desired number of replicas */
  replicas: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetAzureKeyVaultSecretVersionsApiResponse =
  /** status 200 Successful operation */ AzureKeyVaultSecretVersion[];
export type GetAzureKeyVaultSecretVersionsApiArg = {
  /** Name of application */
  appName: string;
  /** secret of Radix application */
  envName: string;
  /** secret component of Radix application */
  componentName: string;
  /** Azure Key vault name */
  azureKeyVaultName: string;
  /** secret (or key, cert) name in Azure Key vault */
  secretName?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type ChangeComponentSecretApiResponse = unknown;
export type ChangeComponentSecretApiArg = {
  /** Name of application */
  appName: string;
  /** secret of Radix application */
  envName: string;
  /** secret component of Radix application */
  componentName: string;
  /** environment component secret name to be updated */
  secretName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** New secret value */
  secretParameters: SecretParameters;
};
export type StartComponentApiResponse = unknown;
export type StartComponentApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of component */
  componentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type StopComponentApiResponse = unknown;
export type StopComponentApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of component */
  componentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetApplicationEnvironmentDeploymentsApiResponse =
  /** status 200 Successful operation */ DeploymentSummary[];
export type GetApplicationEnvironmentDeploymentsApiArg = {
  /** name of Radix application */
  appName: string;
  /** environment of Radix application */
  envName: string;
  /** indicator to allow only listing the latest */
  latest?: boolean;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetEnvironmentEventsApiResponse =
  /** status 200 Successful get environment events */ Event[];
export type GetEnvironmentEventsApiArg = {
  /** name of Radix application */
  appName: string;
  /** name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetBatchesApiResponse =
  /** status 200 scheduled batches */ ScheduledBatchSummary[];
export type GetBatchesApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetBatchApiResponse =
  /** status 200 scheduled batch */ ScheduledBatchSummary;
export type GetBatchApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of batch */
  batchName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type DeleteBatchApiResponse = unknown;
export type DeleteBatchApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of batch */
  batchName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type CopyBatchApiResponse =
  /** status 200 Success */ ScheduledBatchSummary;
export type CopyBatchApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of batch to be copied */
  batchName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Request for creating a scheduled batch */
  scheduledBatchRequest: ScheduledBatchRequest;
};
export type RestartBatchApiResponse = unknown;
export type RestartBatchApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of batch */
  batchName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type StopBatchApiResponse = unknown;
export type StopBatchApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of batch */
  batchName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetJobComponentDeploymentsApiResponse =
  /** status 200 Radix deployments */ DeploymentItem[];
export type GetJobComponentDeploymentsApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetJobsApiResponse =
  /** status 200 scheduled jobs */ ScheduledJobSummary[];
export type GetJobsApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetJobApiResponse =
  /** status 200 scheduled job */ ScheduledJobSummary;
export type GetJobApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of job */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type DeleteJobApiResponse = unknown;
export type DeleteJobApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of job */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type CopyJobApiResponse = /** status 200 Success */ ScheduledJobSummary;
export type CopyJobApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of job to be copied */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Request for creating a scheduled job */
  scheduledJobRequest: ScheduledJobRequest;
};
export type GetJobPayloadApiResponse =
  /** status 200 scheduled job payload */ string;
export type GetJobPayloadApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of job */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type RestartJobApiResponse = unknown;
export type RestartJobApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of job */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type StopJobApiResponse = unknown;
export type StopJobApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of job */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type JobLogApiResponse = /** status 200 scheduled job log */ string;
export type JobLogApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Name of job-component */
  jobComponentName: string;
  /** Name of scheduled job */
  scheduledJobName: string;
  /** Get log only from sinceTime (example 2020-03-18T07:20:41+00:00) */
  sinceTime?: string;
  /** Get log lines (example 1000) */
  lines?: string;
  /** Get log as a file if true */
  file?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type RestartEnvironmentApiResponse = unknown;
export type RestartEnvironmentApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type StartEnvironmentApiResponse = unknown;
export type StartEnvironmentApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type StopEnvironmentApiResponse = unknown;
export type StopEnvironmentApiArg = {
  /** Name of application */
  appName: string;
  /** Name of environment */
  envName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetApplicationJobsApiResponse =
  /** status 200 Successful operation */ JobSummary[];
export type GetApplicationJobsApiArg = {
  /** name of Radix application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetApplicationJobApiResponse =
  /** status 200 Successful get job */ Job;
export type GetApplicationJobApiArg = {
  /** name of Radix application */
  appName: string;
  /** name of job */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetPipelineJobStepLogsApiResponse =
  /** status 200 Job step log */ string;
export type GetPipelineJobStepLogsApiArg = {
  /** name of Radix application */
  appName: string;
  /** Name of the pipeline job */
  jobName: string;
  /** Name of the pipeline job step */
  stepName: string;
  /** Get log only from sinceTime (example 2020-03-18T07:20:41+00:00) */
  sinceTime?: string;
  /** Get log lines (example 1000) */
  lines?: string;
  /** Get log as a file if true */
  file?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetTektonPipelineRunsApiResponse =
  /** status 200 List of PipelineRun-s */ PipelineRun[];
export type GetTektonPipelineRunsApiArg = {
  /** name of Radix application */
  appName: string;
  /** Name of pipeline job */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetTektonPipelineRunApiResponse =
  /** status 200 List of Pipeline Runs */ PipelineRun;
export type GetTektonPipelineRunApiArg = {
  /** name of Radix application */
  appName: string;
  /** Name of pipeline job */
  jobName: string;
  /** Name of pipeline run */
  pipelineRunName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetTektonPipelineRunTasksApiResponse =
  /** status 200 List of Pipeline Run Tasks */ PipelineRunTask[];
export type GetTektonPipelineRunTasksApiArg = {
  /** name of Radix application */
  appName: string;
  /** Name of pipeline job */
  jobName: string;
  /** Name of pipeline run */
  pipelineRunName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetTektonPipelineRunTaskApiResponse =
  /** status 200 Pipeline Run Task */ PipelineRunTask;
export type GetTektonPipelineRunTaskApiArg = {
  /** name of Radix application */
  appName: string;
  /** Name of pipeline job */
  jobName: string;
  /** Name of pipeline run */
  pipelineRunName: string;
  /** Name of pipeline run task */
  taskName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetTektonPipelineRunTaskStepLogsApiResponse =
  /** status 200 Task step log */ string;
export type GetTektonPipelineRunTaskStepLogsApiArg = {
  /** name of Radix application */
  appName: string;
  /** Name of pipeline job */
  jobName: string;
  /** Name of pipeline run */
  pipelineRunName: string;
  /** Name of pipeline run task */
  taskName: string;
  /** Name of pipeline run task step */
  stepName: string;
  /** Get log only from sinceTime (example 2020-03-18T07:20:41+00:00) */
  sinceTime?: string;
  /** Get log lines (example 1000) */
  lines?: string;
  /** Get log as a file if true */
  file?: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type GetTektonPipelineRunTaskStepsApiResponse =
  /** status 200 List of Pipeline Run Task Steps */ PipelineRunTaskStep[];
export type GetTektonPipelineRunTaskStepsApiArg = {
  /** name of Radix application */
  appName: string;
  /** Name of pipeline job */
  jobName: string;
  /** Name of pipeline run */
  pipelineRunName: string;
  /** Name of pipeline run task */
  taskName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type RerunApplicationJobApiResponse = unknown;
export type RerunApplicationJobApiArg = {
  /** name of application */
  appName: string;
  /** name of job */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type StopApplicationJobApiResponse = unknown;
export type StopApplicationJobApiArg = {
  /** name of application */
  appName: string;
  /** name of job */
  jobName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type ListPipelinesApiResponse =
  /** status 200 Successful operation */ string[];
export type ListPipelinesApiArg = {
  /** Name of application */
  appName: string;
};
export type TriggerPipelineBuildApiResponse =
  /** status 200 Successful trigger pipeline */ JobSummary;
export type TriggerPipelineBuildApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Pipeline parameters */
  pipelineParametersBuild: PipelineParametersBuild;
};
export type TriggerPipelineBuildDeployApiResponse =
  /** status 200 Successful trigger pipeline */ JobSummary;
export type TriggerPipelineBuildDeployApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Pipeline parameters */
  pipelineParametersBuild: PipelineParametersBuild;
};
export type TriggerPipelineDeployApiResponse =
  /** status 200 Successful trigger pipeline */ JobSummary;
export type TriggerPipelineDeployApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Pipeline parameters */
  pipelineParametersDeploy: PipelineParametersDeploy;
};
export type TriggerPipelinePromoteApiResponse =
  /** status 200 Successful trigger pipeline */ JobSummary;
export type TriggerPipelinePromoteApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Pipeline parameters */
  pipelineParametersPromote: PipelineParametersPromote;
};
export type GetPrivateImageHubsApiResponse =
  /** status 200 Successful operation */ ImageHubSecret[];
export type GetPrivateImageHubsApiArg = {
  /** name of Radix application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type UpdatePrivateImageHubsSecretValueApiResponse = unknown;
export type UpdatePrivateImageHubsSecretValueApiArg = {
  /** Name of application */
  appName: string;
  /** server name to update */
  serverName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** New secret value */
  secretParameters: SecretParameters;
};
export type RegenerateDeployKeyApiResponse = unknown;
export type RegenerateDeployKeyApiArg = {
  /** name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
  /** Regenerate deploy key and secret data */
  regenerateDeployKeyAndSecretData: RegenerateDeployKeyAndSecretData;
};
export type RestartApplicationApiResponse = unknown;
export type RestartApplicationApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type StartApplicationApiResponse = unknown;
export type StartApplicationApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type StopApplicationApiResponse = unknown;
export type StopApplicationApiArg = {
  /** Name of application */
  appName: string;
  /** Works only with custom setup of cluster. Allow impersonation of test users (Required if Impersonate-Group is set) */
  'Impersonate-User'?: string;
  /** Works only with custom setup of cluster. Allow impersonation of a comma-seperated list of test groups (Required if Impersonate-User is set) */
  'Impersonate-Group'?: string;
};
export type X509Certificate = {
  /** DNSNames defines list of Subject Alternate Names in the certificate */
  dnsNames?: string[];
  /** Issuer contains the distinguished name for the certificate's issuer */
  issuer: string;
  /** NotAfter defines the uppdater date/time validity boundary */
  notAfter: string;
  /** NotBefore defines the lower date/time validity boundary */
  notBefore: string;
  /** Subject contains the distinguished name for the certificate */
  subject: string;
};
export type Tls = {
  /** Status of the certificate
    Pending CertificatePending  Certificate is not set
    Consistent CertificateConsistent  Certificate is valid
    Invalid CertificateInvalid  Certificate is invalid */
  certificateStatus: 'Pending' | 'Consistent' | 'Invalid';
  /** CertificateStatusMessages contains a list of messages related to CertificateStatus */
  certificateStatusMessages?: string[];
  /** Certificates holds the X509 certificate chain
    The first certificate in the list should be the host certificate and the rest should be intermediate certificates */
  certificates?: X509Certificate[];
  /** Status of the private key
    Pending PrivateKeyPending  Private key is not set
    Consistent PrivateKeyConsistent  Private key is valid
    Invalid PrivateKeyInvalid  Private key is invalid */
  privateKeyStatus: 'Pending' | 'Consistent' | 'Invalid';
  /** PrivateKeyStatusMessages contains a list of messages related to PrivateKeyStatus */
  privateKeyStatusMessages?: string[];
  /** UseAutomation describes if TLS certificate is automatically issued using automation (ACME) */
  useAutomation: boolean;
};
export type ExternalDns = {
  /** Fully Qualified Domain Name */
  fqdn: string;
  tls: Tls;
};
export type HorizontalScalingSummary = {
  /** Component current average CPU utilization over all pods, represented as a percentage of requested CPU */
  currentCPUUtilizationPercentage?: number;
  /** Component current average memory utilization over all pods, represented as a percentage of requested memory */
  currentMemoryUtilizationPercentage?: number;
  /** Component maximum replicas. From radixconfig.yaml */
  maxReplicas?: number;
  /** Component minimum replicas. From radixconfig.yaml */
  minReplicas?: number;
  /** Component target average CPU utilization over all pods */
  targetCPUUtilizationPercentage?: number;
  /** Component target average memory utilization over all pods */
  targetMemoryUtilizationPercentage?: number;
};
export type AzureIdentity = {
  /** The Azure Key Vaults names, which use Azure Identity */
  azureKeyVaults?: string[];
  /** ClientId is the client ID of an Azure User Assigned Managed Identity
    or the application ID of an Azure AD Application Registration */
  clientId: string;
  /** The Service Account name to use when configuring Kubernetes Federation Credentials for the identity */
  serviceAccountName: string;
};
export type Identity = {
  azure?: AzureIdentity;
};
export type Notifications = {
  /** Webhook is a URL for notification about internal events or changes. The URL should be of a Radix component or job-component, with not public port. */
  webhook?: string;
};
export type ReplicaStatus = {
  /** Status of the container
    Pending = Container in Waiting state and the reason is ContainerCreating
    Failing = Container in Waiting state and the reason is anything else but ContainerCreating
    Running = Container in Running state
    Terminated = Container in Terminated state */
  status: 'Pending' | 'Failing' | 'Running' | 'Terminated' | 'Starting';
};
export type Resources = {
  cpu?: string;
  memory?: string;
};
export type ResourceRequirements = {
  limits?: Resources;
  requests?: Resources;
};
export type ReplicaSummary = {
  /** Container started timestamp */
  containerStarted?: string;
  /** Created timestamp */
  created?: string;
  /** The image the container is running. */
  image?: string;
  /** ImageID of the container's image. */
  imageId?: string;
  /** Pod name */
  name: string;
  replicaStatus?: ReplicaStatus;
  resources?: ResourceRequirements;
  /** RestartCount count of restarts of a component container inside a pod */
  restartCount?: number;
  /** StatusMessage provides message describing the status of a component container inside a pod */
  statusMessage?: string;
};
export type AuxiliaryResourceDeployment = {
  /** Running replicas of the auxiliary resource's deployment */
  replicaList?: ReplicaSummary[];
  /** Status of the auxiliary resource's deployment */
  status: 'Stopped' | 'Consistent' | 'Reconciling';
};
export type OAuth2AuxiliaryResource = {
  deployment: AuxiliaryResourceDeployment;
};
export type Port = {
  /** Component port name. From radixconfig.yaml */
  name: string;
  /** Component port number. From radixconfig.yaml */
  port?: number;
};
export type Component = {
  /** Array of external DNS configurations */
  externalDNS?: ExternalDns[];
  horizontalScalingSummary?: HorizontalScalingSummary;
  identity?: Identity;
  /** Image name */
  image: string;
  /** Name the component */
  name: string;
  notifications?: Notifications;
  oauth2?: OAuth2AuxiliaryResource;
  /** Ports defines the port number and protocol that a component is exposed for internally in environment */
  ports?: Port[];
  /** Array of ReplicaSummary */
  replicaList?: ReplicaSummary[];
  /** Array of pod names */
  replicas?: string[];
  /** ScheduledJobPayloadPath defines the payload path, where payload for Job Scheduler will be mapped as a file. From radixconfig.yaml */
  scheduledJobPayloadPath?: string;
  /** SchedulerPort defines the port number that a Job Scheduler is exposed internally in environment */
  schedulerPort?: number;
  /** Component secret names. From radixconfig.yaml */
  secrets?: string[];
  /** Status of the component */
  status?: 'Stopped' | 'Consistent' | 'Reconciling' | 'Restarting' | 'Outdated';
  /** Type of component */
  type: 'component' | 'job';
  /** Variable names map to values. From radixconfig.yaml */
  variables?: {
    [key: string]: string;
  };
};
export type JobSummary = {
  /** AppName of the application */
  appName?: string;
  /** Branch to build from */
  branch?: string;
  /** CommitID the commit ID of the branch to build */
  commitID?: string;
  /** Created timestamp */
  created?: string;
  /** Ended timestamp */
  ended?: string;
  /** Environments the job deployed to */
  environments?: string[];
  /** Image tags names for components - if empty will use default logic */
  imageTagNames?: {
    [key: string]: string;
  };
  /** Name of the job */
  name?: string;
  /** Name of the pipeline */
  pipeline?: 'build' | 'build-deploy' | 'promote' | 'deploy';
  /** RadixDeployment name, which is promoted */
  promotedFromDeployment?: string;
  /** Environment name, from which the Radix deployment is promoted */
  promotedFromEnvironment?: string;
  /** Environment name, to which the Radix deployment is promoted */
  promotedToEnvironment?: string;
  /** Started timestamp */
  started?: string;
  /** Status of the job */
  status?:
    | 'Queued'
    | 'Waiting'
    | 'Running'
    | 'Succeeded'
    | 'Failed'
    | 'Stopped'
    | 'Stopping'
    | 'StoppedNoChanges';
  /** TriggeredBy user that triggered the job. If through webhook = sender.login. If through api - usertoken.upn */
  triggeredBy?: string;
};
export type ApplicationSummary = {
  /** EnvironmentActiveComponents All component summaries of the active deployments in the environments */
  environmentActiveComponents?: {
    [key: string]: Component[];
  };
  latestJob?: JobSummary;
  /** Name the name of the application */
  name?: string;
};
export type ApplicationRegistration = {
  /** AdGroups the groups that should be able to access the application */
  adGroups: string[];
  /** ConfigBranch information */
  configBranch: string;
  /** ConfigurationItem is an identifier for an entity in a configuration management solution such as a CMDB.
    ITIL defines a CI as any component that needs to be managed in order to deliver an IT Service
    Ref: https://en.wikipedia.org/wiki/Configuration_item */
  configurationItem?: string;
  /** Owner of the application (email). Can be a single person or a shared group email */
  creator: string;
  /** Name the unique name of the Radix application */
  name: string;
  /** Owner of the application (email). Can be a single person or a shared group email */
  owner: string;
  /** radixconfig.yaml file name and path, starting from the GitHub repository root (without leading slash) */
  radixConfigFullName?: string;
  /** ReaderAdGroups the groups that should be able to read the application */
  readerAdGroups?: string[];
  /** Repository the github repository */
  repository: string;
  /** SharedSecret the shared secret of the webhook */
  sharedSecret: string;
  /** WBS information */
  wbs?: string;
};
export type ApplicationRegistrationUpsertResponse = {
  applicationRegistration?: ApplicationRegistration;
  /** Warnings of upsert operation */
  warnings?: string[];
};
export type ApplicationRegistrationRequest = {
  /** AcknowledgeWarnings acknowledge all warnings */
  acknowledgeWarnings?: boolean;
  applicationRegistration?: ApplicationRegistration;
};
export type ApplicationSearchIncludeFields = {
  environmentActiveComponents?: boolean;
  latestJobSummary?: boolean;
};
export type ApplicationsSearchRequest = {
  includeFields?: ApplicationSearchIncludeFields;
  /** List of application names to be returned */
  names: string[];
};
export type ApplicationAlias = {
  /** ComponentName the component exposing the endpoint */
  componentName: string;
  /** EnvironmentName the environment hosting the endpoint */
  environmentName: string;
  /** URL the public endpoint */
  url: string;
};
export type DnsAliasStatus = {
  condition?: string;
  message?: string;
};
export type DnsAlias = {
  /** ComponentName the component exposing the endpoint */
  componentName: string;
  /** EnvironmentName the environment hosting the endpoint */
  environmentName: string;
  status?: DnsAliasStatus;
  /** URL the public endpoint */
  url: string;
};
export type ComponentSummary = {
  /** Image name */
  image: string;
  /** Name the component */
  name: string;
  /** Type of component */
  type: 'component' | 'job';
};
export type DeploymentSummary = {
  /** ActiveFrom Timestamp when the deployment starts (or created) */
  activeFrom: string;
  /** ActiveTo Timestamp when the deployment ends */
  activeTo?: string;
  /** CommitID the commit ID of the branch to build */
  commitID?: string;
  /** Array of component summaries */
  components?: ComponentSummary[];
  /** Name of job creating deployment */
  createdByJob?: string;
  /** Environment the environment this Radix application deployment runs in */
  environment: string;
  /** GitCommitHash the hash of the git commit from which radixconfig.yaml was parsed */
  gitCommitHash?: string;
  /** GitTags the git tags that the git commit hash points to */
  gitTags?: string;
  /** Name the unique name of the Radix application deployment */
  name: string;
  /** Type of pipeline job */
  pipelineJobType?: 'build' | 'build-deploy' | 'promote' | 'deploy';
  /** Name of the environment the deployment was promoted from
    Applies only for pipeline jobs of type 'promote' */
  promotedFromEnvironment?: string;
};
export type EnvironmentSummary = {
  activeDeployment?: DeploymentSummary;
  /** BranchMapping The branch mapped to this environment */
  branchMapping?: string;
  /** Name of the environment */
  name?: string;
  /** Status of the environment
    Pending = Environment exists in Radix config, but not in cluster
    Consistent = Environment exists in Radix config and in cluster
    Orphan = Environment does not exist in Radix config, but exists in cluster */
  status?: 'Pending' | 'Consistent' | 'Orphan';
};
export type Application = {
  appAlias?: ApplicationAlias;
  /** DNS aliases showing nicer endpoint for application, without "app." subdomain domain */
  dnsAliases?: DnsAlias[];
  /** Environments List of environments for this application */
  environments?: EnvironmentSummary[];
  /** Jobs list of run jobs for the application */
  jobs?: JobSummary[];
  /** Name the name of the application */
  name?: string;
  registration?: ApplicationRegistration;
  /** UserIsAdmin if user is member of application's admin groups */
  userIsAdmin: boolean;
};
export type ApplicationRegistrationPatch = {
  /** AdGroups the groups that should be able to access the application */
  adGroups?: string[];
  /** ConfigBranch information */
  configBranch?: string;
  /** ConfigurationItem is an identifier for an entity in a configuration management solution such as a CMDB.
    ITIL defines a CI as any component that needs to be managed in order to deliver an IT Service
    Ref: https://en.wikipedia.org/wiki/Configuration_item */
  configurationItem?: string;
  /** Owner of the application - should be an email */
  owner?: string;
  /** radixconfig.yaml file name and path, starting from the GitHub repository root (without leading slash) */
  radixConfigFullName?: string;
  /** ReaderAdGroups the groups that should be able to read the application */
  readerAdGroups?: string[];
  /** Repository the github repository */
  repository?: string;
  /** WBS information */
  wbs?: string;
};
export type ApplicationRegistrationPatchRequest = {
  /** AcknowledgeWarnings acknowledge all warnings */
  acknowledgeWarnings?: boolean;
  applicationRegistrationPatch: ApplicationRegistrationPatch;
};
export type AlertConfig = {
  /** Alert defines the name of a predefined alert */
  alert: string;
  /** Receiver is the name of the receiver that will handle this alert */
  receiver: string;
};
export type AlertConfigList = AlertConfig[];
export type SlackConfigSecretStatus = {
  /** WebhookURLConfigured flag indicates if a Slack webhook URL is set */
  webhookUrlConfigured?: boolean;
};
export type ReceiverConfigSecretStatus = {
  slackConfig?: SlackConfigSecretStatus;
};
export type ReceiverConfigSecretStatusMap = {
  [key: string]: ReceiverConfigSecretStatus;
};
export type SlackConfig = {
  /** Enabled flag indicates if alert notifications should be sent to Slack */
  enabled: boolean;
};
export type ReceiverConfig = {
  slackConfig: SlackConfig;
};
export type ReceiverConfigMap = {
  [key: string]: ReceiverConfig;
};
export type AlertingConfig = {
  /** AlertNames is the list of alert names that can be handled by Radix */
  alertNames?: string[];
  alerts?: AlertConfigList;
  /** Enabled flag tells if alerting is enabled or disabled */
  enabled?: boolean;
  /** Ready flag tells tells if alerting is ready to be configured
    Value is always false when Enabled is false
    Vlaue is True if Enabled is true and Radix operator has processed the alert configuration */
  ready?: boolean;
  receiverSecretStatus?: ReceiverConfigSecretStatusMap;
  receivers?: ReceiverConfigMap;
};
export type UpdateSlackConfigSecrets = {
  /** WebhookURL the Slack webhook URL where alerts are sent
    Secret key for webhook URL is updated if a non-nil value is present, and deleted if omitted or set to null
    
    required: */
  webhookUrl?: string | null;
};
export type UpdateReceiverConfigSecrets = {
  slackConfig?: UpdateSlackConfigSecrets;
};
export type UpdateReceiverConfigSecretsMap = {
  [key: string]: UpdateReceiverConfigSecrets;
};
export type UpdateAlertingConfig = {
  alerts: AlertConfigList;
  receiverSecrets: UpdateReceiverConfigSecretsMap;
  receivers: ReceiverConfigMap;
};
export type BuildSecret = {
  /** Name name of the build secret */
  name: string;
  /** Status of the secret
    Pending = Secret value is not set
    Consistent = Secret value is set */
  status?: 'Pending' | 'Consistent';
};
export type SecretParameters = {
  /** Name the unique name of the Radix application deployment */
  secretValue: string;
  /** Type of the secret
    generic SecretTypeGeneric
    azure-blob-fuse-volume SecretTypeAzureBlobFuseVolume
    csi-azure-blob-volume SecretTypeCsiAzureBlobVolume
    csi-azure-key-vault-creds SecretTypeCsiAzureKeyVaultCreds
    csi-azure-key-vault-item SecretTypeCsiAzureKeyVaultItem
    client-cert-auth SecretTypeClientCertificateAuth
    oauth2-proxy SecretTypeOAuth2Proxy */
  type?:
    | 'generic'
    | 'azure-blob-fuse-volume'
    | 'csi-azure-blob-volume'
    | 'csi-azure-key-vault-creds'
    | 'csi-azure-key-vault-item'
    | 'client-cert-auth'
    | 'oauth2-proxy';
};
export type DeployKeyAndSecret = {
  /** PublicDeployKey the public value of the deploy key */
  publicDeployKey: string;
  /** SharedSecret the shared secret */
  sharedSecret: string;
};
export type Deployment = {
  /** ActiveFrom Timestamp when the deployment starts (or created) */
  activeFrom?: string;
  /** ActiveTo Timestamp when the deployment ends */
  activeTo?: string;
  /** Array of components */
  components?: Component[];
  /** Name of job creating deployment */
  createdByJob?: string;
  /** Environment the environment this Radix application deployment runs in */
  environment?: string;
  /** GitCommitHash the hash of the git commit from which radixconfig.yaml was parsed */
  gitCommitHash?: string;
  /** GitTags the git tags that the git commit hash points to */
  gitTags?: string;
  /** Name the unique name of the Radix application deployment */
  name?: string;
  /** Namespace where the deployment is stored */
  namespace: string;
  /** Repository the GitHub repository that the deployment was built from */
  repository: string;
};
export type Secret = {
  /** Component name of the component having the secret */
  component?: string;
  /** DisplayName of the secret */
  displayName?: string;
  /** ID of the secret within the Resource */
  id?: string;
  /** Name of the secret or its property, related to type and resource) */
  name: string;
  /** Resource of the secrets */
  resource?: string;
  /** Status of the secret
    Pending = Secret exists in Radix config, but not in cluster
    Consistent = Secret exists in Radix config and in cluster
    NotAvailable = Secret is available in external secret configuration but not in cluster */
  status?: 'Pending' | 'Consistent' | 'NotAvailable';
  /** Type of the secret
    generic SecretTypeGeneric
    azure-blob-fuse-volume SecretTypeAzureBlobFuseVolume
    csi-azure-blob-volume SecretTypeCsiAzureBlobVolume
    csi-azure-key-vault-creds SecretTypeCsiAzureKeyVaultCreds
    csi-azure-key-vault-item SecretTypeCsiAzureKeyVaultItem
    client-cert-auth SecretTypeClientCertificateAuth
    oauth2-proxy SecretTypeOAuth2Proxy */
  type?:
    | 'generic'
    | 'azure-blob-fuse-volume'
    | 'csi-azure-blob-volume'
    | 'csi-azure-key-vault-creds'
    | 'csi-azure-key-vault-item'
    | 'client-cert-auth'
    | 'oauth2-proxy';
};
export type Environment = {
  activeDeployment?: Deployment;
  /** BranchMapping The branch mapped to this environment */
  branchMapping?: string;
  /** Deployments All deployments in environment */
  deployments?: DeploymentSummary[];
  /** Name of the environment */
  name?: string;
  /** Secrets All secrets in environment */
  secrets?: Secret[];
  /** Status of the environment
    Pending = Environment exists in Radix config, but not in cluster
    Consistent = Environment exists in Radix config and in cluster
    Orphan = Environment does not exist in Radix config, but exists in cluster */
  status?: 'Pending' | 'Consistent' | 'Orphan';
};
export type EnvVarMetadata = {
  /** Value of the environment variable in radixconfig.yaml */
  radixConfigValue?: string;
};
export type EnvVar = {
  metadata?: EnvVarMetadata;
  /** Name of the environment variable */
  name: string;
  /** Value of the environment variable */
  value?: string;
};
export type EnvVarParameter = {
  /** Name of the environment variable */
  name: string;
  /** Value a new value of the environment variable */
  value: string;
};
export type SetExternalDnstlsRequest = {
  /** X509 certificate in PEM format */
  certificate: string;
  /** Private key in PEM format */
  privateKey: string;
};
export type AzureKeyVaultSecretVersion = {
  /** BatchCreated which uses the secret */
  batchCreated?: string;
  /** BatchName which uses the secret */
  batchName?: string;
  /** JobCreated which uses the secret */
  jobCreated?: string;
  /** JobName which uses the secret */
  jobName?: string;
  /** ReplicaCreated which uses the secret */
  replicaCreated: string;
  /** ReplicaName which uses the secret */
  replicaName: string;
  /** Version of the secret */
  version: string;
};
export type PodState = {
  /** Specifies whether the first container has passed its readiness probe. */
  ready?: boolean;
  /** The number of times the first container has been restarted */
  restartCount?: number;
  /** Specifies whether the first container has started. */
  started?: boolean | null;
};
export type ObjectState = {
  pod?: PodState;
};
export type Event = {
  /** Kind of object involved in this event */
  involvedObjectKind?: string;
  /** Name of object involved in this event */
  involvedObjectName?: string;
  /** Namespace of object involved in this event */
  involvedObjectNamespace?: string;
  involvedObjectState?: ObjectState;
  /** The time (ISO8601) at which the event was last recorded */
  lastTimestamp?: string;
  /** A human-readable description of the status of this event */
  message?: string;
  /** A short, machine understandable string that gives the reason for this event */
  reason?: string;
  /** Type of event (Normal, Warning) */
  type?: string;
};
export type Node = {
  /** Gpu Holds lists of node GPU types, with dashed types to exclude */
  gpu?: string;
  /** GpuCount Holds minimum count of GPU on node */
  gpuCount?: string;
};
export type ScheduledJobSummary = {
  /** Timestamp of the job restart, if applied.
    +optional */
  Restart?: string;
  /** BackoffLimit Amount of retries due to a logical error in configuration etc. */
  backoffLimit: number;
  /** BatchName Batch name, if any */
  batchName?: string;
  /** Created timestamp */
  created?: string;
  /** DeploymentName name of RadixDeployment for the job */
  deploymentName?: string;
  /** Ended timestamp */
  ended?: string;
  /** FailedCount is the number of times the job has failed */
  failedCount: number;
  /** JobId JobId, if any */
  jobId?: string;
  /** Message of a status, if any, of the job */
  message?: string;
  /** Name of the scheduled job */
  name?: string;
  node?: Node;
  /** Array of ReplicaSummary */
  replicaList?: ReplicaSummary[];
  resources?: ResourceRequirements;
  /** Started timestamp */
  started?: string;
  /** Status of the job */
  status:
    | 'Running'
    | 'Succeeded'
    | 'Failed'
    | 'Waiting'
    | 'Stopping'
    | 'Stopped';
  /** TimeLimitSeconds How long the job supposed to run at maximum */
  timeLimitSeconds?: number;
};
export type ScheduledBatchSummary = {
  /** Created timestamp */
  created?: string;
  /** DeploymentName name of RadixDeployment for the batch */
  deploymentName: string;
  /** Ended timestamp */
  ended?: string;
  /** Jobs within the batch of ScheduledJobSummary */
  jobList?: ScheduledJobSummary[];
  /** Deprecated: Message of a status, if any, of the job */
  message?: string;
  /** Name of the scheduled batch */
  name: string;
  replica?: ReplicaSummary;
  /** Started timestamp */
  started?: string;
  /** Status of the job */
  status: 'Waiting' | 'Running' | 'Succeeded' | 'Failed';
  /** TotalJobCount count of jobs, requested to be scheduled by a batch */
  totalJobCount: number;
};
export type ScheduledBatchRequest = {
  /** Name of the Radix deployment for a batch */
  deploymentName?: string;
};
export type DeploymentItem = {
  /** ActiveFrom Timestamp when the deployment starts (or created) */
  activeFrom: string;
  /** ActiveTo Timestamp when the deployment ends */
  activeTo?: string;
  /** GitCommitHash the hash of the git commit from which radixconfig.yaml was parsed */
  gitCommitHash?: string;
  /** Name the unique name of the Radix application deployment */
  name: string;
};
export type ScheduledJobRequest = {
  /** Name of the Radix deployment for a job */
  deploymentName?: string;
};
export type Step = {
  /** Components associated components */
  components?: string[];
  /** Ended timestamp */
  ended?: string;
  /** Name of the step */
  name?: string;
  /** Started timestamp */
  started?: string;
  /** Status of the step */
  status?:
    | 'Queued'
    | 'Waiting'
    | 'Running'
    | 'Succeeded'
    | 'Failed'
    | 'Stopped'
    | 'StoppedNoChanges';
};
export type Job = {
  /** Branch to build from */
  branch?: string;
  /** CommitID the commit ID of the branch to build */
  commitID?: string;
  /** Components (array of ComponentSummary) created by the job
    
    Deprecated: Inspect each deployment to get list of components created by the job */
  components?: ComponentSummary[];
  /** Created timestamp */
  created?: string;
  /** Array of deployments */
  deployments?: DeploymentSummary[];
  /** Ended timestamp */
  ended?: string;
  /** Image tags names for components - if empty will use default logic */
  imageTagNames?: {
    [key: string]: string;
  };
  /** Name of the job */
  name?: string;
  /** Name of the pipeline */
  pipeline?: 'build' | 'build-deploy' | 'promote' | 'deploy';
  /** PromotedDeploymentName the name of the deployment that was promoted */
  promotedDeploymentName?: string;
  /** RadixDeployment name, which is promoted */
  promotedFromDeployment?: string;
  /** PromotedFromEnvironment the name of the environment that was promoted from */
  promotedFromEnvironment?: string;
  /** PromotedToEnvironment the name of the environment that was promoted to */
  promotedToEnvironment?: string;
  /** RerunFromJob The source name of the job if this job was restarted from it */
  rerunFromJob?: string;
  /** Started timestamp */
  started?: string;
  /** Status of the job */
  status?:
    | 'Queued'
    | 'Waiting'
    | 'Running'
    | 'Succeeded'
    | 'Failed'
    | 'Stopped'
    | 'Stopping'
    | 'StoppedNoChanges';
  /** Array of steps */
  steps?: Step[];
  /** TriggeredBy user that triggered the job. If through webhook = sender.login. If through api = usertoken.upn */
  triggeredBy?: string;
};
export type PipelineRun = {
  /** Ended timestamp */
  ended?: string;
  /** Env Environment of the pipeline run */
  env: string;
  /** Name Original name of the pipeline run */
  name: string;
  /** RealName Name of the pipeline run in the namespace */
  realName: string;
  /** Started timestamp */
  started?: string;
  /** Status of the step */
  status?: string;
  /** StatusMessage of the task */
  statusMessage?: string;
};
export type PipelineRunTask = {
  /** Ended timestamp */
  ended?: string;
  /** Name of the task */
  name: string;
  /** PipelineName of the task */
  pipelineName: string;
  /** PipelineRunEnv Environment of the pipeline run */
  pipelineRunEnv: string;
  /** RealName Name of the pipeline run in the namespace */
  realName: string;
  /** Started timestamp */
  started?: string;
  /** Status of the task */
  status?: string;
  /** StatusMessage of the task */
  statusMessage?: string;
};
export type PipelineRunTaskStep = {
  /** Ended timestamp */
  ended?: string;
  /** Name of the step */
  name: string;
  /** Started timestamp */
  started?: string;
  /** Status of the task */
  status?: string;
  /** StatusMessage of the task */
  statusMessage?: string;
};
export type PipelineParametersBuild = {
  /** Branch the branch to build
    REQUIRED for "build" and "build-deploy" pipelines */
  branch?: string;
  /** CommitID the commit ID of the branch to build
    REQUIRED for "build" and "build-deploy" pipelines */
  commitID?: string;
  /** ImageName of the component, without repository name and image-tag */
  imageName?: string;
  /** ImageRepository of the component, without image name and image-tag */
  imageRepository?: string;
  /** ImageTag of the image - if empty will use default logic */
  imageTag?: string;
  /** PushImage should image be pushed to container registry. Defaults pushing */
  pushImage?: string;
  /** TriggeredBy of the job - if empty will use user token upn (user principle name) */
  triggeredBy?: string;
};
export type PipelineParametersDeploy = {
  /** CommitID the commit ID of the branch
    OPTIONAL for information only */
  commitID?: string;
  /** Image tags names for components */
  imageTagNames?: {
    [key: string]: string;
  };
  /** Name of environment to deploy
    REQUIRED for "deploy" pipeline */
  toEnvironment?: string;
  /** TriggeredBy of the job - if empty will use user token upn (user principle name) */
  triggeredBy?: string;
};
export type PipelineParametersPromote = {
  /** ID of the deployment to promote
    REQUIRED for "promote" pipeline */
  deploymentName?: string;
  /** Name of environment where to look for the deployment to be promoted
    REQUIRED for "promote" pipeline */
  fromEnvironment?: string;
  /** Name of environment to receive the promoted deployment
    REQUIRED for "promote" pipeline */
  toEnvironment?: string;
  /** TriggeredBy of the job - if empty will use user token upn (user principle name) */
  triggeredBy?: string;
};
export type ImageHubSecret = {
  /** Email provided in radixconfig.yaml */
  email?: string;
  /** Server name of the image hub */
  server: string;
  /** Status of the secret
    Pending = Secret value is not set
    Consistent = Secret value is set */
  status?: 'Pending' | 'Consistent';
  /** Username for connecting to private image hub */
  username: string;
};
export type RegenerateDeployKeyAndSecretData = {
  /** PrivateKey of the deploy key */
  privateKey?: string;
  /** SharedSecret of the shared secret */
  sharedSecret?: string;
};
export const {
  useShowApplicationsQuery,
  useRegisterApplicationMutation,
  useGetSearchApplicationsQuery,
  useSearchApplicationsMutation,
  useGetApplicationQuery,
  useChangeRegistrationDetailsMutation,
  useDeleteApplicationMutation,
  useModifyRegistrationDetailsMutation,
  useGetApplicationAlertingConfigQuery,
  useUpdateApplicationAlertingConfigMutation,
  useDisableApplicationAlertingMutation,
  useEnableApplicationAlertingMutation,
  useGetBuildSecretsQuery,
  useUpdateBuildSecretsSecretValueMutation,
  useGetDeployKeyAndSecretQuery,
  useIsDeployKeyValidQuery,
  useGetDeploymentsQuery,
  useGetDeploymentQuery,
  useComponentsQuery,
  useLogQuery,
  useGetEnvironmentSummaryQuery,
  useGetEnvironmentQuery,
  useCreateEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useGetEnvironmentAlertingConfigQuery,
  useUpdateEnvironmentAlertingConfigMutation,
  useDisableEnvironmentAlertingMutation,
  useEnableEnvironmentAlertingMutation,
  useGetBuildStatusQuery,
  useGetOAuthPodLogQuery,
  useRestartOAuthAuxiliaryResourceMutation,
  useEnvVarsQuery,
  useChangeEnvVarMutation,
  useSetComponentExternalDnstlsMutation,
  useReplicaLogQuery,
  useRestartComponentMutation,
  useScaleComponentMutation,
  useGetAzureKeyVaultSecretVersionsQuery,
  useChangeComponentSecretMutation,
  useStartComponentMutation,
  useStopComponentMutation,
  useGetApplicationEnvironmentDeploymentsQuery,
  useGetEnvironmentEventsQuery,
  useGetBatchesQuery,
  useGetBatchQuery,
  useDeleteBatchMutation,
  useCopyBatchMutation,
  useRestartBatchMutation,
  useStopBatchMutation,
  useGetJobComponentDeploymentsQuery,
  useGetJobsQuery,
  useGetJobQuery,
  useDeleteJobMutation,
  useCopyJobMutation,
  useGetJobPayloadQuery,
  useRestartJobMutation,
  useStopJobMutation,
  useJobLogQuery,
  useRestartEnvironmentMutation,
  useStartEnvironmentMutation,
  useStopEnvironmentMutation,
  useGetApplicationJobsQuery,
  useGetApplicationJobQuery,
  useGetPipelineJobStepLogsQuery,
  useGetTektonPipelineRunsQuery,
  useGetTektonPipelineRunQuery,
  useGetTektonPipelineRunTasksQuery,
  useGetTektonPipelineRunTaskQuery,
  useGetTektonPipelineRunTaskStepLogsQuery,
  useGetTektonPipelineRunTaskStepsQuery,
  useRerunApplicationJobMutation,
  useStopApplicationJobMutation,
  useListPipelinesQuery,
  useTriggerPipelineBuildMutation,
  useTriggerPipelineBuildDeployMutation,
  useTriggerPipelineDeployMutation,
  useTriggerPipelinePromoteMutation,
  useGetPrivateImageHubsQuery,
  useUpdatePrivateImageHubsSecretValueMutation,
  useRegenerateDeployKeyMutation,
  useRestartApplicationMutation,
  useStartApplicationMutation,
  useStopApplicationMutation,
} = injectedRtkApi;
