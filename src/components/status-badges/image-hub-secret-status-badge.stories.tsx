import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageHubSecretBadgeTemplates, ImageHubSecretStatusBadge } from './image-hub-secret-status-badge'

const statuses = Object.keys(ImageHubSecretBadgeTemplates)

/** Badge that shows whether a private image hub secret is set (`Consistent`) or still `Pending`. */
const meta = {
  title: 'Primitives/Status Badges/Image Hub Secret',
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
