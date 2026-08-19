import type { Meta, StoryObj } from '@storybook/react-vite'
import { addMinutes } from 'date-fns'
import { AppListItem } from '../AppListItem'
import { AppListItemStatus } from './AppListItemStatus'

/** The status slot of an app list row: last job time, vulnerabilities, utilization and application status. */
const meta = {
  title: 'Data Display/App List Item Status With Status',
  component: AppListItemStatus,
  tags: ['autodocs'],
  args: {
    isLoading: false,
  },
  decorators: [
    (Story) => (
      <AppListItem appName="my-app" handler={() => {}}>
        <Story />
      </AppListItem>
    ),
  ],
} satisfies Meta<typeof AppListItemStatus>

export default meta
type Story = StoryObj<typeof meta>

export const WithProblems: Story = {
  args: {
    latestJob: {
      name: 'running-job-app',
      created: addMinutes(new Date(), -15).toISOString(),
      started: addMinutes(new Date(), -14).toISOString(),
      status: 'Failed',
      pipeline: 'build-deploy',
      triggeredFromWebhook: false,
    },
    vulnerabilitySummary: [
      {
        components: {
          web: {
            image: 'test:test',
            scanSuccess: true,
            scanTime: '2020-02-02T12:00:00Z',
            vulnerabilitySummary: {
              critical: 2,
              high: 1,
              medium: 2,
              low: 5,
            },
          },
        },
        name: 'dev',
      },
    ],
    utilization: {
      environments: {
        dev: {
          components: {
            web: {
              replicas: {
                'web-abcd-1': {
                  cpuAverage: 1.1,
                  cpuRequests: 1.0,
                  memoryMaximum: 900,
                  memoryRequests: 1000,
                },
              },
            },
          },
        },
      },
    },
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const Deleted: Story = {
  args: {
    isDeleted: true,
  },
}
