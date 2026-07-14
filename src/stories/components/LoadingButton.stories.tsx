import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'
import { LoadingButton } from '../../components/button/loading-button'

/** Button that shows a spinner and disables itself while its async `onClick` handler is running. */
const meta = {
  title: 'Components/LoadingButton',
  component: LoadingButton,
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Click me to start loading',
    onClick: async () => {
      await asyncTimeout(1000)
    },
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', {
      name: 'Click me to start loading',
    })

    await button.click()

    const spinner = within(button).getByRole('progressbar')
    await expect(spinner).toBeVisible()

    await waitFor(() => expect(canvas.queryByRole('progressbar')).not.toBeInTheDocument())
  },
}

const asyncTimeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
