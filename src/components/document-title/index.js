import * as configHandler from '../../utils/config';

const DocumentTitle = ({ title }) => {
  const appName = configHandler.getAppName()
    ? ` | ${configHandler.getAppName()}`
    : '';

  document.title = `${title}${appName}`;
  return null;
};

export default DocumentTitle;
