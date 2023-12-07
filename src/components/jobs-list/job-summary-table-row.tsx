import { Table, Tooltip } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { CommitHash } from '../commit-hash';
import { RadixJobConditionBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import { JobSummary } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';

export interface JobSummaryTableRowProps {
  appName: string;
  job: Readonly<JobSummary>;
}

export const JobSummaryTableRow: FunctionComponent<JobSummaryTableRowProps> = ({
  appName,
  job,
}) => {
  const triggeredBy = job.triggeredBy || 'N/A';
  const link = routeWithParams(routes.appJob, { appName, jobName: job.name });

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
              time={new Date(job.started)}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration
              end={new Date(job.ended)}
              start={new Date(job.started)}
              title="Duration"
            />
          </>
        )}
      </Table.Cell>
      <Table.Cell>
        <div className="job-summary__data-section">
          {[...(job.environments ?? [])].sort().map((envName, i) => (
            <Link
              key={i}
              className="job-summary__link"
              to={routeWithParams(routes.appEnvironment, { appName, envName })}
            >
              {envName}
            </Link>
          ))}
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
  job: PropTypes.object.isRequired as PropTypes.Validator<JobSummary>,
};
