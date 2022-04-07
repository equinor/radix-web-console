import { configVariables } from '../../utils/config';

export const DocumentTitle = ({ title }) => {
  const appName = configVariables.APP_NAME || '';
  document.title = title + (appName ? ` | ${appName}` : '');
  return null;
};

export default DocumentTitle;
