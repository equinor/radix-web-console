import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import { smallScheduledJobName } from '../../utils/string';
import ScheduledJobStatus from '../scheduled-job-status';
import RelativeToNow from '../time/relative-to-now';
import ScheduledJobSummaryModel from '../../models/scheduled-job-summary';
import { Typography } from '@equinor/eds-core-react';

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
        scheduledJobList.map((scheduledJob) => (
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
