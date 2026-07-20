import { Button, Typography } from '@equinor/eds-core-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Dialog } from './Dialog'

/**
 * A modal dialog that overlays the page to present focused content or confirmations. It is built on top of the EDS Dialog component and provides additional styling and functionality.
 *
 * Visit https://storybook.eds.equinor.com/?path=/docs/eds-2-0-beta-feedback-dialog--docs for EDS documentation on the Dialog component.
 */
const meta = {
  title: 'Primitives/Dialog',
  component: Dialog,
  subcomponents: {
    'Dialog.Header': Dialog.Header,
    'Dialog.CustomContent': Dialog.CustomContent,
    'Dialog.Actions': Dialog.Actions,
  },
  tags: ['autodocs'],
  argTypes: {
    // `children` is composed with the Dialog.* subcomponents, so hide it from the controls table.
    children: { control: false },
    open: {
      control: false,
      type: {
        required: true,
        name: 'boolean',
      },
    },
    onClose: { control: false },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { open: false },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}> Open dialog</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>Dialog title</Dialog.Title>
          </Dialog.Header>
          <Dialog.CustomContent>
            <Typography>This is the content of the dialog.</Typography>
          </Dialog.CustomContent>{' '}
          <Dialog.Actions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </>
    )
  },
}

export const WithWidth: Story = {
  args: { open: false, width: '700px' },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}> Open dialog</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>Dialog title</Dialog.Title>
          </Dialog.Header>
          <Dialog.CustomContent>This is the content of the dialog.</Dialog.CustomContent>
          <Dialog.Actions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </>
    )
  },
}

export const WithContentAutoGap: Story = {
  args: { open: false, contentAutoGap: true },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}> Open dialog</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>Dialog title</Dialog.Title>
          </Dialog.Header>
          <Dialog.CustomContent>
            <Typography>This is the content of the dialog.</Typography>
            <Typography>It has multiple elements with a consistent gap between them.</Typography>
          </Dialog.CustomContent>
          <Dialog.Actions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </>
    )
  },
}

export const FullStory: Story = {
  args: { open: false, width: '600px', contentAutoGap: true },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}> Open dialog</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>Dialog title</Dialog.Title>
          </Dialog.Header>
          <Dialog.CustomContent>
            <Typography>This is the content of the dialog.</Typography>
            <Typography>It has multiple elements with a consistent gap between them.</Typography>
          </Dialog.CustomContent>
          <Dialog.Actions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </>
    )
  },
}
