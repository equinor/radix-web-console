import type { Application, JobSummary } from '../../../../store/radix-api'

export const mockRegistration: Application['registration'] = {
  name: 'my-app',
  appId: '01HZX0000000000000000000',
  repository: 'https://github.com/equinor/my-app',
  configBranch: 'main',
  radixConfigFullName: 'radixconfig.yaml',
  creator: 'jane.doe@equinor.com',
  owner: 'jane.doe@equinor.com',
  adGroups: [],
  adUsers: [],
  readerAdGroups: [],
  readerAdUsers: [],
}

export const mockApplication: Pick<Application, 'name' | 'registration'> = {
  name: 'my-app',
  registration: mockRegistration,
}

export const mockRunningJob: JobSummary = {
  name: 'radix-pipeline-20240101120000-abcde',
  appName: 'my-app',
  created: '2024-01-01T12:00:00Z',
  status: 'Running',
  pipeline: 'apply-config',
  triggeredBy: 'jane.doe',
  triggeredFromWebhook: false,
}

export const mockFailedJob: JobSummary = {
  ...mockRunningJob,
  name: 'radix-pipeline-20240101110000-fghij',
  created: '2024-01-01T11:00:00Z',
  status: 'Failed',
}
