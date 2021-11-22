import { configVariables } from '../../utils/config';

const DocumentTitle = ({ title }) => {
  const appName = configVariables.APP_NAME || '';
  document.title = title + (appName ? ` | ${appName}` : '');
  return null;
};

export default DocumentTitle;
