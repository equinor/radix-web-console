import { Table, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import StatusBadge from '../status-badge';
import RelativeToNow from '../time/relative-to-now';

import ScheduledJobSummaryModel from '../../models/scheduled-job-summary';
import * as routing from '../../utils/routing';
import { smallScheduledJobName } from '../../utils/string';

import './style.css';

const ScheduledJobList = ({
  appName,
  envName,
  jobComponentName,
  scheduledJobList,
}) => (
  <>
    <Typography variant="h4">
      Scheduled job{scheduledJobList?.length > 1 && 's'}
    </Typography>
    {scheduledJobList?.length > 0 ? (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>Created</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {scheduledJobList.map((scheduledJob, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Link
                  className="scheduled-job__link"
                  to={routing.getScheduledJobUrl(
                    appName,
                    envName,
                    jobComponentName,
                    scheduledJob.name
                  )}
                >
                  <Typography link as="span" token={{ textDecoration: 'none' }}>
                    {smallScheduledJobName(scheduledJob.name)}
                  </Typography>
                </Link>
              </Table.Cell>
              <Table.Cell>
                <StatusBadge type={scheduledJob.status}>
                  {scheduledJob.status}
                </StatusBadge>
              </Table.Cell>
              <Table.Cell>
                <strong>
                  <RelativeToNow time={scheduledJob.created} />
                </strong>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    ) : (
      <Typography>This component has no scheduled job.</Typography>
    )}
  </>
);

ScheduledJobList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  scheduledJobList: PropTypes.arrayOf(
    PropTypes.exact(ScheduledJobSummaryModel)
  ),
};

export default ScheduledJobList;
