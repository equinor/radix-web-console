import { Code } from '../code';
import { useEffect } from 'react';
import { RequestState } from '../../state/state-utils/request-states';
import { copyToTextFile } from '../../utils/string';
import Alert from '../alert';

export type LogDownloadOverrideType = {
  content: string;
  status: RequestState;
  onDownload: () => void;
  error?: string;
};

export const Log = ({
  fileName,
  logContent,
  downloadOverride,
}: {
  fileName: string;
  logContent: string;
  downloadOverride?: LogDownloadOverrideType;
}): JSX.Element => {
  useEffect(() => {
    if (downloadOverride?.status === RequestState.SUCCESS) {
      copyToTextFile(`${fileName}.txt`, downloadOverride.content);
    }
  }, [downloadOverride?.status]);

  return (
    <>
      <Code
        copy
        download
        downloadCb={
          downloadOverride
            ? () => {
                if (downloadOverride.status !== RequestState.IN_PROGRESS)
                  downloadOverride.onDownload();
              }
            : undefined
        }
        filename={fileName}
        autoscroll
        resizable
      >
        {logContent}
      </Code>
      {downloadOverride?.error && <Alert>{downloadOverride.error}</Alert>}
    </>
  );
};
