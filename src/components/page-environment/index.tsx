import { withRouteParams } from '../../utils/router';
import { DocumentTitle } from '../document-title';
import EnvironmentOverview from './environment-overview';

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
