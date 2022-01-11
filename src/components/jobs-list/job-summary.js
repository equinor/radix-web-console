import { Table, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CommitHash } from '../commit-hash';
import { StatusBadge } from '../status-badge';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import VulnerabilitySummary from '../vulnerability-summary';
import jobSummaryModel from '../../models/job-summary';
import { ScanStatusEnum } from '../../models/scan-status';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

const EnvsData = ({ appName, envs }) => {
  if (!envs || !envs.length) {
    return null;
  }

  const sortedEnvs = envs.sort();
  return (
    <>
      {sortedEnvs.map((envName) => (
        <Link
          key={envName}
          className="job-summary__link"
          to={routeWithParams(routes.appEnvironment, { appName, envName })}
        >
          {envName}
        </Link>
      ))}
    </>
  );
};

const VulnerabilitySummaryTotal = ({ scans }) => {
  const summary = scans
    ? scans.reduce(
        (prev, curr) => {
          prev.summaryCount++;
          prev.errors += curr?.status !== ScanStatusEnum.SUCCESS;

          if (curr?.vulnerabilities) {
            Object.keys(curr.vulnerabilities).forEach((key) => {
              prev.vulnerabilities[key] = prev.vulnerabilities[key]
                ? prev.vulnerabilities[key] + curr.vulnerabilities[key]
                : curr.vulnerabilities[key];
            });
          }
          return prev;
        },
        { errors: 0, summaryCount: 0, vulnerabilities: {} }
      )
    : null;

  return (
    <>
      {summary && (
        <>
          <VulnerabilitySummary
            vulnerabilitySummary={summary.vulnerabilities}
          />
          {summary.errors > 0 && (
            <Typography color="warning">
              {summary.errors} of {summary.summaryCount} vulnerability scans has
              an error
            </Typography>
          )}
        </>
      )}
    </>
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
          <>
            <RelativeToNow
              time={job.started}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration end={job.ended} start={job.started} title="Duration" />
          </>
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
      <Table.Cell>
        <VulnerabilitySummaryTotal scans={job.stepSummaryScans} />
      </Table.Cell>
    </Table.Row>
  );
};

JobSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  job: PropTypes.shape(jobSummaryModel).isRequired,
};

export default JobSummary;
