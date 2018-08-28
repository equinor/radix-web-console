const appName = require('../../config.json').appName;

const DocumentTitle = ({ title }) => {
  document.title = `${title}${appName ? ` | ${appName}` : ''}`;
  return null;
};

export default DocumentTitle;
