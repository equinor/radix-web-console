import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppNavbar } from '../../components/app-navbar'

const meta = {
  title: 'Components/AppNavBar',
  component: AppNavbar,
} satisfies Meta<typeof AppNavbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid layout-app">
      <div className="layout-app__sidebar">
        <AppNavbar appName="radix-api" />
      </div>
      <div className="layout-app__content">Content goes here</div>
    </div>
  ),
}
