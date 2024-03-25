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
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import { JobContextMenu } from './job-context-menu';
import { JobDeploymentLink } from './job-deployment-link';
import { RestartBatch } from './restart-batch';

import { ScrimPopup } from '../../scrim-popup';
import { ProgressStatusBadge } from '../../status-badges';
import { Duration } from '../../time/duration';
import { RelativeToNow } from '../../time/relative-to-now';
import {
  ScheduledBatchSummary,
  ScheduledJobSummary,
  useDeleteBatchMutation,
  useStopBatchMutation,
} from '../../../store/radix-api';
import { promiseHandler } from '../../../utils/promise-handler';
import { getScheduledBatchUrl } from '../../../utils/routing';
import {
  dataSorter,
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../../utils/sort-utils';
import { smallScheduledBatchName } from '../../../utils/string';
import { TableSortIcon, getNewSortDir } from '../../../utils/table-sort-utils';

import './style.css';

function isBatchStoppable(status: ScheduledBatchSummary['status']): boolean {
  return status === 'Waiting' || status === 'Running';
}

type Props = {
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchList?: Array<ScheduledBatchSummary>;
  isExpanded?: boolean;
  fetchBatches?: () => void;
};

class JobStatusesCollected {
  succeeded: number = 0;
  failed: number = 0;
  other: number = 0;
}

const JobStatuses: FunctionComponent<{ jobs?: ScheduledJobSummary[] }> = ({
  jobs,
}) => {
  const statuses = new JobStatusesCollected();
  jobs?.map((job) => {
    switch (job.status) {
      case 'Succeeded':
        statuses.succeeded = statuses.succeeded + 1;
        break;
      case 'Failed':
        statuses.failed = statuses.failed + 1;
        break;
      default:
        statuses.other = statuses.other + 1;
    }
  });
  return (
    <>
      <Typography>
        {statuses.succeeded && <>{`Succeeded: ${statuses.succeeded}`}</>}
        {statuses.failed && <>{`Failed: ${statuses.failed}`}</>}
        {statuses.other && <>{`Other: ${statuses.other}`}</>}
      </Typography>
    </>
  );
};

export function ScheduledBatchList({
  appName,
  envName,
  jobComponentName,
  scheduledBatchList,
  isExpanded,
  fetchBatches: refreshBatches,
}: Props) {
  const [deleteBatch] = useDeleteBatchMutation();
  const [stopBatch] = useStopBatchMutation();
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
  const setVisibleRestartScrim = useCallback<
    (id: string, visible: boolean) => void
  >(
    (id, visible) => setVisibleRestartScrims((x) => ({ ...x, [id]: visible })),
    []
  );

  const sortedData = useMemo(() => {
    return dataSorter(scheduledBatchList, [
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
    ]);
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
                    <Table.Cell>Job statuses</Table.Cell>
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
                            <Typography
                              className="scheduled-job__link"
                              as={Link}
                              to={getScheduledBatchUrl(
                                appName,
                                envName,
                                jobComponentName,
                                batch.name
                              )}
                              link
                              token={{ textDecoration: 'none' }}
                            >
                              {smallBatchName}
                            </Typography>
                          </Table.Cell>
                          <Table.Cell>
                            <ProgressStatusBadge status={batch.status} />
                          </Table.Cell>
                          <Table.Cell>
                            <JobStatuses jobs={batch.jobList}></JobStatuses>
                          </Table.Cell>
                          <Table.Cell>
                            <RelativeToNow
                              time={new Date(batch.created)}
                              capitalize
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Duration
                              start={new Date(batch.created)}
                              end={
                                batch.ended ? new Date(batch.ended) : new Date()
                              }
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
                                  key={0}
                                  disabled={!isBatchStoppable(batch.status)}
                                  onClick={() =>
                                    promiseHandler(
                                      stopBatch({
                                        appName,
                                        envName,
                                        jobComponentName,
                                        batchName: batch.name,
                                      }).unwrap(),
                                      refreshBatches,
                                      `Error stopping batch '${smallBatchName}'`
                                    )
                                  }
                                >
                                  <Icon data={stop} /> Stop
                                </Menu.Item>,
                                <Menu.Item
                                  key={1}
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
                                  key={2}
                                  onClick={() =>
                                    promiseHandler(
                                      deleteBatch({
                                        appName,
                                        envName,
                                        jobComponentName,
                                        batchName: batch.name,
                                      }).unwrap(),
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
}

ScheduledBatchList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  scheduledBatchList: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ScheduledBatchSummary>
  ),
  isExpanded: PropTypes.bool,
  fetchBatches: PropTypes.func,
};
