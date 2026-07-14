import type { Meta, StoryObj } from '@storybook/react-vite'
import { BuildSecretStatusBadge } from '../../../components/status-badges/build-secret-status-badge'

const statuses = ['Pending', 'Consistent'] as const

const meta = {
  title: 'Components/Status Badges/Build Secret',
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
