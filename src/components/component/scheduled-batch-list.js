import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReplicaImage } from '../replica-image';
import { StatusBadge } from '../status-badge';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ScheduledBatchSummaryModelValidationMap } from '../../models/scheduled-batch-summary';
import { getScheduledBatchUrl } from '../../utils/routing';
import { smallScheduledBatchName } from '../../utils/string';

import './style.css';

export const ScheduledBatchList = ({
  appName,
  envName,
  jobComponentName,
  scheduledBatchList,
  isExpanded,
}) => {
  const [moreInfoExpanded, setMoreInfoExpanded] = useState({});

  const toggleMoreInfo = (batchName) => {
    setMoreInfoExpanded({
      ...moreInfoExpanded,
      [batchName]: !moreInfoExpanded[batchName],
    });
  };

  const getExpandedClassNames = (batchName) =>
    classNames({
      'border-bottom-transparent': !!moreInfoExpanded[batchName],
    });

  const getAccordionIcon = (batchName) =>
    moreInfoExpanded[batchName] ? chevron_down : chevron_up;

  return (
    <>
      {scheduledBatchList?.length > 0 ? (
        <Accordion.Item className="accordion elevated" isExpanded={isExpanded}>
          <Accordion.Header>
            <Typography variant="h4">
              Scheduled batch{scheduledBatchList.length > 1 && 'es'}
              {': '}
              {scheduledBatchList.length}
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
                  {scheduledBatchList.map((scheduledBatch, i) => {
                    const expandClassNames = getExpandedClassNames(
                      scheduledBatch.name
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
                              onClick={() =>
                                toggleMoreInfo(scheduledBatch.name)
                              }
                            >
                              <Icon
                                size={24}
                                data={getAccordionIcon(scheduledBatch.name)}
                                role="button"
                                title="Toggle more information"
                              />
                            </Typography>
                          </Table.Cell>
                          <Table.Cell className={expandClassNames}>
                            <Link
                              className="scheduled-batch__link"
                              to={getScheduledBatchUrl(
                                appName,
                                envName,
                                jobComponentName,
                                scheduledBatch.name
                              )}
                            >
                              <Typography
                                link
                                as="span"
                                token={{ textDecoration: 'none' }}
                              >
                                {smallScheduledBatchName(scheduledBatch.name)}
                              </Typography>
                            </Link>
                          </Table.Cell>
                          <Table.Cell className={expandClassNames}>
                            <StatusBadge type={scheduledBatch.status}>
                              {scheduledBatch.status}
                            </StatusBadge>
                          </Table.Cell>
                          <Table.Cell className={expandClassNames}>
                            <RelativeToNow time={scheduledBatch.created} />
                          </Table.Cell>
                          <Table.Cell className={expandClassNames}>
                            <Duration
                              start={scheduledBatch.created}
                              end={scheduledBatch.ended ?? new Date()}
                            />
                          </Table.Cell>
                        </Table.Row>
                        {moreInfoExpanded[scheduledBatch.name] && (
                          <Table.Row>
                            <Table.Cell />
                            <Table.Cell colSpan={4}>
                              <div className="grid grid--gap-medium">
                                <span />
                                {scheduledBatch.replica ? (
                                  <ReplicaImage
                                    replica={scheduledBatch.replica}
                                  />
                                ) : (
                                  <Typography>
                                    Unable to get image tag and digest. The
                                    container for this batch no longer exists.
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
      ) : (
        <Typography>This component has no scheduled batch.</Typography>
      )}
    </>
  );
};

ScheduledBatchList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  scheduledBatchList: PropTypes.arrayOf(
    PropTypes.shape(ScheduledBatchSummaryModelValidationMap)
  ),
  isExpanded: PropTypes.bool,
};
