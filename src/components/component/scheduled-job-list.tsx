import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up, IconData } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import * as PropTypes from 'prop-types';
import { Fragment, useCallback, useEffect, useState } from 'react';
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
import { Payload } from './scheduled-job/payload';
import {
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../utils/sort-utils';
import { smallScheduledJobName } from '../../utils/string';
import {
  getNewSortDir,
  tableDataSorter,
  TableSortIcon,
} from '../../utils/table-sort-utils';

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
  const [sortedData, setSortedData] = useState(scheduledJobList || []);

  const [dateSort, setDateSort] = useState<sortDirection>();
  const [statusSort, setStatusSort] = useState<sortDirection>();
  useEffect(() => {
    setSortedData(
      tableDataSorter(scheduledJobList, [
        (x, y) =>
          sortCompareDate(x.created, y.created, dateSort, () => !!dateSort),
        (x, y) =>
          sortCompareString(
            x.status,
            y.status,
            statusSort,
            false,
            () => !!statusSort
          ),
      ])
    );
  }, [dateSort, scheduledJobList, statusSort]);

  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const expandRow = useCallback(
    (name: string): void =>
      setExpandedRows({ ...expandedRows, [name]: !expandedRows[name] }),
    [expandedRows]
  );

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4">
              Scheduled jobs ({sortedData.length}
              {totalJobCount > 0 && <>/{totalJobCount}</>})
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
                  <Table.Cell
                    sort="none"
                    onClick={() =>
                      setStatusSort(getNewSortDir(statusSort, true))
                    }
                  >
                    Status
                    <TableSortIcon direction={statusSort} />
                  </Table.Cell>
                  <Table.Cell
                    sort="none"
                    onClick={() => setDateSort(getNewSortDir(dateSort, true))}
                  >
                    Created
                    <TableSortIcon direction={dateSort} />
                  </Table.Cell>
                  <Table.Cell>Duration</Table.Cell>
                  <Table.Cell>Payload</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {sortedData
                  .map((x) => ({ job: x, expanded: !!expandedRows[x.name] }))
                  .map(({ job, expanded }, i) => (
                    <Fragment key={i}>
                      <Table.Row
                        className={clsx({
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
                        <Table.Cell>
                          <Payload
                            appName={appName}
                            envName={envName}
                            jobComponentName={jobComponentName}
                            jobName={job.name}
                          />
                        </Table.Cell>
                      </Table.Row>
                      {expanded && (
                        <Table.Row>
                          <Table.Cell />
                          <Table.Cell colSpan={5}>
                            <div className="grid grid--gap-medium">
                              {job.replicaList?.length > 0 ? (
                                <ReplicaImage replica={job.replicaList[0]} />
                              ) : (
                                <Typography>
                                  Unable to get image tag and digest. The
                                  container for this job no longer exists.
                                </Typography>
                              )}
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
  );
};

ScheduledJobList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  totalJobCount: PropTypes.number.isRequired,
  scheduledJobList: PropTypes.arrayOf(
    PropTypes.shape(ScheduledJobSummaryModelValidationMap)
  ),
  isExpanded: PropTypes.bool,
} as PropTypes.ValidationMap<ScheduledJobListProps>;
