import { Button, Icon } from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';
import { FunctionComponent, useEffect, useState } from 'react';

import { parseImageTag } from '../../utils/docker';
import { copyToClipboard } from '../../utils/string';

export const DockerImage: FunctionComponent<{ path: string }> = ({ path }) => {
  const [tag, setTag] = useState('');

  useEffect(() => {
    setTag(parseImageTag(path)?.image);
  }, [path]);

  return (
    <>
      <strong>{tag}</strong>{' '}
      <Button variant="ghost" onClick={() => copyToClipboard(tag)}>
        <Icon data={copy} /> Copy
      </Button>
    </>
  );
};
