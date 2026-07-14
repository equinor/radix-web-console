import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from '../../components/breadcrumb'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    links: [
      { label: 'Applications', to: '/applications' },
      { label: 'radix-api', to: '/applications/radix-api' },
      { label: 'prod', to: '/applications/radix-api/env/prod' },
      { label: 'server-8fd44cc58-6zmjt' },
    ],
  },
}
