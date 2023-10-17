import { Button, Icon, IconProps, Tooltip } from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';
import { FunctionComponent, useState } from 'react';

import { copyToClipboard } from '../../utils/string';

export const CompactCopyButton: FunctionComponent<{
  content: string;
  size?: IconProps['size'];
}> = ({ content, size = 16 }) => {
  const [copyTitle, setCopyTitle] = useState('Copy');

  return (
    <Tooltip title={copyTitle} placement="top" enterDelay={300}>
      <Button
        variant="ghost_icon"
        onMouseLeave={() => setCopyTitle('Copy')}
        onClick={() => {
          copyToClipboard(content);
          setCopyTitle('Copied');
        }}
      >
        <Icon data={copy} size={size} />
      </Button>
    </Tooltip>
  );
};
