import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReplicaImage } from '../replica-image';
import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ScheduledJobSummaryModelValidationMap } from '../../models/scheduled-job-summary';
import { getScheduledJobUrl } from '../../utils/routing';
import { smallScheduledJobName } from '../../utils/string';

import './style.css';

export const ScheduledJobList = ({
  appName,
  envName,
  jobComponentName,
  scheduledJobList,
  totalJobCount,
  isExpanded,
}) => {
  const [moreInfoExpanded, setMoreInfoExpanded] = useState({});

  const toggleMoreInfo = (jobName) => {
    setMoreInfoExpanded({
      ...moreInfoExpanded,
      [jobName]: !moreInfoExpanded[jobName],
    });
  };

  const getExpandedClassNames = (jobName) =>
    classNames({
      'border-bottom-transparent': !!moreInfoExpanded[jobName],
    });

  const getAccordionIcon = (jobName) =>
    moreInfoExpanded[jobName] ? chevron_up : chevron_down;

  return scheduledJobList?.length > 0 ? (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
        <Accordion.Header>
          <Typography variant="h4">
            Scheduled job{scheduledJobList?.length > 1 && 's'}
            {': '}
            <span>
              {scheduledJobList.length}
              {totalJobCount > 0 && <>/{totalJobCount}</>}
            </span>
          </Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="events_table grid grid--table-overflow">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>Status</Table.Cell>
                  <Table.Cell>Created</Table.Cell>
                  <Table.Cell>Duration</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {scheduledJobList.map((scheduledJob, i) => {
                  const expandClassNames = getExpandedClassNames(
                    scheduledJob.name
                  );
                  return (
                    <Fragment key={i}>
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
                              size={24}
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
                          <Table.Cell colSpan={4}>
                            <div className="grid grid--gap-medium">
                              <span />
                              {scheduledJob.replicaList?.length > 0 ? (
                                <ReplicaImage
                                  replica={scheduledJob.replicaList[0]}
                                />
                              ) : (
                                <Typography>
                                  Unable to get image tag and digest. The
                                  container for this job no longer exists.
                                </Typography>
                              )}
                              <span />
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </Fragment>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ) : (
    <Typography>This component has no scheduled job.</Typography>
  );
};

ScheduledJobList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  scheduledJobList: PropTypes.arrayOf(
    PropTypes.shape(ScheduledJobSummaryModelValidationMap)
  ),
  totalJobCount: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool,
};
