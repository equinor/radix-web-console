const appName = require('../../config.json').appName;

export default ({ title }) => {
  document.title = `${title}${appName ? ` | ${appName}` : ''}`;
  return null;
};
