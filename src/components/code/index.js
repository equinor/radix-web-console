import { Button, Card, Icon } from '@equinor/eds-core-react';
import {
  copy as copy_icon,
  download as download_icon,
} from '@equinor/eds-icons';
import { React, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '../../utils/string';

import './style.css';

const scollToBottom = (elementRef) => {
  // HACK elementRef.scrollHeight is incorrect when called directly
  // the callback in setTimeout is scheduled as a task to run after
  // PageCreateApplication has rendered DOM... it seems
  setTimeout(() => {
    if (elementRef && elementRef.scrollTo) {
      elementRef.scrollTo(0, elementRef.scrollHeight);
    }
  }, 0);
};

export const Code = ({
  copy,
  download,
  filename,
  children,
  autoscroll,
  resizable,
}) => {
  const [scrollOffsetFromBottom, setScrollOffsetFromBottom] = useState(0);
  const scrollContainer = useRef();

  const handleScroll = (ev) => {
    const node = ev.target;
    setScrollOffsetFromBottom(
      node.scrollHeight - node.scrollTop - node.clientHeight
    );
  };

  useEffect(() => {
    autoscroll &&
      scrollOffsetFromBottom === 0 &&
      scollToBottom(scrollContainer.current);
  });

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
      <Card
        className={`${'code code__card'}${resizable ? ' resizable' : ''}`}
        ref={scrollContainer}
        onScroll={handleScroll}
      >
        {children}
      </Card>
    </>
  );
};

export default Code;
