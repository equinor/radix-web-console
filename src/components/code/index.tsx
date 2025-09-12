import { Button, Card, Icon } from '@equinor/eds-core-react'
import { copy as copyIcon, download as downloadIcon } from '@equinor/eds-icons'
import { Terminal } from '@xterm/xterm'
import { clsx } from 'clsx'
import { type FunctionComponent, type Ref, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import '@xterm/xterm/css/xterm.css'
import { SerializeAddon } from '@xterm/addon-serialize'
import stripAnsi from 'strip-ansi'
import { copyToClipboard, copyToTextFile } from '../../utils/string'
import './style.css'
import { LoadingButton } from '../button/loading-button'

export const WHITE = '\u001b[37m'
export const YELLOW = '\u001b[33m'
export const RED = '\u001b[31m'

export type CodeProps = {
  copy?: boolean
  download?: boolean
  downloadCb?: () => Promise<string>
  filename?: string
  content?: EventSource
  ref?: Ref<Terminal | undefined>
}

export const Code: FunctionComponent<CodeProps> = ({ copy, download, downloadCb, filename, ref }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const serializeAddon = useMemo(() => new SerializeAddon(), [])
  const terminal = useMemo(
    () =>
      new Terminal({
        cursorBlink: true,
        fontFamily: 'var(--eds_typography_font-family_monospace)',
        fontSize: 14,
        lineHeight: 1.8,
        convertEol: true,
        disableStdin: true,
        scrollback: 1000,
        logLevel: 'warn',
        theme: {},
      }),
    []
  )
  useImperativeHandle(ref, () => terminal)

  useEffect(() => {
    if (!containerRef.current) return

    terminal.loadAddon(serializeAddon)
    terminal.open(containerRef.current)
    terminal.write(`${YELLOW}Starting stream...${WHITE}\r\n\r\n`)

    return () => {
      terminal?.dispose()
    }
  }, [serializeAddon, terminal])

  const getContent = async () => {
    let content = ''
    if (downloadCb) {
      content = await downloadCb()
    } else {
      content = serializeAddon.serialize() ?? ''
    }
    content = stripAnsi(content)

    return content
  }

  return (
    <div className="code">
      {(copy || download) && (
        <div className="code__toolbar">
          <Button.Group>
            {copy && (
              <LoadingButton variant="ghost" onClick={async () => copyToClipboard(await getContent())}>
                <Icon data={copyIcon} /> Copy
              </LoadingButton>
            )}
            {download && (
              <LoadingButton
                variant="ghost"
                onClick={async () => copyToTextFile(filename ?? 'log.txt', await getContent())}
              >
                <Icon data={downloadIcon} /> Download
              </LoadingButton>
            )}
          </Button.Group>
        </div>
      )}
      <Card className={clsx('code__card', { resizable: false })} ref={containerRef} />
    </div>
  )
}
