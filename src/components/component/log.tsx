import { Code } from '../code';

export const Log = ({
  fileName,
  logContent,
}: {
  fileName: string;
  logContent: string;
}): JSX.Element => (
  <Code copy download filename={fileName} autoscroll resizable>
    {logContent}
  </Code>
);
