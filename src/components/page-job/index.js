import { Route } from 'react-router';
import React from 'react';

import DocumentTitle from '../document-title';
import JobOverview from '../job-overview';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

export const PageJob = ({ appName, jobName }) => {
  return (
    <React.Fragment>
      <DocumentTitle title={`Job ${jobName}`} />
      <Route
        exact
        path={routes.appJob}
        render={() => <JobOverview appName={appName} jobName={jobName} />}
      />
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(['appName', 'jobName'], PageJob);
