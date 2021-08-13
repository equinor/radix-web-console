import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import { smallScheduledJobName } from '../../utils/string';
import ScheduledJobStatus from '../scheduled-job-status';
import RelativeToNow from '../time/relative-to-now';
import ScheduledJobSummaryModel from '../../models/scheduled-job-summary';
import { Typography } from '@equinor/eds-core-react';
import './style.css';

const ScheduledJobList = ({
  appName,
  envName,
  jobComponentName,
  scheduledJobList,
}) => {
  return (
    <React.Fragment>
      <Typography variant="h4">Scheduled job</Typography>
      {scheduledJobList &&
        scheduledJobList.map((scheduledJob, i) => (
          <div key={i} className="scheduled-job">
            <Link
              to={routing.getScheduledJobUrl(
                appName,
                envName,
                jobComponentName,
                scheduledJob.name
              )}
            >
              <Typography link as="span">
                {smallScheduledJobName(scheduledJob.name)}
              </Typography>
            </Link>
            <ScheduledJobStatus status={scheduledJob.status} />
            <span>
              Created{' '}
              <strong>
                <RelativeToNow time={scheduledJob.created}></RelativeToNow>
              </strong>
            </span>
          </div>
        ))}
      {!scheduledJobList && (
        <Typography variant="body_short">No scheduled job.</Typography>
      )}
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
