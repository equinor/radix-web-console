import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import { smallScheduledJobName } from '../../utils/string';
import ScheduledJobStatus from '../scheduled-job-status';
import RelativeToNow from '../time/relative-to-now';
import ScheduledJobSummaryModel from '../../models/scheduled-job-summary';

const ScheduledJobList = ({
  appName,
  envName,
  jobComponentName,
  scheduledJobList,
}) => {
  return (
    <React.Fragment>
      <h2 className="o-heading-section">Scheduled Job</h2>
      {scheduledJobList.map((scheduledJob) => (
        <p key={scheduledJob.name}>
          <Link
            to={routing.getScheduledJobUrl(
              appName,
              envName,
              jobComponentName,
              scheduledJob.name
            )}
          >
            {smallScheduledJobName(scheduledJob.name)}{' '}
          </Link>
          <ScheduledJobStatus status={scheduledJob.status} />
          &nbsp;&nbsp;&nbsp;Created{' '}
          <strong>
            <RelativeToNow time={scheduledJob.created}></RelativeToNow>
          </strong>
        </p>
      ))}
    </React.Fragment>
  );
};

ScheduledJobList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  scheduledJobList: PropTypes.arrayOf(
    PropTypes.exact(ScheduledJobSummaryModel)
  ),
};

export default ScheduledJobList;
