import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent, ReactNode } from 'react';

import { isNullOrUndefined } from '../../utils/object';

export interface AsyncResourceContent {
  loadingContent?: ReactNode;
  errorContent?: ReactNode;
}

export const ErrorPanel: FunctionComponent<{
  message: string;
  code?: string | number;
}> = ({ message, code }) => (
  <div>
    <Typography variant="caption">Error message:</Typography>
    <samp className="word-break">
      {[code, message].filter((x) => !!x).join(': ')}
    </samp>
  </div>
);

export const LoadingComponent: FunctionComponent<{
  content?: AsyncResourceContent['loadingContent' | 'errorContent'];
  defaultContent: React.JSX.Element;
}> = ({ content, defaultContent }) =>
  // if content is a boolean the intent is either to display or hide the default content
  !isNullOrUndefined(content) && content !== true ? (
    <>{content !== false && content}</>
  ) : (
    defaultContent
  );