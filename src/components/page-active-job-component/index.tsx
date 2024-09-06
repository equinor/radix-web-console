import { ActiveJobComponentOverview } from './active-job-component-overview';

import { withRouteParams } from '../../utils/router';
import { DocumentTitle } from '../document-title';

type Props = {
  appName: string;
  envName: string;
  jobComponentName: string;
};
export function PageActiveJobComponent({
  appName,
  envName,
  jobComponentName,
}: Props) {
  return (
    <>
      <DocumentTitle title={`${jobComponentName} in ${envName}`} />
      <ActiveJobComponentOverview {...{ appName, envName, jobComponentName }} />
    </>
  );
}

export default withRouteParams(PageActiveJobComponent);
