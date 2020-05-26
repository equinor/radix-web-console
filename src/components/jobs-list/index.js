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
    {jobs.length === 0 && (
      <EmptyState title="No jobs yet" icon={noJobsIcon}>
        Push to GitHub to trigger a job
      </EmptyState>
    )}
    {jobs.length > 0 && (
      <ul className="o-item-list">
        {jobs.slice(0, limit || jobs.length).map((job) => (
          <li key={job.name}>
            <JobSummary appName={appName} job={job} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

JobsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(jobSummaryModel)).isRequired,
  limit: PropTypes.number,
};

export default JobsList;
