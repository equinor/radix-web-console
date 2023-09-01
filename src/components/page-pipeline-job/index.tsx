import { FunctionComponent } from 'react';

import { DocumentTitle } from '../document-title';
import { JobOverview } from '../job-overview';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

export const PipelinePageJob: FunctionComponent<{
  appName: string;
  jobName: string;
}> = ({ appName, jobName }) => (
  <>
    <DocumentTitle title={`Pipeline Job ${jobName}`} />
    <JobOverview {...{ appName, jobName }} />
  </>
);

const Component = connectRouteParams(PipelinePageJob);
export { Component, routeParamLoader as loader };
