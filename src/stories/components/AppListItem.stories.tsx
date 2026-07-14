import type { Meta, StoryObj } from '@storybook/react-vite'
import { addMinutes } from 'date-fns'
import { AppListItem } from '../../components/app-list-item'

/** A row in the applications list showing an app's name, favourite state, latest job status, vulnerabilities and resource utilization. */
const meta = {
  title: 'Components/AppListItem',
  component: AppListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof AppListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    appName: 'radix-api',
    handler: () => {},
    isLoading: false,
  },
}

export const FavoriteApp: Story = {
  args: {
    appName: 'favorite-app',
    handler: () => {},
    isLoading: false,
    isFavourite: true,
  },
}

export const FavoriteAppWithProblems: Story = {
  args: {
    appName: 'favorite-app-with-problems',
    handler: () => {},
    isLoading: false,
    latestJob: {
      name: 'running-job-app',
      created: addMinutes(new Date(), -15).toISOString(),
      started: addMinutes(new Date(), -14).toISOString(),
      status: 'Running',
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
    isFavourite: true,
    showStatus: true,
  },
}

/**
 * TODO: Should this be like this?
 * Loading is not visible without showStatus, but we still want to be able to test it in Storybook.
 */
export const LoadingWithoutStatus: Story = {
  args: {
    appName: 'loading-app',
    handler: () => {},
    isLoading: true,
  },
}

export const LoadingWithStatus: Story = {
  args: {
    appName: 'loading-app',
    handler: () => {},
    isLoading: true,
    showStatus: true,
  },
}

export const Placeholder: Story = {
  args: {
    appName: 'placeholder-app',
    handler: () => {},
    isLoading: false,
    isPlaceholder: true,
  },
}

/**
 * TODO: Should this be like this?
 * Deleted is not visible without showStatus, but we still want to be able to test it in Storybook.
 */
export const DeletedWithoutStatus: Story = {
  args: {
    appName: 'deleted-app',
    handler: () => {},
    isLoading: false,
    isDeleted: true,
  },
}

export const DeletedWithStatus: Story = {
  args: {
    appName: 'deleted-app',
    handler: () => {},
    isLoading: false,
    isDeleted: true,
    isFavourite: false,
    showStatus: true,
  },
}
