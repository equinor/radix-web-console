import {
  faClock,
  faGlobeAfrica,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Chip, { progressStatusToChipType } from '../chip';
import Clickbox from '../clickbox';
import CommitHash from '../commit-hash';
import Duration from '../time/duration';
import RelativeToNow from '../time/relative-to-now';

import { routeWithParams, themedColor, smallJobName } from '../../utils/string';
import jobSummaryModel from '../../models/job-summary';
import routes from '../../routes';

const EnvsData = ({ appName, envs }) => {
  if (!envs || !envs.length) {
    return null;
  }
  const sortedEnvs = envs.sort();
  return (
    <React.Fragment>
      <div className="job-summary__icon">
        <FontAwesomeIcon
          color={themedColor(sortedEnvs[0])}
          icon={faGlobeAfrica}
          size="lg"
        />
      </div>
      <ul className="job-summary__envs">
        {sortedEnvs.map((envName) => (
          <li key={envName}>
            <Link
              to={routeWithParams(routes.appEnvironment, { appName, envName })}
            >
              {envName}
            </Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

const JobSummary = ({ appName, job }) => {
  const jobLink = routeWithParams(routes.appJob, {
    appName,
    jobName: job.name,
  });
  let jobTriggeredBy = job.triggeredBy ? job.triggeredBy : 'N/A';
  if (jobTriggeredBy.length > 12) {
    jobTriggeredBy = `${jobTriggeredBy.substring(0, 12)}..`;
  }

  return (
    <Clickbox to={jobLink}>
      <div className={`job-summary job-summary--${job.status.toLowerCase()}`}>
        <ul className="job-summary__data">
          <li className="job-summary__data-section">
            <div className="job-summary__icon">
              <FontAwesomeIcon icon={faHashtag} size="lg" />
            </div>
            <div className="job-summary__data-list">
              <strong>{jobTriggeredBy}</strong>
              <CommitHash commit={job.commitID} />
            </div>
          </li>
          <li className="job-summary__data-section">
            <div className="job-summary__icon">
              <FontAwesomeIcon icon={faClock} size="lg" />
            </div>
            <div className="job-summary__data-list">
              {!job.started && (
                <RelativeToNow time={job.created} titlePrefix="Creation time" />
              )}
              {job.started && (
                <React.Fragment>
                  <RelativeToNow time={job.started} titlePrefix="Start time" />
                  <Duration
                    end={job.ended}
                    start={job.started}
                    title="Duration"
                  />
                </React.Fragment>
              )}
            </div>
          </li>
          <li className="job-summary__data-section">
            <EnvsData appName={appName} envs={job.environments} />
          </li>
          <li className="job-summary__data-section">
            <Chip type={progressStatusToChipType(job.status)}>
              {job.status}
            </Chip>
          </li>
          <li className="job-summary__data-section">
            <div className="job-summary__data-list">
              <Link className="job-summary__link" to={jobLink}>
                {smallJobName(job.name)}
              </Link>
              <div>{job.pipeline}</div>
            </div>
          </li>
        </ul>
      </div>
    </Clickbox>
  );
};

JobSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  job: PropTypes.shape(jobSummaryModel).isRequired,
};

export default JobSummary;
