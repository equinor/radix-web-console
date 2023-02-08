import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up, IconData } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import * as PropTypes from 'prop-types';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  ScheduledBatchSummaryModel,
  ScheduledBatchSummaryModelValidationMap,
} from '../../models/scheduled-batch-summary';
import { getScheduledBatchUrl } from '../../utils/routing';
import {
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../utils/sort-utils';
import { smallScheduledBatchName } from '../../utils/string';
import {
  getNewSortDir,
  tableDataSorter,
  TableSortIcon,
} from '../../utils/table-sort-utils';

import './style.css';
import { JobDeploymentInfo } from './job-deployment-link';

export interface ScheduledBatchListProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchList?: Array<ScheduledBatchSummaryModel>;
  isExpanded?: boolean;
}

const chevronIcons: Array<IconData> = [chevron_down, chevron_up];

export const ScheduledBatchList = ({
  appName,
  envName,
  jobComponentName,
  scheduledBatchList,
  isExpanded,
}: ScheduledBatchListProps): JSX.Element => {
  const [sortedData, setSortedData] = useState(scheduledBatchList || []);

  const [dateSort, setDateSort] = useState<sortDirection>();
  const [statusSort, setStatusSort] = useState<sortDirection>();
  useEffect(() => {
    setSortedData(
      tableDataSorter(scheduledBatchList, [
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
  }, [dateSort, scheduledBatchList, statusSort]);

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
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Scheduled batches ({sortedData.length ?? '...'})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--table-overflow">
            {sortedData.length > 0 ? (
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
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {sortedData
                    .map((item) => ({
                      batch: item,
                      expanded:
                        !!expandedRows[item.name] && item.deploymentName,
                    }))
                    .map(({ batch, expanded }, i) => (
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
                            {batch.deploymentName && (
                              <Typography
                                link
                                as="span"
                                onClick={() => expandRow(batch.name)}
                              >
                                <Icon
                                  size={24}
                                  data={chevronIcons[+!!expanded]}
                                  role="button"
                                  title="Toggle more information"
                                />
                              </Typography>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <Link
                              className="scheduled-job__link"
                              to={getScheduledBatchUrl(
                                appName,
                                envName,
                                jobComponentName,
                                batch.name
                              )}
                            >
                              <Typography
                                link
                                as="span"
                                token={{ textDecoration: 'none' }}
                              >
                                {smallScheduledBatchName(batch.name)}
                              </Typography>
                            </Link>
                          </Table.Cell>
                          <Table.Cell>
                            <StatusBadge type={batch.status}>
                              {batch.status}
                            </StatusBadge>
                          </Table.Cell>
                          <Table.Cell>
                            <RelativeToNow time={batch.created} capitalize />
                          </Table.Cell>
                          <Table.Cell>
                            <Duration
                              start={batch.created}
                              end={batch.ended ?? new Date()}
                            />
                          </Table.Cell>
                        </Table.Row>
                        {expanded && batch.deploymentName && (
                          <Table.Row>
                            <Table.Cell />
                            <Table.Cell colSpan={4}>
                              <div className="grid grid--gap-medium">
                                <JobDeploymentInfo
                                  appName={appName}
                                  jobComponentName={jobComponentName}
                                  deploymentName={batch.deploymentName}
                                />
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </Fragment>
                    ))}
                </Table.Body>
              </Table>
            ) : (
              <Typography>This component has no scheduled batches.</Typography>
            )}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
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
} as PropTypes.ValidationMap<ScheduledBatchListProps>;
