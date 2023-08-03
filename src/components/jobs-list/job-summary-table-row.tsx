import { Table, Tooltip } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CommitHash } from '../commit-hash';
import { RadixJobConditionBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  JobSummaryModel,
  JobSummaryModelValidationMap,
} from '../../models/radix-api/jobs/job-summary';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export interface JobSummaryTableRowProps {
  appName: string;
  job: JobSummaryModel;
}

const EnvsData = ({
  appName,
  envs,
}: {
  appName: string;
  envs: string[];
}): React.JSX.Element => (
  <>
    {envs?.sort().map((envName, i) => (
      <Link
        key={i}
        className="job-summary__link"
        to={routeWithParams(routes.appEnvironment, {
          appName: appName,
          envName: envName,
        })}
      >
        {envName}
      </Link>
    ))}
  </>
);

export const JobSummaryTableRow = ({
  appName,
  job,
}: JobSummaryTableRowProps): React.JSX.Element => {
  const triggeredBy = job.triggeredBy || 'N/A';
  const link = routeWithParams(routes.appJob, {
    appName: appName,
    jobName: job.name,
  });

  return (
    <Table.Row>
      <Table.Cell>
        <Link to={link} className="job-summary__id-section">
          {triggeredBy.length > 25 ? (
            <Tooltip placement="top" title={triggeredBy}>
              <div>
                {`${triggeredBy.substring(0, 8)}...${triggeredBy.slice(-12)}`}
              </div>
            </Tooltip>
          ) : (
            <div>{triggeredBy}</div>
          )}
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
        <RadixJobConditionBadge status={job.status} />
      </Table.Cell>
      <Table.Cell>{job.pipeline}</Table.Cell>
    </Table.Row>
  );
};

JobSummaryTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  job: PropTypes.shape(JobSummaryModelValidationMap).isRequired,
} as PropTypes.ValidationMap<JobSummaryTableRowProps>;
