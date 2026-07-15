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
      await asyncTimeout(300)
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    const button = canvas.getByRole('button', {
      name: 'Click me to start loading',
    })

    await step('Click the button to start loading', async () => {
      await userEvent.click(button)
    })

    await step('Expect the spinner to be visible', async () => {
      const spinner = within(button).queryByRole('progressbar')
      await expect(spinner).toBeVisible()
    })

    await step('Wait for the spinner to disappear', async () => {
      await waitFor(() => {
        const spinner = within(button).queryByRole('progressbar')
        expect(spinner).toBeNull()
      })
    })
  },
}

const asyncTimeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
