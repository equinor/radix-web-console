import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ExternalDNSBadgeTemplates,
  ExternalDNSStatusBadge,
} from '../../../components/status-badges/external-dns-status-badge'

const statuses = Object.keys(ExternalDNSBadgeTemplates)

/** Badge that shows the status of an external DNS alias (Consistent, Pending or Invalid). */
const meta = {
  title: 'Components/Status Badges/External DNS',
  component: ExternalDNSStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof ExternalDNSStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

/** The `Pending` status renders with the label "Missing". */
export const Pending: Story = { args: { status: 'Pending' } }
/** The `Consistent` status renders with the label "Valid". */
export const Consistent: Story = { args: { status: 'Consistent' } }
export const Invalid: Story = { args: { status: 'Invalid' } }
