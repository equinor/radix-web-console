import { getAppName } from '../../utils/config';

const DocumentTitle = ({ title }) => {
  document.title = `${title}${getAppName() ? ` | ${getAppName()}` : ''}`;
  return null;
};

export default DocumentTitle;
