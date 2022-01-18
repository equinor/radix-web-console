import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { JobSummary } from './job-summary';
import {
  JobSummaryModel,
  JobSummaryModelValidationMap,
} from '../../models/job-summary';

import './style.css';

export interface JobsListProps {
  appName: string;
  jobs: Array<JobSummaryModel>;
  limit?: number;
}

export const JobsList = (props: JobsListProps): JSX.Element =>
  props.jobs?.length > 0 ? (
    <div className="jobs-list grid grid--table-overflow">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>Date/Time</Table.Cell>
            <Table.Cell>Environment</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>Pipeline</Table.Cell>
            <Table.Cell>Scan results</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body className="o-item-list">
          {props.jobs
            .slice(0, props.limit ? props.limit : props.jobs.length)
            .map((job) => (
              <JobSummary key={job.name} appName={props.appName} job={job} />
            ))}
        </Table.Body>
      </Table>
    </div>
  ) : (
    <>
      <Typography variant="h4">No pipeline jobs yet</Typography>
      <Typography>Push to GitHub to trigger a job</Typography>
    </>
  );

JobsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummaryModelValidationMap))
    .isRequired,
  limit: PropTypes.number,
};
