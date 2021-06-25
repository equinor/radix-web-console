import { Table } from '@equinor/eds-core-react';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import CommitHash from '../commit-hash';
import { JobStatusChip } from '../job-status-chip';
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
        <li key={envName}>
          <Link
            to={routeWithParams(routes.appEnvironment, { appName, envName })}
          >
            {envName}
          </Link>
        </li>
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
        <Link to={jobLink}>
          <div>{jobTriggeredBy}</div>
          <div>
            <CommitHash commit={job.commitID} />
          </div>
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
        <li className="job-summary__data-section">
          <EnvsData appName={appName} envs={job.environments} />
        </li>
      </Table.Cell>
      <Table.Cell variant="icon">
        <JobStatusChip type={job.status}>{job.status}</JobStatusChip>
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
