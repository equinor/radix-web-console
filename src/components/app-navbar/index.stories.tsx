import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppNavbar } from '.'

/** Sidebar navigation for a single application, linking to its environments, jobs, configuration and other sections. */
const meta = {
  title: 'Domain/App Nav Bar',
  component: AppNavbar,
  tags: ['autodocs'],
} satisfies Meta<typeof AppNavbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { appName: 'radix-api' },
  render: (args) => (
    <div className="grid layout-app">
      <div className="layout-app__sidebar">
        <AppNavbar appName={args.appName} />
      </div>
      <div className="layout-app__content">Content goes here</div>
    </div>
  ),
}
