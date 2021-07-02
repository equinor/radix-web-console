import { Table } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import CommitHash from '../commit-hash';
import { StatusBadge } from '../status-badge';
import Duration from '../time/duration';
import RelativeToNow from '../time/relative-to-now';
import jobSummaryModel from '../../models/job-summary';
import routes from '../../routes';
import { routeWithParams } from '../../utils/string';

const EnvsData = ({ appName, envs }) => {
  if (!envs || !envs.length) {
    return null;
  }

  const sortedEnvs = envs.sort();
  return (
    <React.Fragment>
      {sortedEnvs.map((envName) => (
        <Link
          key={envName}
          to={routeWithParams(routes.appEnvironment, { appName, envName })}
        >
          {envName}
        </Link>
      ))}
    </React.Fragment>
  );
};

const JobSummary = ({ appName, job }) => {
  const jobLink = routeWithParams(routes.appJob, {
    appName,
    jobName: job.name,
  });
  let jobTriggeredBy = job.triggeredBy ? job.triggeredBy : 'N/A';
  if (jobTriggeredBy.length > 48) {
    jobTriggeredBy = `${jobTriggeredBy.substring(0, 48)}..`;
  }

  return (
    <Table.Row>
      <Table.Cell>
        <Link to={jobLink} className="job-summary__id-section">
          <div>{jobTriggeredBy}</div>
          <CommitHash commit={job.commitID} />
        </Link>
      </Table.Cell>
      <Table.Cell>
        {job.started && (
          <React.Fragment>
            <RelativeToNow time={job.started} titlePrefix="Start time" />
            <br />
            <Duration end={job.ended} start={job.started} title="Duration" />
          </React.Fragment>
        )}
      </Table.Cell>
      <Table.Cell>
        <div className="job-summary__data-section">
          <EnvsData appName={appName} envs={job.environments} />
        </div>
      </Table.Cell>
      <Table.Cell variant="icon">
        <StatusBadge type={job.status}>{job.status}</StatusBadge>
      </Table.Cell>
      <Table.Cell>{job.pipeline}</Table.Cell>
    </Table.Row>
  );
};

JobSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  job: PropTypes.shape(jobSummaryModel).isRequired,
};

export default JobSummary;
