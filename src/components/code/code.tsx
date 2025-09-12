import { Button, Card, Icon } from '@equinor/eds-core-react'
import { copy as copyIcon, download as downloadIcon } from '@equinor/eds-icons'
import type { FunctionComponent } from 'react'
import '@xterm/xterm/css/xterm.css'
import { copyToClipboard, copyToTextFile } from '../../utils/string'
import './style.css'
import { LoadingButton } from '../button/loading-button'

export const WHITE = '\u001b[37m'
export const YELLOW = '\u001b[33m'
export const RED = '\u001b[31m'

export type CodeProps = {
  copy?: boolean
  download?: boolean
  filename?: string
  content: string
}

export const Code: FunctionComponent<CodeProps> = ({ copy, download, content, filename }) => {
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
        <pre>{content}</pre>
      </Card>
    </div>
  )
}
