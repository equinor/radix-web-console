import { Typography } from '@equinor/eds-core-react'
import { Server } from 'miragejs'
import type { ComponentProps } from 'react'
import type {
  GetSearchApplicationsApiArg,
  GetSearchApplicationsApiResponse,
  ShowApplicationsApiResponse,
} from '../../store/radix-api'
import type {
  GetApplicationVulnerabilitySummariesApiArg,
  GetApplicationVulnerabilitySummariesApiResponse,
} from '../../store/scan-api'
import AppList from '.'

const testApps: ShowApplicationsApiResponse = [
  {
    name: 'radix-canary-golang',
    environments: [
      {
        name: 'dev',
        activeDeployment: {
          name: 'any-dev-deployment',
          activeFrom: new Date('2023-12-01T11:27:17Z').toISOString(),
          environment: 'dev',
          namespace: 'any-ns',
          repository: 'any-repo',
          status: 'Ready',
        },
      },
    ],

    latestJob: {
      name: 'latest job',
      created: new Date('2023-12-01T11:27:17Z').toISOString(),
      status: 'Failed',
      started: new Date('2023-12-01T11:27:17Z').toISOString(),
      ended: new Date('2023-12-01T12:16:54Z').toISOString(),
      triggeredFromWebhook: false,
    },
  },
  {
    name: 'radix-web-console',
    environments: [
      {
        name: 'dev',
        activeDeployment: {
          name: 'any-dev-deployment',
          activeFrom: new Date('2023-12-01T11:27:17Z').toISOString(),
          environment: 'dev',
          namespace: 'any-ns',
          repository: 'any-repo',
          status: 'Failed',
        },
      },
    ],
    latestJob: {
      name: 'latest job',
      created: new Date('2023-12-01T11:27:17Z').toISOString(),
      status: 'Running',
      started: new Date('2023-12-01T12:27:17Z').toISOString(),
      triggeredFromWebhook: false,
    },
  },
]

const testVulns: GetApplicationVulnerabilitySummariesApiResponse = [
  {
    name: testApps[0].name!,
    components: {
      dev: {
        image: 'image1',
        scanSuccess: true,
        scanTime: new Date().toISOString(),
        vulnerabilitySummary: { high: 3 },
      },
      prod: {
        image: 'image2',
        scanSuccess: true,
        scanTime: new Date().toISOString(),
        vulnerabilitySummary: { critical: 17, high: 5 },
      },
    },
  },
  {
    name: testApps[1].name!,
    components: {
      dev: {
        image: 'image1',
        scanSuccess: true,
        scanTime: new Date().toISOString(),
      },
      prod: {
        image: 'image2',
        scanSuccess: true,
        scanTime: new Date().toISOString(),
        vulnerabilitySummary: { high: 1, medium: 1, low: 6 },
      },
    },
  },
]

// Mock API response
new Server({
  routes() {
    // Mock response for ShowApplications
    this.get(
      '/api/v1/applications',
      (): ShowApplicationsApiResponse => [
        ...testApps.reduce<ShowApplicationsApiResponse>((obj, { name }) => [...obj, { name }], []),
        { name: 'app' },
        { name: 'another-app' },
        { name: 'yet-another-app' },
      ]
    )

    // Mock response for SearchApplications
    this.get(
      '/api/v1/applications/_search',
      (_, request): GetSearchApplicationsApiResponse => [
        ...testApps
          .filter(({ name }) => (request.queryParams as Pick<GetSearchApplicationsApiArg, 'apps'>)?.apps?.split(',').includes(name!))
          .reduce<GetSearchApplicationsApiResponse>((obj, app) => {
            return [...obj, app]
          }, []),
      ]
    )

    // Mock response for ApplicationVulnerabilitySummaries
    this.get(
      'scan-api/applications/vulnerabilities/:appName',
      (_, request): GetApplicationVulnerabilitySummariesApiResponse => [
        testVulns.find(({ name }) => name === (request.params as GetApplicationVulnerabilitySummariesApiArg)?.appName)!,
      ]
    )
  },
})

const testData: Array<{ description: string } & ComponentProps<typeof AppList>> = [
  {
    description: 'With applications, without favourites',
    // favouriteAppNames: [],
  },
  {
    description: 'With applications, with favourite',
    // favouriteAppNames: ['app'],
  },
  {
    description: 'With applications, with favourites',
    // favouriteAppNames: testApps.map(({ name }) => name),
  },
]

export default (
  <div style={{ maxWidth: '1000px' }}>
    {testData.map(({ description, ...rest }, i) => (
      <div key={i} style={{ margin: '1em', padding: '2em', border: '1px solid #000' }}>
        <Typography variant="h4">{description}</Typography>
        <AppList {...rest} />
      </div>
    ))}
  </div>
)
