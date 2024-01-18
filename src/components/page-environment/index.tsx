import EnvironmentOverview from './environment-overview';

import { DocumentTitle } from '../document-title';
import { withRouteParams } from '../../utils/router';

type Props = {
  appName: string;
  envName: string;
};
export function PageEnvironment({ appName, envName }: Props) {
  return (
    <>
      <DocumentTitle title={`${envName} environment`} />
      <EnvironmentOverview {...{ appName, envName }} />
    </>
  );
}

export default withRouteParams(PageEnvironment);
