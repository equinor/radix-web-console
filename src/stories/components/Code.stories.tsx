import type { Meta, StoryObj } from '@storybook/react-vite'
import { Code } from '../../components/code/code'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Code',
  component: Code,
  tags: ['autodocs'],
} satisfies Meta<typeof Code>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: '<div>This is a code snippet.</div>',
  },
}
