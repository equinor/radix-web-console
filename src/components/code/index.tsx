import { Button, Card, Icon } from '@equinor/eds-core-react'
import { copy as copyIcon, download as downloadIcon } from '@equinor/eds-icons'
import { Terminal } from '@xterm/xterm'
import { clsx } from 'clsx'
import { type FunctionComponent, useEffect, useRef } from 'react'
import '@xterm/xterm/css/xterm.css'
import { FitAddon } from '@xterm/addon-fit'
import { copyToClipboard } from '../../utils/string'

import './style.css'

export type CodeProps = {
  copy?: boolean
  downloadCb?: () => unknown
  filename?: string
  content?: EventSource
  resizable?: boolean
}

export const Code: FunctionComponent<CodeProps & { children: string }> = ({
  copy,
  downloadCb,
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
    terminalRef.current.write('hello world\r\n')

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
            {downloadCb && (
              <Button variant="ghost" onClick={() => downloadCb()}>
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
