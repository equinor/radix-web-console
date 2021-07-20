import React from 'react';
import { Button, Icon, Card, Dialog } from '@equinor/eds-core-react';
import {
  copy as copy_icon,
  download as download_icon,
} from '@equinor/eds-icons';

import { copyToClipboard } from '../../utils/string';

import './style.css';

export const Code = ({ copy, download, filename, isScrollable, children }) => {
  const handleCopy = () => copyToClipboard(children);

  const handleDownload = (name, content) => {
    var atag = document.createElement('a');
    var file = new Blob([content], { type: 'text/plain' });
    atag.href = URL.createObjectURL(file);
    atag.download = name;
    atag.click();
  };

  return (
    <>
      {(copy || download) && (
        <div className="code__toolbar">
          {copy && (
            <Button variant="ghost" color="primary" onClick={handleCopy}>
              <Icon data={copy_icon} />
              Copy
            </Button>
          )}
          {download && (
            <Button
              variant="ghost"
              color="primary"
              onClick={() => handleDownload(filename + '.txt', children)}
            >
              <Icon data={download_icon} />
              Download
            </Button>
          )}
        </div>
      )}
      {isScrollable && (
        <Dialog className="code dialog">
          <Dialog.CustomContent scrollable>
            <Card className="code__card">{children}</Card>
          </Dialog.CustomContent>
        </Dialog>
      )}
      {!isScrollable && <Card className="code__card">{children}</Card>}
    </>
  );
};

export default Code;
