import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up, IconData } from '@equinor/eds-icons';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReplicaImage } from '../replica-image';
import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  ScheduledJobSummaryModel,
  ScheduledJobSummaryModelValidationMap,
} from '../../models/scheduled-job-summary';
import { getScheduledJobUrl } from '../../utils/routing';
import { smallScheduledJobName } from '../../utils/string';

import './style.css';

export interface ScheduledJobListProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  totalJobCount: number;
  scheduledJobList?: Array<ScheduledJobSummaryModel>;
  isExpanded?: boolean;
}

const chevronIcons: Array<IconData> = [chevron_down, chevron_up];

export const ScheduledJobList = ({
  appName,
  envName,
  jobComponentName,
  scheduledJobList,
  totalJobCount,
  isExpanded,
}: ScheduledJobListProps): JSX.Element => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  function expandRow(name: string): void {
    setExpandedRows({ ...expandedRows, [name]: !expandedRows[name] });
  }

  return scheduledJobList?.length > 0 ? (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4">
              Scheduled job{scheduledJobList?.length > 1 ? 's' : ''} (
              <span>
                {scheduledJobList.length}
                {totalJobCount > 0 && <>/{totalJobCount}</>}
              </span>
              )
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--table-overflow">
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
                {scheduledJobList
                  .map((x) => ({ job: x, expanded: !!expandedRows[x.name] }))
                  .map(({ job, expanded }, i) => (
                    <Fragment key={i}>
                      <Table.Row
                        className={classNames({
                          'border-bottom-transparent': expanded,
                        })}
                      >
                        <Table.Cell
                          className={`fitwidth padding-right-0`}
                          variant="icon"
                        >
                          <Typography
                            link
                            as="span"
                            onClick={() => expandRow(job.name)}
                          >
                            <Icon
                              size={24}
                              data={chevronIcons[+!!expanded]}
                              role="button"
                              title="Toggle more information"
                            />
                          </Typography>
                        </Table.Cell>
                        <Table.Cell>
                          <Link
                            className="scheduled-job__link"
                            to={getScheduledJobUrl(
                              appName,
                              envName,
                              jobComponentName,
                              job.name
                            )}
                          >
                            <Typography
                              link
                              as="span"
                              token={{ textDecoration: 'none' }}
                            >
                              {smallScheduledJobName(job.name)}
                            </Typography>
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <StatusBadge type={job.status}>
                            {job.status}
                          </StatusBadge>
                        </Table.Cell>
                        <Table.Cell>
                          <RelativeToNow time={job.created} capitalize />
                        </Table.Cell>
                        <Table.Cell>
                          <Duration
                            start={job.created}
                            end={job.ended ?? new Date()}
                          />
                        </Table.Cell>
                      </Table.Row>
                      {expanded && (
                        <Table.Row>
                          <Table.Cell />
                          <Table.Cell colSpan={4}>
                            <div className="grid grid--gap-medium">
                              <span />
                              {job.replicaList?.length > 0 ? (
                                <ReplicaImage replica={job.replicaList[0]} />
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
                  ))}
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
} as PropTypes.ValidationMap<ScheduledJobListProps>;
