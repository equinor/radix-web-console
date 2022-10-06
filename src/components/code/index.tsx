import { Button, Card, Icon } from '@equinor/eds-core-react';
import { copy as copyIcon, download as downloadIcon } from '@equinor/eds-icons';
import classNames from 'classnames';
import { UIEvent, useEffect, useRef, useState } from 'react';

import { copyToClipboard, copyToTextFile } from '../../utils/string';

import './style.css';

export interface CodeProps {
  autoscroll?: boolean;
  copy?: boolean;
  download?: boolean;
  filename?: string;
  resizable?: boolean;
  downloadCb?: () => void;
}

const scrollToBottom = (elementRef: HTMLDivElement): void => {
  // HACK elementRef.scrollHeight is incorrect when called directly
  // the callback in setTimeout is scheduled as a task to run after
  // PageCreateApplication has rendered DOM... it seems
  setTimeout(() => {
    if (elementRef?.scrollTo) {
      elementRef.scrollTo(0, elementRef.scrollHeight);
    }
  }, 0);
};

export const Code = ({
  autoscroll,
  copy,
  download,
  filename,
  resizable,
  downloadCb,
  children,
}: CodeProps & { children?: string }): JSX.Element => {
  const scrollContainer = useRef<HTMLDivElement>();
  const [scrollOffsetFromBottom, setScrollOffsetFromBottom] =
    useState<number>(0);

  const handleScroll = (ev: UIEvent<HTMLDivElement>) => {
    const tg = ev.target as Element;
    setScrollOffsetFromBottom(tg.scrollHeight - tg.scrollTop - tg.clientHeight);
  };

  useEffect(() => {
    autoscroll &&
      scrollOffsetFromBottom === 0 &&
      scrollToBottom(scrollContainer.current);
  });

  return (
    <div className="code">
      {(copy || download) && (
        <div className="code__toolbar">
          <Button.Group>
            {copy && (
              <Button variant="ghost" onClick={() => copyToClipboard(children)}>
                <Icon data={copyIcon} /> Copy
              </Button>
            )}
            {download && (
              <Button
                variant="ghost"
                onClick={() =>
                  downloadCb
                    ? downloadCb()
                    : copyToTextFile(`${filename}.txt`, children)
                }
              >
                <Icon data={downloadIcon} /> Download
              </Button>
            )}
          </Button.Group>
        </div>
      )}
      <Card
        className={classNames('code__card', { resizable: resizable })}
        ref={scrollContainer}
        onScroll={handleScroll}
      >
        {children}
      </Card>
    </div>
  );
};
