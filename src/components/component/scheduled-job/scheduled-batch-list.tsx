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
import { Fragment, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { JobContextMenu } from './job-context-menu';
import { JobDeploymentLink } from './job-deployment-link';
import { RestartBatch } from './restart-batch';

import {
  type ScheduledBatchSummary,
  useDeleteBatchMutation,
  useStopBatchMutation,
} from '../../../store/radix-api';
import { promiseHandler } from '../../../utils/promise-handler';
import { getScheduledBatchUrl } from '../../../utils/routing';
import {
  type SortDirection,
  dataSorter,
  sortCompareDate,
  sortCompareString,
} from '../../../utils/sort-utils';
import { smallScheduledBatchName } from '../../../utils/string';
import { TableSortIcon, getNewSortDir } from '../../../utils/table-sort-utils';
import { ScrimPopup } from '../../scrim-popup';
import { Duration } from '../../time/duration';
import { RelativeToNow } from '../../time/relative-to-now';
import { BatchJobStatuses } from './batch-job-statuses';

import './style.css';
import useLocalStorage from '../../../effects/use-local-storage';
import { ScheduledBatchStatusBadge } from '../../status-badges/scheduled-batch-status';

function isBatchStoppable(status: ScheduledBatchSummary['status']): boolean {
  return status === 'Waiting' || status === 'Running';
}

type Props = {
  appName: string;
  envName: string;
  jobComponentName: string;
  scheduledBatchList?: Array<ScheduledBatchSummary>;
  fetchBatches?: () => unknown;
};

export function ScheduledBatchList({
  appName,
  envName,
  jobComponentName,
  scheduledBatchList,
  fetchBatches: refreshBatches,
}: Props) {
  const [deleteBatch] = useDeleteBatchMutation();
  const [stopBatch] = useStopBatchMutation();
  const [dateSort, setDateSort] = useState<SortDirection>();
  const [statusSort, setStatusSort] = useState<SortDirection>();
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
  const [isExpanded, setIsExpanded] = useLocalStorage<boolean>(
    'batchJobListExpanded',
    false
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
      <Accordion.Item
        isExpanded={isExpanded}
        onExpandedChange={(expanded) => setIsExpanded(expanded)}
      >
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
                    <Table.Cell>Batch ID</Table.Cell>
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
                            className={'fitwidth padding-right-0'}
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
                          <Table.Cell>{batch.batchId}</Table.Cell>
                          <Table.Cell>
                            <ScheduledBatchStatusBadge status={batch.status} />
                          </Table.Cell>
                          <Table.Cell>
                            <BatchJobStatuses jobs={batch.jobList} />
                          </Table.Cell>
                          <Table.Cell>
                            <RelativeToNow time={batch.created} capitalize />
                          </Table.Cell>
                          <Table.Cell>
                            <Duration
                              start={batch.created}
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
