import { Button, Card, Icon } from '@equinor/eds-core-react'
import { copy as copyIcon, download as downloadIcon } from '@equinor/eds-icons'
import { useMemo } from 'react'
import '@xterm/xterm/css/xterm.css'
import { copyToClipboard, copyToTextFile } from '../../utils/string'
import './style.css'
import stripAnsi from 'strip-ansi'
import { LoadingButton } from '../button/loading-button'

export type CodeProps = {
  copy?: boolean
  download?: boolean
  filename?: string
  content: string
  className?: string
}

export const Code = ({ copy, download, content, filename }: CodeProps) => {
  const cleaned = useMemo(() => stripAnsi(content), [content])

  return (
    <div className="code">
      {(copy || download) && (
        <div className="code__toolbar">
          <Button.Group>
            {copy && (
              <LoadingButton variant="ghost" onClick={async () => copyToClipboard(content)}>
                <Icon data={copyIcon} /> Copy
              </LoadingButton>
            )}
            {download && (
              <LoadingButton variant="ghost" onClick={async () => copyToTextFile(filename ?? 'log.txt', content ?? '')}>
                <Icon data={downloadIcon} /> Download
              </LoadingButton>
            )}
          </Button.Group>
        </div>
      )}
      <Card className="code__card">
        <pre>{cleaned}</pre>
      </Card>
    </div>
  )
}
