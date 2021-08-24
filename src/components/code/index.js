import { Button, Card, Icon } from '@equinor/eds-core-react';
import {
  copy as copy_icon,
  download as download_icon,
} from '@equinor/eds-icons';
import React from 'react';

import { copyToClipboard } from '../../utils/string';

import './style.css';

export const Code = ({ copy, download, filename, children }) => {
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
            <Button variant="ghost" onClick={handleCopy}>
              <Icon data={copy_icon} /> Copy
            </Button>
          )}
          {download && (
            <Button
              variant="ghost"
              onClick={() => handleDownload(`${filename}.txt`, children)}
            >
              <Icon data={download_icon} /> Download
            </Button>
          )}
        </div>
      )}
      <Card className="code code__card">{children}</Card>
    </>
  );
};

export default Code;
