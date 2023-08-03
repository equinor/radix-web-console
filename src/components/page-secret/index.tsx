import SecretOverview from './secret-overview';

import { DocumentTitle } from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';

export interface PageSecretProps {
  appName: string;
  envName: string;
  componentName: string;
  secretName: string;
}

export const PageSecret = ({
  appName,
  envName,
  componentName,
  secretName,
}: PageSecretProps): React.JSX.Element => (
  <>
    <DocumentTitle title={`Secret ${secretName}`} />
    <SecretOverview
      appName={appName}
      envName={envName}
      componentName={componentName}
      secretName={secretName}
    />
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName', 'secretName'],
  PageSecret
);
