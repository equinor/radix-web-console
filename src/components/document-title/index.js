import configHandler from '../../utils/config';

const DocumentTitle = ({ title }) => {
  const appName = configHandler.getAppName() || '';
  document.title = title + (appName ? ` | ${appName}` : '');
  return null;
};

export default DocumentTitle;
