import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from '.'

/** Navigational breadcrumb trail; the final entry (without a `to`) marks the current page. */
const meta = {
  title: 'Primitives/Breadcrumb',
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

/** Only the current page, with no ancestors to link back to. */
export const SingleItem: Story = {
  args: {
    links: [{ label: 'Applications' }],
  },
}

/** Entries with an empty `label` are skipped, so partial/loading trails render without gaps. */
export const WithEmptyLabels: Story = {
  args: {
    links: [
      { label: 'Applications', to: '/applications' },
      { label: '', to: '/applications/radix-api' },
      { label: 'prod', to: '/applications/radix-api/env/prod' },
      { label: '' },
    ],
  },
}

/** A deep trail with long segment names to check wrapping and truncation. */
export const LongTrail: Story = {
  args: {
    links: [
      { label: 'Applications', to: '/applications' },
      { label: 'radix-web-console', to: '/applications/radix-web-console' },
      { label: 'production', to: '/applications/radix-web-console/env/production' },
      { label: 'web', to: '/applications/radix-web-console/env/production/component/web' },
      { label: 'replicas', to: '/applications/radix-web-console/env/production/component/web/replicas' },
      { label: 'web-console-8fd44cc58-6zmjt-a-very-long-replica-name' },
    ],
  },
}
