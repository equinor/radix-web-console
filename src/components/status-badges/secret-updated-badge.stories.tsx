import type { Meta, StoryObj } from '@storybook/react-vite'
import { SecretUpdatedBadge } from './secret-updated-badge'

/** Badge that shows when a secret was last updated as a relative time, or "Unknown" when no timestamp is available. */
const meta = {
  title: 'Primitives/Status Badges/Secret Updated',
  component: SecretUpdatedBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof SecretUpdatedBadge>

export default meta
type Story = StoryObj<typeof meta>

/** When an `updated` timestamp is provided, it renders a relative time. */
export const Updated: Story = { args: { updated: new Date().toISOString() } }
/** Without a timestamp it falls back to "Unknown". */
export const Unknown: Story = { args: { updated: undefined } }
