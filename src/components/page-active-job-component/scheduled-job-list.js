import { Icon, Table, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StatusBadge } from '../status-badge';
import { RelativeToNow } from '../time/relative-to-now';
import ScheduledJobSummaryModel from '../../models/scheduled-job-summary';
import { getScheduledJobUrl } from '../../utils/routing';
import { smallScheduledJobName } from '../../utils/string';

import './style.css';
import Duration from '../time/duration';
import { useState } from 'react';
import classNames from 'classnames';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import * as React from 'react';
import ReplicaImage from '../replica-image';

const ScheduledJobList = ({
  appName,
  envName,
  jobComponentName,
  scheduledJobList,
}) => {
  const [moreInfoExpanded, setMoreInfoExpanded] = useState({});

  const toggleMoreInfo = (replicaName) => {
    setMoreInfoExpanded({
      ...moreInfoExpanded,
      [replicaName]: !moreInfoExpanded[replicaName],
    });
  };

  const getExpandedClassNames = (replicaName) => {
    return classNames({
      'border-bottom-transparent': !!moreInfoExpanded[replicaName],
    });
  };

  const getAccordionIcon = (replicaName) =>
    moreInfoExpanded[replicaName] ? chevron_down : chevron_up;
  return (
    <>
      <Typography variant="h4">
        Scheduled job{scheduledJobList?.length > 1 && 's'}
      </Typography>
      {scheduledJobList?.length > 0 ? (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>Created</Table.Cell>
              <Table.Cell>Duration</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {scheduledJobList.map((scheduledJob, i) => {
              const expandClassNames = getExpandedClassNames(scheduledJob.name);
              return (
                <React.Fragment key={i}>
                  <Table.Row>
                    <Table.Cell
                      className={`fitwidth padding-right-0 ${expandClassNames}`}
                      variant="icon"
                    >
                      <Typography
                        link
                        as="span"
                        onClick={() => toggleMoreInfo(scheduledJob.name)}
                      >
                        <Icon
                          size="24"
                          data={getAccordionIcon(scheduledJob.name)}
                          role="button"
                          title="Toggle more information"
                        />
                      </Typography>
                    </Table.Cell>
                    <Table.Cell className={expandClassNames}>
                      <Link
                        className="scheduled-job__link"
                        to={getScheduledJobUrl(
                          appName,
                          envName,
                          jobComponentName,
                          scheduledJob.name
                        )}
                      >
                        <Typography
                          link
                          as="span"
                          token={{ textDecoration: 'none' }}
                        >
                          {smallScheduledJobName(scheduledJob.name)}
                        </Typography>
                      </Link>
                    </Table.Cell>
                    <Table.Cell className={expandClassNames}>
                      <StatusBadge type={scheduledJob.status}>
                        {scheduledJob.status}
                      </StatusBadge>
                    </Table.Cell>
                    <Table.Cell className={expandClassNames}>
                      <RelativeToNow time={scheduledJob.created} />
                    </Table.Cell>
                    <Table.Cell className={expandClassNames}>
                      <Duration
                        start={scheduledJob.created}
                        end={scheduledJob.ended ?? new Date()}
                      />
                    </Table.Cell>
                  </Table.Row>
                  {moreInfoExpanded[scheduledJob.name] && (
                    <Table.Row>
                      <Table.Cell />
                      <Table.Cell colSpan="4">
                        <div className="grid grid--gap-medium">
                          <span />
                          <ReplicaImage replica={scheduledJob.replicaList[0]} />
                          <span />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </React.Fragment>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <Typography>This component has no scheduled job.</Typography>
      )}
    </>
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
