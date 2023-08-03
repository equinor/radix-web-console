import { useEffect } from 'react';
import * as PropTypes from 'prop-types';

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

export const Log = ({
  fileName,
  logContent,
  downloadOverride: { content, error, onDownload, status },
}: {
  fileName: string;
  logContent: string;
  downloadOverride?: LogDownloadOverrideType;
}): React.JSX.Element => {
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
