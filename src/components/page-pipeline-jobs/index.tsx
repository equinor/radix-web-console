import { Button, Icon } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ApplicationAlerting from './application-alerting';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { JobsList } from '../jobs-list';
import { routes } from '../../routes';
import { useGetApplicationJobsQuery } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';

import './style.css';

type Props = {
  appName: string;
};
export default function PipelinePageJobs({ appName }: Props) {
  const { data: jobs, ...state } = useGetApplicationJobsQuery(
    { appName },
    { skip: !appName, pollingInterval: 15000 }
  );

  return (
    <>
      <DocumentTitle title={`${appName} pipeline jobs`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Pipeline Jobs' },
        ]}
      />

      <main className="grid grid--gap-medium">
        <div className="pipeline-job-actions">
          <div>
            <Button
              variant="ghost"
              as={Link}
              to={routeWithParams(routes.appJobNew, { appName })}
            >
              <Icon data={add} size={24} />
              Create new
            </Button>
          </div>
          <div className="pipeline-job-action__action--justify-end">
            <ApplicationAlerting appName={appName} />
          </div>
        </div>

        <AsyncResource asyncState={state}>
          <JobsList appName={appName} jobs={jobs} />
        </AsyncResource>
      </main>
    </>
  );
}

PipelinePageJobs.propTypes = {
  appName: PropTypes.string.isRequired,
};
