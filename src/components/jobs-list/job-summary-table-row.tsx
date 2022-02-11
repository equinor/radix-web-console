import { Table } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CommitHash } from '../commit-hash';
import { StatusBadge } from '../status-badge';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { VulnerabilitySummaryTotal } from '../vulnerability-summary';
import {
  JobSummaryModel,
  JobSummaryModelValidationMap,
} from '../../models/job-summary';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export interface JobSummaryTableRowProps {
  appName: string;
  job: JobSummaryModel;
}

const EnvsData = (props: { appName: string; envs: string[] }): JSX.Element => (
  <>
    {props.envs?.sort().map((envName) => (
      <Link
        key={envName}
        className="job-summary__link"
        to={routeWithParams(routes.appEnvironment, {
          appName: props.appName,
          envName: envName,
        })}
      >
        {envName}
      </Link>
    ))}
  </>
);

export const JobSummaryTableRow = (
  props: JobSummaryTableRowProps
): JSX.Element => {
  const jobLink: string = routeWithParams(routes.appJob, {
    appName: props.appName,
    jobName: props.job.name,
  });

  const jobTriggeredBy =
    `${props.job.triggeredBy}`.length > 48
      ? `${props.job.triggeredBy.substring(0, 48)}..`
      : props.job.triggeredBy || 'N/A';

  return (
    <Table.Row>
      <Table.Cell>
        <Link to={jobLink} className="job-summary__id-section">
          <div>{jobTriggeredBy}</div>
          <CommitHash commit={props.job.commitID} />
        </Link>
      </Table.Cell>
      <Table.Cell>
        {props.job.started && (
          <>
            <RelativeToNow
              time={props.job.started}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration
              end={props.job.ended}
              start={props.job.started}
              title="Duration"
            />
          </>
        )}
      </Table.Cell>
      <Table.Cell>
        <div className="job-summary__data-section">
          <EnvsData appName={props.appName} envs={props.job.environments} />
        </div>
      </Table.Cell>
      <Table.Cell variant="icon">
        <StatusBadge type={props.job.status}>{props.job.status}</StatusBadge>
      </Table.Cell>
      <Table.Cell>{props.job.pipeline}</Table.Cell>
      <Table.Cell>
        {props.job.stepSummaryScans && (
          <VulnerabilitySummaryTotal scans={props.job.stepSummaryScans} />
        )}
      </Table.Cell>
    </Table.Row>
  );
};

JobSummaryTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  job: PropTypes.shape(JobSummaryModelValidationMap).isRequired,
};
