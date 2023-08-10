import { FunctionComponent } from 'react';

import { DocumentTitle } from '../document-title';
import { JobOverview } from '../job-overview';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PipelinePageJob: FunctionComponent<{
  appName: string;
  jobName: string;
}> = ({ appName, jobName }) => (
  <>
    <DocumentTitle title={`Pipeline Job ${jobName}`} />
    <JobOverview appName={appName} jobName={jobName} />
  </>
);

export default mapRouteParamsToProps(['appName', 'jobName'], PipelinePageJob);
