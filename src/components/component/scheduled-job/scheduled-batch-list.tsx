import {
  Accordion,
  Icon,
  Menu,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_up,
  delete_to_trash,
  replay,
  stop,
} from '@equinor/eds-icons';
import { clsx } from 'clsx';
import * as PropTypes from 'prop-types';
import {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { JobContextMenu } from './job-context-menu';
import { JobDeploymentLink } from './job-deployment-link';
import { RestartBatch } from './restart-batch';

import { ScrimPopup } from '../../scrim-popup';
import { ProgressStatusBadge } from '../../status-badges';
import { Duration } from '../../time/duration';
import { RelativeToNow } from '../../time/relative-to-now';
import { deleteBatch, stopBatch } from '../../../api/jobs';
import { JobSchedulerProgressStatus } from '../../../models/radix-api/deployments/job-scheduler-progress-status';
import {
  ScheduledBatchSummaryModel,
  ScheduledBatchSummaryModelValidationMap,
} from '../../../models/radix-api/deployments/scheduled-batch-summary';
import { refreshEnvironmentScheduledBatches } from '../../../state/subscriptions/action-creators';
import { promiseHandler } from '../../../utils/promise-handler';
import { getScheduledBatchUrl } from '../../../utils/routing';
import {
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../../utils/sort-utils';
import { smallScheduledBatchName } from '../../../utils/string';
import {
  TableSortIcon,
  getNewSortDir,
  tableDataSorter,
} from '../../../utils/table-sort-utils';

import './style.css';

interface ScheduledBatchListDispatch {
  refreshScheduledBatches?: (
    appName: string,
    envName: string,
    jobComponentName: string
  ) => void;
}

export interface ScheduledBatchListProps extends ScheduledBatchListDispatch {
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchList?: Array<ScheduledBatchSummaryModel>;
  isExpanded?: boolean;
}

function isBatchStoppable({ status }: ScheduledBatchSummaryModel): boolean {
  return (
    status === JobSchedulerProgressStatus.Waiting ||
    status === JobSchedulerProgressStatus.Running
  );
}

export const ScheduledBatchList: FunctionComponent<ScheduledBatchListProps> = ({
  appName,
  envName,
  jobComponentName,
  scheduledBatchList,
  isExpanded,
  refreshScheduledBatches,
}) => {
  const [sortedData, setSortedData] = useState(scheduledBatchList || []);
  const [dateSort, setDateSort] = useState<sortDirection>();
  const [statusSort, setStatusSort] = useState<sortDirection>();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [visibleRestartScrims, setVisibleRestartScrims] = useState<
    Record<string, boolean>
  >({});

  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  );
  const refreshBatches = useCallback(
    () => refreshScheduledBatches?.(appName, envName, jobComponentName),
    [appName, envName, jobComponentName, refreshScheduledBatches]
  );
  const setVisibleRestartScrim = useCallback<
    (id: string, visible: boolean) => void
  >(
    (id, visible) => setVisibleRestartScrims((x) => ({ ...x, [id]: visible })),
    []
  );

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

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Batches ({sortedData.length ?? '…'})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid">
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
                    <Table.Cell />
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {sortedData
                    .map((x) => ({
                      batch: x,
                      smallBatchName: smallScheduledBatchName(x.name),
                      expanded: !!(expandedRows[x.name] && x.deploymentName),
                    }))
                    .map(({ batch, smallBatchName, expanded }, i) => (
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
                                  data={expanded ? chevron_up : chevron_down}
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
                                {smallBatchName}
                              </Typography>
                            </Link>
                          </Table.Cell>
                          <Table.Cell>
                            <ProgressStatusBadge status={batch.status} />
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
                          <Table.Cell width="1">
                            <ScrimPopup
                              title={`Restart batch ${smallBatchName}`}
                              open={!!visibleRestartScrims[batch.name]}
                              onClose={() =>
                                setVisibleRestartScrim(batch.name, false)
                              }
                              isDismissable
                            >
                              <RestartBatch
                                appName={appName}
                                envName={envName}
                                jobComponentName={jobComponentName}
                                deploymentName={batch.deploymentName}
                                batchName={batch.name}
                                smallBatchName={smallBatchName}
                                onSuccess={refreshBatches}
                                onDone={() =>
                                  setVisibleRestartScrim(batch.name, false)
                                }
                              />
                            </ScrimPopup>
                            <JobContextMenu
                              menuItems={[
                                <Menu.Item
                                  disabled={!isBatchStoppable(batch)}
                                  onClick={() =>
                                    promiseHandler(
                                      stopBatch(
                                        appName,
                                        envName,
                                        jobComponentName,
                                        batch.name
                                      ),
                                      refreshBatches,
                                      `Error stopping batch '${smallBatchName}'`
                                    )
                                  }
                                >
                                  <Icon data={stop} /> Stop
                                </Menu.Item>,
                                <Menu.Item
                                  onClick={() =>
                                    setVisibleRestartScrim(
                                      batch.name,
                                      !visibleRestartScrims[batch.name]
                                    )
                                  }
                                >
                                  <Icon data={replay} /> Restart
                                </Menu.Item>,
                                <Menu.Item
                                  onClick={() =>
                                    promiseHandler(
                                      deleteBatch(
                                        appName,
                                        envName,
                                        jobComponentName,
                                        batch.name
                                      ),
                                      refreshBatches,
                                      `Error deleting batch '${smallBatchName}'`
                                    )
                                  }
                                >
                                  <Icon data={delete_to_trash} /> Delete
                                </Menu.Item>,
                              ]}
                            />
                          </Table.Cell>
                        </Table.Row>

                        {expanded && (
                          <Table.Row>
                            <Table.Cell />
                            <Table.Cell colSpan={4}>
                              <div className="grid grid--gap-medium">
                                <JobDeploymentLink
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
              <Typography>This component has no batches.</Typography>
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
    PropTypes.shape(
      ScheduledBatchSummaryModelValidationMap
    ) as PropTypes.Validator<ScheduledBatchSummaryModel>
  ),
  isExpanded: PropTypes.bool,
  refreshScheduledBatches: PropTypes.func,
};

function mapDispatchToProps(dispatch: Dispatch): ScheduledBatchListDispatch {
  return {
    refreshScheduledBatches: (...args) =>
      dispatch(refreshEnvironmentScheduledBatches(...args)),
  };
}

export default connect(undefined, mapDispatchToProps)(ScheduledBatchList);
