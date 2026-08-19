import type { Meta, StoryObj } from '@storybook/react-vite'
import { addMinutes } from 'date-fns'
import { AppListItem } from './AppListItem'
import { AppListItemStatus } from './components/AppListItemStatus'

/** A row in the applications list showing an app's name and favorite state. Status is provided via the optional slot. */
const meta = {
  title: 'Data Display/App List Item',
  component: AppListItem,
  tags: ['autodocs'],
  args: {
    onToggleFavorite: () => {},
  },
} satisfies Meta<typeof AppListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    appName: 'radix-api',
  },
}

export const FavoriteApp: Story = {
  args: {
    appName: 'favorite-app',
    isFavorite: true,
  },
}

/** With a status slot filled in, as `AppListItemWithStatuses` does for favorites. */
export const WithStatus: Story = {
  args: {
    appName: 'favorite-app-with-problems',
    isFavorite: true,
    children: (
      <AppListItemStatus
        isLoading={false}
        latestJob={{
          name: 'running-job-app',
          created: addMinutes(new Date(), -15).toISOString(),
          started: addMinutes(new Date(), -14).toISOString(),
          status: 'Failed',
          pipeline: 'build-deploy',
          triggeredFromWebhook: false,
        }}
        vulnerabilitySummary={[
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
        ]}
        utilization={{
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
        }}
      />
    ),
  },
}

export const Skeleton: Story = {
  args: {
    appName: 'placeholder-app',
    isPlaceholder: true,
  },
}
