import type { Meta, StoryObj } from '@storybook/react-vite'
import { BuildSecretBadgeTemplates, BuildSecretStatusBadge } from './build-secret-status-badge'

const statuses = Object.keys(BuildSecretBadgeTemplates)

/** Badge that shows whether a build secret has been provided (`Consistent`) or is still `Pending`. */
const meta = {
  title: 'Primitives/Status Badges/Build Secret',
  component: BuildSecretStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof BuildSecretStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = { args: { status: 'Pending' } }
export const Consistent: Story = { args: { status: 'Consistent' } }
