import { configVariables } from '../../utils/config';

export const DocumentTitle = ({
  title,
}: {
  title: string;
}): React.JSX.Element => {
  const appName = configVariables.APP_NAME;
  document.title = title + (appName ? ` | ${appName}` : '');
  return <></>;
};
