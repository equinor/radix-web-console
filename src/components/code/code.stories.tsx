import type { Meta, StoryObj } from '@storybook/react-vite'
import { Code } from './code'

/**
 * `Code` renders monospace, preformatted text inside a card. It is handy for
 * showing copy/paste-friendly values and other machine output.
 *
 * Key features:
 * - Preserves whitespace and line breaks with a monospace font.
 * - Optional **Copy** and **Download** toolbar actions (see the `copy` and
 *   `download` args).
 * - ANSI escape codes are stripped before rendering (and before copy/download).
 */
const meta = {
  title: 'Primitives/Code',
  component: Code,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'The text to render. ANSI escape codes are stripped.',
    },
    copy: {
      control: 'boolean',
      description: 'Show a "Copy" button that copies the content to the clipboard.',
    },
    download: {
      control: 'boolean',
      description: 'Show a "Download" button that saves the content to a file.',
    },
    filename: {
      control: 'text',
      description: 'File name used when the content is downloaded.',
    },
  },
} satisfies Meta<typeof Code>

export default meta
type Story = StoryObj<typeof meta>

const SINGLE_LINE = 'The quick brown fox jumps over the lazy dog.'

const MULTI_LINE = ['first line', 'second line', 'third line'].join('\n')

const JSON_SNIPPET = JSON.stringify(
  {
    name: 'example',
    enabled: true,
    count: 3,
    tags: ['alpha', 'beta'],
  },
  null,
  2
)

/**
 * The most common use: a short value the user needs to read or copy.
 */
export const Default: Story = {
  args: {
    content: SINGLE_LINE,
    copy: true,
  },
}

/** Multi-line content keeps its line breaks and monospace alignment. */
export const MultiLine: Story = {
  args: {
    content: MULTI_LINE,
    copy: true,
  },
}

/** Formatted JSON, with copy and download actions enabled. */
export const Json: Story = {
  args: {
    content: JSON_SNIPPET,
    copy: true,
    download: true,
    filename: 'example.json',
  },
}

/** Without any toolbar actions, the content is shown read-only. */
export const ReadOnly: Story = {
  args: {
    content: SINGLE_LINE,
  },
}

/** A long, multi-line value to check scrolling and overflow. */
export const LongContent: Story = {
  args: {
    content: Array.from({ length: 60 }, (_, i) => `${String(i + 1).padStart(3, '0')}  ${SINGLE_LINE}`).join('\n'),
    copy: true,
    download: true,
  },
}

/** No content to render. */
export const Empty: Story = {
  args: {
    content: '',
    copy: true,
  },
}
