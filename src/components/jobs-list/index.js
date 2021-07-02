import { Table } from '@equinor/eds-core-react';
import { faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import React from 'react';

import JobSummary from './job-summary';
import EmptyState from '../empty-state';
import jobSummaryModel from '../../models/job-summary';

import './style.css';

const noJobsIcon = (
  <span className="jobs-list__no-jobs-icon fa-layers fa-fw fa-5x">
    <FontAwesomeIcon icon={faCog} />
    <FontAwesomeIcon
      icon={faQuestionCircle}
      transform="shrink-10 down-5 right-5"
    />
  </span>
);

export const JobsList = ({ appName, jobs, limit }) => (
  <div className="jobs-list">
    {jobs && jobs.length > 0 ? (
      <Table>
        <Table.Head>
          <Table.Row className="job-summary__header-row">
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>Date/Time</Table.Cell>
            <Table.Cell>Environment</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>Pipeline</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body className="o-item-list">
          {jobs.slice(0, limit ? limit : jobs.length).map((job) => (
            <JobSummary key={job.name} appName={appName} job={job} />
          ))}
        </Table.Body>
      </Table>
    ) : (
      <EmptyState title="No pipeline jobs yet" icon={noJobsIcon}>
        Push to GitHub to trigger a job
      </EmptyState>
    )}
  </div>
);

JobsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(jobSummaryModel)).isRequired,
  limit: PropTypes.number,
};

export default JobsList;
