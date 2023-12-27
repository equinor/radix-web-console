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
export type HorizontalScalingSummary = {
  currentCPUUtilizationPercentage?: number;
  currentMemoryUtilizationPercentage?: number;
  maxReplicas?: number;
  minReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: number;
};
export type AzureIdentity = {
  azureKeyVaults?: string[];
  clientId: string;
  serviceAccountName: string;
};
export type Identity = {
  azure?: AzureIdentity;
};
export type Notifications = {
  webhook?: string;
};
export type ReplicaStatus = {
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
  containerStarted?: string;
  created?: string;
  image?: string;
  imageId?: string;
  name: string;
  replicaStatus?: ReplicaStatus;
  resources?: ResourceRequirements;
  restartCount?: number;
  statusMessage?: string;
};
export type AuxiliaryResourceDeployment = {
  replicaList?: ReplicaSummary[];
  status: 'Stopped' | 'Consistent' | 'Reconciling';
};
export type OAuth2AuxiliaryResource = {
  deployment: AuxiliaryResourceDeployment;
};
export type Port = {
  name: string;
  port?: number;
};
export type Component = {
  horizontalScalingSummary?: HorizontalScalingSummary;
  identity?: Identity;
  image: string;
  name: string;
  notifications?: Notifications;
  oauth2?: OAuth2AuxiliaryResource;
  ports?: Port[];
  replicaList?: ReplicaSummary[];
  replicas?: string[];
  scheduledJobPayloadPath?: string;
  schedulerPort?: number;
  secrets?: string[];
  status?: 'Stopped' | 'Consistent' | 'Reconciling' | 'Restarting' | 'Outdated';
  type: 'component' | 'job';
  variables?: {
    [key: string]: string;
  };
};
export type JobSummary = {
  appName?: string;
  branch?: string;
  commitID?: string;
  created?: string;
  ended?: string;
  environments?: string[];
  imageTagNames?: {
    [key: string]: string;
  };
  name?: string;
  pipeline?: 'build' | 'build-deploy' | 'promote' | 'deploy';
  promotedFromDeployment?: string;
  promotedFromEnvironment?: string;
  promotedToEnvironment?: string;
  started?: string;
  status?:
    | 'Queued'
    | 'Waiting'
    | 'Running'
    | 'Succeeded'
    | 'Failed'
    | 'Stopped'
    | 'Stopping'
    | 'StoppedNoChanges';
  triggeredBy?: string;
};
export type ApplicationSummary = {
  environmentActiveComponents?: {
    [key: string]: Component[];
  };
  latestJob?: JobSummary;
  name?: string;
};
export type ApplicationRegistration = {
  adGroups: string[];
  configBranch: string;
  configurationItem?: string;
  creator: string;
  name: string;
  owner: string;
  radixConfigFullName?: string;
  readerAdGroups?: string[];
  repository: string;
  sharedSecret: string;
  wbs?: string;
};
export type ApplicationRegistrationUpsertResponse = {
  applicationRegistration?: ApplicationRegistration;
  warnings?: string[];
};
export type ApplicationRegistrationRequest = {
  acknowledgeWarnings?: boolean;
  applicationRegistration?: ApplicationRegistration;
};
export type ApplicationSearchIncludeFields = {
  environmentActiveComponents?: boolean;
  latestJobSummary?: boolean;
};
export type ApplicationsSearchRequest = {
  includeFields?: ApplicationSearchIncludeFields;
  names: string[];
};
export type ApplicationAlias = {
  componentName: string;
  environmentName: string;
  url: string;
};
export type DnsAliasStatus = {
  Condition?: string;
  Message?: string;
};
export type DnsAlias = {
  Status?: DnsAliasStatus;
  componentName: string;
  environmentName: string;
  url: string;
};
export type ComponentSummary = {
  image: string;
  name: string;
  type: 'component' | 'job';
};
export type DeploymentSummary = {
  activeFrom: string;
  activeTo?: string;
  commitID?: string;
  components?: ComponentSummary[];
  createdByJob?: string;
  environment: string;
  gitCommitHash?: string;
  gitTags?: string;
  name: string;
  pipelineJobType?: 'build' | 'build-deploy' | 'promote' | 'deploy';
  promotedFromEnvironment?: string;
};
export type EnvironmentSummary = {
  activeDeployment?: DeploymentSummary;
  branchMapping?: string;
  name?: string;
  status?: 'Pending' | 'Consistent' | 'Orphan';
};
export type Application = {
  appAlias?: ApplicationAlias;
  dnsAlias?: DnsAlias[];
  environments?: EnvironmentSummary[];
  jobs?: JobSummary[];
  name?: string;
  registration?: ApplicationRegistration;
  userIsAdmin: boolean;
};
export type ApplicationRegistrationPatch = {
  adGroups?: string[];
  configBranch?: string;
  configurationItem?: string;
  owner?: string;
  radixConfigFullName?: string;
  readerAdGroups?: string[];
  repository?: string;
  wbs?: string;
};
export type ApplicationRegistrationPatchRequest = {
  acknowledgeWarnings?: boolean;
  applicationRegistrationPatch: ApplicationRegistrationPatch;
};
export type AlertConfig = {
  alert: string;
  receiver: string;
};
export type AlertConfigList = AlertConfig[];
export type SlackConfigSecretStatus = {
  webhookUrlConfigured?: boolean;
};
export type ReceiverConfigSecretStatus = {
  slackConfig?: SlackConfigSecretStatus;
};
export type ReceiverConfigSecretStatusMap = {
  [key: string]: ReceiverConfigSecretStatus;
};
export type SlackConfig = {
  enabled: boolean;
};
export type ReceiverConfig = {
  slackConfig: SlackConfig;
};
export type ReceiverConfigMap = {
  [key: string]: ReceiverConfig;
};
export type AlertingConfig = {
  alertNames?: string[];
  alerts?: AlertConfigList;
  enabled?: boolean;
  ready?: boolean;
  receiverSecretStatus?: ReceiverConfigSecretStatusMap;
  receivers?: ReceiverConfigMap;
};
export type UpdateSlackConfigSecrets = {
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
  name: string;
  status?: 'Pending' | 'Consistent';
};
export type SecretParameters = {
  secretValue: string;
  type?:
    | 'generic'
    | 'client-cert'
    | 'azure-blob-fuse-volume'
    | 'csi-azure-blob-volume'
    | 'csi-azure-key-vault-creds'
    | 'csi-azure-key-vault-item'
    | 'client-cert-auth'
    | 'oauth2-proxy';
};
export type DeployKeyAndSecret = {
  publicDeployKey: string;
  sharedSecret: string;
};
export type Deployment = {
  activeFrom?: string;
  activeTo?: string;
  components?: Component[];
  createdByJob?: string;
  environment?: string;
  gitCommitHash?: string;
  gitTags?: string;
  name?: string;
  namespace: string;
  repository: string;
};
export type TlsCertificate = {
  dnsNames?: string[];
  issuer: string;
  notAfter: string;
  notBefore: string;
  subject: string;
};
export type Secret = {
  component?: string;
  displayName?: string;
  id?: string;
  name: string;
  resource?: string;
  status?: 'Pending' | 'Consistent' | 'NotAvailable' | 'Invalid';
  statusMessages?: string[];
  tlsCertificates?: TlsCertificate[];
  type?:
    | 'generic'
    | 'client-cert'
    | 'azure-blob-fuse-volume'
    | 'csi-azure-blob-volume'
    | 'csi-azure-key-vault-creds'
    | 'csi-azure-key-vault-item'
    | 'client-cert-auth'
    | 'oauth2-proxy';
};
export type Environment = {
  activeDeployment?: Deployment;
  branchMapping?: string;
  deployments?: DeploymentSummary[];
  name?: string;
  secrets?: Secret[];
  status?: 'Pending' | 'Consistent' | 'Orphan';
};
export type EnvVarMetadata = {
  radixConfigValue?: string;
};
export type EnvVar = {
  metadata?: EnvVarMetadata;
  name: string;
  value?: string;
};
export type EnvVarParameter = {
  name: string;
  value: string;
};
export type AzureKeyVaultSecretVersion = {
  batchCreated?: string;
  batchName?: string;
  jobCreated?: string;
  jobName?: string;
  replicaCreated: string;
  replicaName: string;
  version: string;
};
export type PodState = {
  ready?: boolean;
  restartCount?: number;
  started?: boolean | null;
};
export type ObjectState = {
  pod?: PodState;
};
export type Event = {
  involvedObjectKind?: string;
  involvedObjectName?: string;
  involvedObjectNamespace?: string;
  involvedObjectState?: ObjectState;
  lastTimestamp?: string;
  message?: string;
  reason?: string;
  type?: string;
};
export type Node = {
  gpu?: string;
  gpuCount?: string;
};
export type ScheduledJobSummary = {
  Restart?: string;
  backoffLimit: number;
  batchName?: string;
  created?: string;
  deploymentName?: string;
  ended?: string;
  failedCount: number;
  jobId?: string;
  message?: string;
  name?: string;
  node?: Node;
  replicaList?: ReplicaSummary[];
  resources?: ResourceRequirements;
  started?: string;
  status:
    | 'Running'
    | 'Succeeded'
    | 'Failed'
    | 'Waiting'
    | 'Stopping'
    | 'Stopped';
  timeLimitSeconds?: number;
};
export type ScheduledBatchSummary = {
  created?: string;
  deploymentName: string;
  ended?: string;
  jobList?: ScheduledJobSummary[];
  message?: string;
  name: string;
  replica?: ReplicaSummary;
  started?: string;
  status: 'Waiting' | 'Running' | 'Succeeded' | 'Failed';
  totalJobCount: number;
};
export type ScheduledBatchRequest = {
  deploymentName?: string;
};
export type DeploymentItem = {
  activeFrom: string;
  activeTo?: string;
  gitCommitHash?: string;
  name: string;
};
export type ScheduledJobRequest = {
  deploymentName?: string;
};
export type Step = {
  components?: string[];
  ended?: string;
  name?: string;
  started?: string;
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
  branch?: string;
  commitID?: string;
  components?: ComponentSummary[];
  created?: string;
  deployments?: DeploymentSummary[];
  ended?: string;
  imageTagNames?: {
    [key: string]: string;
  };
  name?: string;
  pipeline?: 'build' | 'build-deploy' | 'promote' | 'deploy';
  promotedDeploymentName?: string;
  promotedFromDeployment?: string;
  promotedFromEnvironment?: string;
  promotedToEnvironment?: string;
  rerunFromJob?: string;
  started?: string;
  status?:
    | 'Queued'
    | 'Waiting'
    | 'Running'
    | 'Succeeded'
    | 'Failed'
    | 'Stopped'
    | 'Stopping'
    | 'StoppedNoChanges';
  steps?: Step[];
  triggeredBy?: string;
};
export type PipelineRun = {
  ended?: string;
  env: string;
  name: string;
  realName: string;
  started?: string;
  status?: string;
  statusMessage?: string;
};
export type PipelineRunTask = {
  ended?: string;
  name: string;
  pipelineName: string;
  pipelineRunEnv: string;
  realName: string;
  started?: string;
  status?: string;
  statusMessage?: string;
};
export type PipelineRunTaskStep = {
  ended?: string;
  name: string;
  started?: string;
  status?: string;
  statusMessage?: string;
};
export type PipelineParametersBuild = {
  branch?: string;
  commitID?: string;
  imageName?: string;
  imageRepository?: string;
  imageTag?: string;
  pushImage?: string;
  triggeredBy?: string;
};
export type PipelineParametersDeploy = {
  commitID?: string;
  imageTagNames?: {
    [key: string]: string;
  };
  toEnvironment?: string;
  triggeredBy?: string;
};
export type PipelineParametersPromote = {
  deploymentName?: string;
  fromEnvironment?: string;
  toEnvironment?: string;
  triggeredBy?: string;
};
export type ImageHubSecret = {
  email?: string;
  server: string;
  status?: 'Pending' | 'Consistent';
  username: string;
};
export type RegenerateDeployKeyAndSecretData = {
  privateKey?: string;
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
