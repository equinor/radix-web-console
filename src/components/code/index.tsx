import { Button, Card, Icon } from '@equinor/eds-core-react';
import { copy, download } from '@equinor/eds-icons';
import { UIEvent, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '../../utils/string';

import './style.css';

export interface CodeProps {
  autoscroll?: boolean;
  copy?: boolean;
  download?: boolean;
  filename?: string;
  resizable?: boolean;
}

const scollToBottom = (elementRef: HTMLDivElement): void => {
  // HACK elementRef.scrollHeight is incorrect when called directly
  // the callback in setTimeout is scheduled as a task to run after
  // PageCreateApplication has rendered DOM... it seems
  setTimeout(() => {
    if (elementRef?.scrollTo) {
      elementRef.scrollTo(0, elementRef.scrollHeight);
    }
  }, 0);
};

function handleDownload(name: string, content: BlobPart): void {
  const file = new Blob([content], { type: 'text/plain' });
  const atag = document.createElement('a');
  atag.href = URL.createObjectURL(file);
  atag.download = name;
  atag.click();
}

export const Code = (props: CodeProps & { children?: string }): JSX.Element => {
  const scrollContainer = useRef<HTMLDivElement>();
  const [scrollOffsetFromBottom, setScrollOffsetFromBottom] =
    useState<number>(0);

  const handleScroll = (ev: UIEvent<HTMLDivElement>) => {
    const tg = ev.target as Element;
    setScrollOffsetFromBottom(tg.scrollHeight - tg.scrollTop - tg.clientHeight);
  };

  useEffect(() => {
    props.autoscroll &&
      scrollOffsetFromBottom === 0 &&
      scollToBottom(scrollContainer.current);
  });

  return (
    <div className="code grid grid--gap-small">
      {(props.copy || props.download) && (
        <div className="code__toolbar">
          {props.copy && (
            <Button
              variant="ghost"
              onClick={() => copyToClipboard(props.children)}
            >
              <Icon data={copy} /> Copy
            </Button>
          )}
          {props.download && (
            <Button
              variant="ghost"
              onClick={() =>
                handleDownload(`${props.filename}.txt`, props.children)
              }
            >
              <Icon data={download} /> Download
            </Button>
          )}
        </div>
      )}
      <Card
        className={`code__card${props.resizable ? ' resizable' : ''}`}
        ref={scrollContainer}
        onScroll={handleScroll}
      >
        {props.children}
      </Card>
    </div>
  );
};
