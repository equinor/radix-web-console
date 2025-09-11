import { Button, Card, Icon } from '@equinor/eds-core-react'
import { copy as copyIcon, download as downloadIcon } from '@equinor/eds-icons'
import { Terminal } from '@xterm/xterm'
import { clsx } from 'clsx'
import { type FunctionComponent, useEffect, useRef } from 'react'
import '@xterm/xterm/css/xterm.css'
import { FitAddon } from '@xterm/addon-fit'
import { copyToClipboard, copyToTextFile } from '../../utils/string'

export const WHITE = '\u001b[37m'
export const YELLOW = '\u001b[33m'
export const RED = '\u001b[31m'

import './style.css'

export type CodeProps = {
  copy?: boolean
  download?: boolean
  downloadCb?: () => unknown
  filename?: string
  content?: EventSource
  resizable?: boolean
}

export const Code: FunctionComponent<CodeProps & { children: string }> = ({
  copy,
  download,
  downloadCb,
  filename,
  children,
  content,
  resizable,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<Terminal>()

  useEffect(() => {
    if (!containerRef.current) return

    const fitAddon = new FitAddon()
    terminalRef.current = new Terminal({
      cursorBlink: true,
      fontFamily: 'var(--eds_typography_font-family_monospace)',
      fontSize: 14,
      lineHeight: 1.8,
      convertEol: true,
      disableStdin: true,
      theme: {},
    })
    terminalRef.current.loadAddon(fitAddon)
    terminalRef.current.open(containerRef.current)
    terminalRef.current.write(`${YELLOW}Starting stream...${WHITE}\r\n\r\n`)

    const observer = new ResizeObserver(() => {
      // biome-ignore lint/suspicious/noFocusedTests: false positive
      fitAddon.fit()
    })
    observer.observe(containerRef.current)

    return () => {
      terminalRef.current?.dispose()
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!terminalRef.current || !content) return

    content.onmessage = (event) => {
      terminalRef.current?.write(event.data)
    }
  }, [content])

  useEffect(() => {
    if (!terminalRef.current || !children) return

    terminalRef.current.clear()
    terminalRef.current.write(children)
  }, [children])

  return (
    <div className="code">
      {(copy || downloadCb) && (
        <div className="code__toolbar">
          <Button.Group>
            {copy && (
              <Button variant="ghost" onClick={() => copyToClipboard(children)}>
                <Icon data={copyIcon} /> Copy
              </Button>
            )}
            {download && (
              <Button
                variant="ghost"
                onClick={() => (downloadCb ? downloadCb() : copyToTextFile(filename ?? 'log.txt', children))}
              >
                <Icon data={downloadIcon} /> Download
              </Button>
            )}
          </Button.Group>
        </div>
      )}
      <Card className={clsx('code__card', { resizable: resizable })} ref={containerRef} />
    </div>
  )
}
