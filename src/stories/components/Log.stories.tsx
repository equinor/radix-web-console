import type { Meta, StoryObj } from '@storybook/react-vite'
import { Log, RED, WHITE, YELLOW } from '../../components/code/log'

/**
 * `Log` renders text inside an [xterm.js](https://xtermjs.org/) terminal. It is
 * used to display log output such as build logs, pipeline output and container
 * logs.
 *
 * Key features:
 * - Renders ANSI escape codes (colors, bold, etc.) so colored log output looks
 *   the same as it does in a real terminal.
 * - Preserves monospace formatting, which keeps tables and ASCII art aligned.
 * - Optional **Copy** and **Download** toolbar actions (see the `copy` and
 *   `download` args). Copied/downloaded text is stripped of ANSI codes.
 * - Selecting text and pressing `Cmd/Ctrl + C` copies the selection.
 */
const meta = {
  title: 'Components/Log',
  component: Log,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'The log text to render. May contain ANSI escape codes.',
    },
    copy: {
      control: 'boolean',
      description: 'Show a "Copy" button that copies the log to the clipboard.',
    },
    download: {
      control: 'boolean',
      description: 'Show a "Download" button that saves the log to a file.',
    },
    filename: {
      control: 'text',
      description: 'File name used when the log is downloaded.',
    },
  },
} satisfies Meta<typeof Log>

export default meta
type Story = StoryObj<typeof meta>

const BUILD_LOG = [
  'Cloning repository...',
  'Resolving dependencies...',
  'Building application...',
  'Running tests...',
  'Build succeeded in 42s',
].join('\n')

/**
 * A typical build/pipeline log with plain text lines. This is the most common
 * way the component is used.
 */
export const Default: Story = {
  args: {
    content: BUILD_LOG,
  },
}

/**
 * The **Copy** and **Download** toolbar actions let users grab the full log.
 * When downloaded, the file uses the `filename` arg (defaults to `log.txt`).
 */
export const WithToolbarActions: Story = {
  args: {
    copy: true,
    download: true,
    filename: 'build.log',
    content: BUILD_LOG,
  },
}

/**
 * ANSI escape codes are rendered as real colors. Here `YELLOW` marks warnings
 * and `RED` marks errors, resetting back to `WHITE` afterwards.
 */
export const WithAnsiColors: Story = {
  args: {
    copy: true,
    content: [
      `${WHITE}Starting deployment...`,
      `${YELLOW}warning: 2 deprecated APIs in use${WHITE}`,
      'Applying configuration...',
      `${RED}error: failed to reach cluster endpoint${WHITE}`,
      'Retrying (1/3)...',
      'Deployment completed with warnings',
    ].join('\n'),
  },
}

/**
 * A long log demonstrates the terminal's scrollback. The viewport stays fixed
 * while the content scrolls.
 */
export const LongLog: Story = {
  args: {
    copy: true,
    download: true,
    content: Array.from(
      { length: 100 },
      (_, i) => `[${String(i + 1).padStart(3, '0')}] processing item ${i + 1} of 100`
    ).join('\n'),
  },
}

/**
 * Because output is monospaced, structured text such as tables stays aligned.
 */
export const TabularOutput: Story = {
  args: {
    content: [
      'NAME              READY   STATUS      RESTARTS   AGE',
      'web-frontend      1/1     Running     0          5d',
      'api-server        2/2     Running     1          5d',
      'worker-queue      0/1     Pending     0          3m',
      'db-migration      0/1     Completed   0          5d',
    ].join('\n'),
  },
}

/**
 * ASCII art banners (like the Spring Boot startup banner) are preserved exactly
 * thanks to monospace rendering.
 */
export const AsciiArtBanner: Story = {
  args: {
    content:
      '2021-09-15 13:39:32.243  INFO 1 --- [           main] o.s.boot.SpringApplication               : \n\n        .########.....###.....######..##....##.########.##....##.########.\n        .##.....##...##.##...##....##.##...##..##.......###...##.##.....##\n        .##.....##..##...##..##.......##..##...##.......####..##.##.....##\n        .########..##.....##.##.......#####....######...##.##.##.##.....##\n        .##.....##.#########.##.......##..##...##.......##..####.##.....##\n        .##.....##.##.....##.##....##.##...##..##.......##...###.##.....##\n        .########..##.....##..######..##....##.########.##....##.########.\n        \n         :: Running Spring Boot 2.5.4 ::',
  },
}
