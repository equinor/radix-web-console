import { Button, Card, Icon } from '@equinor/eds-core-react'
import { copy as copyIcon, download as downloadIcon } from '@equinor/eds-icons'
import { Terminal } from '@xterm/xterm'
import { useEffect, useMemo, useRef } from 'react'
import '@xterm/xterm/css/xterm.css'
import { SerializeAddon } from '@xterm/addon-serialize'
import stripAnsi from 'strip-ansi'
import { copyToClipboard, copyToTextFile } from '../../utils/string'
import './style.css'
import { FitAddon } from '@xterm/addon-fit'
import { LoadingButton } from '../button/loading-button'

export const WHITE = '\u001b[37m'
export const YELLOW = '\u001b[33m'
export const RED = '\u001b[31m'

export type StreamingLogProps = {
  copy?: boolean
  download?: boolean
  downloadCb?: () => Promise<string>
  filename?: string
  eventStreamUrl: string
}

export const StreamingLog = ({ copy, download, downloadCb, filename, eventStreamUrl }: StreamingLogProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const serializeAddon = useMemo(() => new SerializeAddon(), [])
  const terminal = useRef(
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
    })
  )

  useEffect(() => {
    if (!containerRef.current) return

    const fit = new FitAddon()
    terminal.current.loadAddon(fit)
    terminal.current.loadAddon(serializeAddon)
    terminal.current.open(containerRef.current)
    fit.fit()
    terminal.current.writeln(`${YELLOW}Starting stream...${WHITE}`)

    const eventSource = new EventSource(eventStreamUrl)

    eventSource.onmessage = (event) => {
      terminal.current.writeln(event.data)
    }

    eventSource.onerror = () => {
      eventSource.close()
      terminal.current.writeln(`${YELLOW}Stream closed.${WHITE}`)
      terminal.current.options.cursorBlink = false
    }

    return () => {
      eventSource.close()
    }
  }, [serializeAddon, eventStreamUrl])

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
      <Card className="code__card" ref={containerRef} />
    </div>
  )
}

export type LogProps = {
  copy?: boolean
  download?: boolean
  downloadCb?: () => Promise<string>
  filename?: string
  content: string
}

export const Log = ({ copy, download, downloadCb, filename, content }: LogProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const serializeAddon = useMemo(() => new SerializeAddon(), [])
  const terminal = useRef(
    new Terminal({
      cursorBlink: false,
      fontFamily: 'var(--eds_typography_font-family_monospace)',
      fontSize: 14,
      lineHeight: 1.8,
      convertEol: true,
      disableStdin: true,
      scrollback: 1000,
      logLevel: 'warn',
      theme: {},
    })
  )

  useEffect(() => {
    if (!containerRef.current) return

    const fit = new FitAddon()
    terminal.current.loadAddon(fit)
    terminal.current.loadAddon(serializeAddon)
    terminal.current.open(containerRef.current)
    fit.fit()
    terminal.current.writeln(`${YELLOW}Starting stream...${WHITE}`)

    terminal.current.writeln(content)
    terminal.current.writeln(`${YELLOW}Stream completed.${WHITE}`)
  }, [serializeAddon, content])

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
      <Card className="code__card" ref={containerRef} />
    </div>
  )
}
