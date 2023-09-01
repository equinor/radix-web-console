import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect } from 'react';

import { Alert } from '../alert';
import { Code } from '../code';
import { RequestState } from '../../state/state-utils/request-states';
import { copyToTextFile } from '../../utils/string';

export type LogDownloadOverrideType = {
  content?: string;
  status: RequestState;
  onDownload: () => void;
  error?: string;
};

export const LogDownloadOverrideTypeValidationMap: PropTypes.ValidationMap<LogDownloadOverrideType> =
  {
    content: PropTypes.string,
    status: PropTypes.oneOf(Object.values(RequestState)).isRequired,
    onDownload: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

export const Log: FunctionComponent<{
  fileName: string;
  logContent: string;
  downloadOverride?: LogDownloadOverrideType;
}> = ({
  fileName,
  logContent,
  downloadOverride: { content, error, onDownload, status },
}) => {
  useEffect(() => {
    if (status === RequestState.SUCCESS) {
      copyToTextFile(`${fileName}.txt`, content || '');
    }
  }, [content, fileName, status]);

  return (
    <>
      <Code
        copy
        download
        downloadCb={
          onDownload &&
          (() => status !== RequestState.IN_PROGRESS && onDownload())
        }
        filename={fileName}
        autoscroll
        resizable
      >
        {logContent}
      </Code>

      {error && <Alert>{error}</Alert>}
    </>
  );
};
