import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageHubSecretStatusBadge } from '../../../components/status-badges/image-hub-secret-status-badge'

const statuses = ['Pending', 'Consistent'] as const

const meta = {
  title: 'Components/Status Badges/Image Hub Secret',
  component: ImageHubSecretStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof ImageHubSecretStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = { args: { status: 'Pending' } }
export const Consistent: Story = { args: { status: 'Consistent' } }
