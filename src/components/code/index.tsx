import { Button, Card, Icon } from '@equinor/eds-core-react'
import { copy as copyIcon, download as downloadIcon } from '@equinor/eds-icons'
import { Terminal } from '@xterm/xterm'
import { clsx } from 'clsx'
import { type FunctionComponent, type Ref, useEffect, useImperativeHandle, useRef } from 'react'
import '@xterm/xterm/css/xterm.css'
import { FitAddon } from '@xterm/addon-fit'
import { SerializeAddon } from '@xterm/addon-serialize'
import stripAnsi from 'strip-ansi'
import { copyToClipboard, copyToTextFile } from '../../utils/string'

export const WHITE = '\u001b[37m'
export const YELLOW = '\u001b[33m'
export const RED = '\u001b[31m'

import './style.css'
import { LoadingButton } from '../button/loading-button'

export type CodeRef = {
  write: (data: string) => void
}

export type CodeProps = {
  copy?: boolean
  download?: boolean
  downloadCb?: () => Promise<string>
  filename?: string
  content?: EventSource
  resizable?: boolean
  ref?: Ref<CodeRef | undefined>
}

export const Code: FunctionComponent<CodeProps> = ({ copy, download, downloadCb, filename, resizable, ref }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<Terminal | undefined>(undefined)
  const serializeAddon = useRef<SerializeAddon | undefined>(undefined)

  useEffect(() => {
    if (!containerRef.current) return

    const fitAddon = new FitAddon()
    serializeAddon.current = new SerializeAddon()
    terminalRef.current = new Terminal({
      cursorBlink: true,
      fontFamily: 'var(--eds_typography_font-family_monospace)',
      fontSize: 14,
      lineHeight: 1.8,
      convertEol: true,
      disableStdin: true,
      scrollback: 1000,
      theme: {},
    })

    terminalRef.current.loadAddon(fitAddon)
    terminalRef.current.loadAddon(serializeAddon.current)
    terminalRef.current.open(containerRef.current)
    terminalRef.current.write(`${YELLOW}Starting stream...${WHITE}\r\n\r\n`)

    const observer = new ResizeObserver(() => {
      fitAddon.fit()
    })
    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      terminalRef.current?.dispose()
    }
  }, [])

  useImperativeHandle(ref, () => {
    return {
      write: (data: string) => terminalRef.current!.write(data),
      clear: () => terminalRef.current!.clear(),
    }
  })

  const getContent = async () => {
    let content = ''
    if (downloadCb) {
      content = await downloadCb()
    } else {
      content = serializeAddon.current?.serialize() ?? ''
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
      <Card className={clsx('code__card', { resizable: resizable })} ref={containerRef} />
    </div>
  )
}
