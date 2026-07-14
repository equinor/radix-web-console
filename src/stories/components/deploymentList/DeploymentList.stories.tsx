import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeploymentList } from '../../../components/deployments-list'
import { mockedDeployments, repository } from './deploymentList.mock'

const meta = {
  title: 'Components/DeploymentList',
  component: DeploymentList,
  tags: ['autodocs'],
  args: {
    appName: 'radix-web-console',
    deployments: mockedDeployments,
    repository,
  },
} satisfies Meta<typeof DeploymentList>

export default meta
type Story = StoryObj<typeof meta>

/** Deployment history with active, inactive and promoted deployments. The Date/Time, Environment and Type of job columns are sortable. */
export const Default: Story = {}

/** Rendered inside an environment (`inEnv`): the Environment and Status columns are hidden. */
export const InEnvironment: Story = {
  args: {
    inEnv: true,
    deployments: mockedDeployments.filter((x) => x.environment === 'qa'),
  },
}

/** Only the most recent deployments, capped with the `limit` prop. */
export const Limited: Story = {
  args: {
    limit: 2,
  },
}

/** No deployments yet. */
export const Empty: Story = {
  args: {
    deployments: [],
  },
}
