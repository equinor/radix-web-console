import { Table, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

import JobSummary from './job-summary';
import jobSummaryModel from '../../models/job-summary';

import './style.css';

export const JobsList = ({ appName, jobs, limit }) => (
  <>
    {jobs && jobs.length > 0 ? (
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
            {jobs.slice(0, limit ? limit : jobs.length).map((job) => (
              <JobSummary key={job.name} appName={appName} job={job} />
            ))}
          </Table.Body>
        </Table>
      </div>
    ) : (
      <>
        <Typography variant="h4">No pipeline jobs yet</Typography>
        <Typography>Push to GitHub to trigger a job</Typography>
      </>
    )}
  </>
);

JobsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(jobSummaryModel)).isRequired,
  limit: PropTypes.number,
};

export default JobsList;
