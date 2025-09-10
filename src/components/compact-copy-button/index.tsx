import { Button, Icon, type IconProps, Tooltip } from '@equinor/eds-core-react'
import { copy } from '@equinor/eds-icons'
import { type FunctionComponent, useState } from 'react'

import { copyToClipboard } from '../../utils/string'

export const CompactCopyButton: FunctionComponent<{
  content: string
  size?: IconProps['size'] | 14 | 12
}> = ({ content, size = 16 }) => {
  const [copyTitle, setCopyTitle] = useState('Copy')
  const buttonSize = size + 8 + Math.floor(size / 8)

  return (
    <Tooltip title={copyTitle} placement="top" enterDelay={300}>
      <Button
        variant="ghost_icon"
        style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
        onMouseLeave={() => setCopyTitle('Copy')}
        onClick={() => {
          copyToClipboard(content)
          setCopyTitle('Copied')
        }}
      >
        <Icon data={copy} size={size as IconProps['size']} />
      </Button>
    </Tooltip>
  )
}
