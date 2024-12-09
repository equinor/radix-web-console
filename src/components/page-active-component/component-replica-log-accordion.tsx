import {
  Accordion,
  Button,
  CircularProgress,
  Icon,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import { chevron_down, chevron_up, download, invert } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import { Fragment, useCallback, useMemo, useState } from 'react';

import { addMinutes } from 'date-fns';
import { pollingInterval } from '../../store/defaults';
import {
  type ModelsContainer,
  type ModelsReplica,
  logApi,
  useGetComponentInventoryQuery,
} from '../../store/log-api';
import {
  type SortDirection,
  dataSorter,
  sortCompareDate,
} from '../../utils/sort-utils';
import { smallGithubCommitHash, smallReplicaName } from '../../utils/string';
import { TableSortIcon, getNewSortDir } from '../../utils/table-sort-utils';
import AsyncResource from '../async-resource/async-resource';
import { downloadLog } from '../code/log-helper';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

interface ComponentNameProps {
  appName: string;
  envName: string;
  componentName: string;
}

interface ComponentReplicaLogAccordionProps extends ComponentNameProps {
  title: string;
  isExpanded?: boolean;
}

function LogDownloadButton(props: {
  title?: string;
  disabled?: boolean;
  onClick: () => unknown;
}) {
  return (
    <Button variant="ghost_icon" {...props}>
      {props.disabled ? (
        <CircularProgress size={16} />
      ) : (
        <Icon data={download} role="button" />
      )}
    </Button>
  );
}

export function ComponentReplicaLogAccordion({
  appName,
  envName,
  componentName,
  title,
  isExpanded,
}: ComponentReplicaLogAccordionProps) {
  const inventory = useGetComponentInventoryQuery(
    { appName, envName, componentName },
    { skip: !appName || !envName || !componentName, pollingInterval }
  );

  const [dateSort, setDateSort] = useState<SortDirection>('descending');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  );

  const sortedData = useMemo(() => {
    return dataSorter(inventory.data?.replicas, [
      (x, y) =>
        sortCompareDate(x.creationTimestamp, y.creationTimestamp, dateSort),
    ]);
  }, [inventory.data?.replicas, dateSort]);

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              {title} ({inventory.isLoading ? '…' : sortedData.length})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid">
            <AsyncResource asyncState={inventory}>
              {sortedData.length > 0 ? (
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell />
                      <Table.Cell>Name</Table.Cell>
                      <Table.Cell>Containers</Table.Cell>
                      <Table.Cell
                        sort="none"
                        onClick={() => setDateSort(getNewSortDir(dateSort))}
                      >
                        Created
                        <TableSortIcon direction={dateSort} />
                      </Table.Cell>
                      <Table.Cell>Duration</Table.Cell>
                      <Table.Cell />
                    </Table.Row>
                  </Table.Head>

                  <Table.Body>
                    {sortedData.map((replica) => (
                      <Fragment key={replica.name}>
                        <ReplicaLogTableRow
                          replica={replica}
                          isExpanded={!!expandedRows[replica.name]}
                          onClick={() => expandRow(replica.name)}
                          {...{ appName, envName, componentName }}
                        />

                        {!!expandedRows[replica.name] &&
                          dataSorter(replica.containers, [
                            (a, b) =>
                              sortCompareDate(
                                a.creationTimestamp,
                                b.creationTimestamp,
                                'descending'
                              ),
                          ]).map((container, i, { length }) => (
                            <ReplicaContainerTableRow
                              key={container.id}
                              className={clsx({
                                'border-bottom-transparent': length - 1 > i,
                              })}
                              container={container}
                              replicaName={replica.name}
                              {...{ appName, envName, componentName }}
                            />
                          ))}
                      </Fragment>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <Typography>This component has no replica logs</Typography>
              )}
            </AsyncResource>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

type ReplicaLogTableRowProps = {
  replica: ModelsReplica;
  isExpanded: boolean;
  onClick: () => void;
} & ComponentNameProps;
function ReplicaLogTableRow({
  appName,
  envName,
  componentName,
  replica: { containers, creationTimestamp, lastKnown, name },
  isExpanded,
  onClick,
}: ReplicaLogTableRowProps) {
  const [getLog, { isFetching }] =
    logApi.endpoints.getComponentReplicaLog.useLazyQuery();

  return (
    <Table.Row className={clsx({ 'border-bottom-transparent': isExpanded })}>
      <Table.Cell className={'fitwidth padding-right-0'} variant="icon">
        <Typography link as="span" onClick={onClick}>
          <Icon
            title="Toggle more information"
            data={isExpanded ? chevron_up : chevron_down}
            size={24}
            role="button"
          />
        </Typography>
      </Table.Cell>
      <Table.Cell>
        <Typography>{smallReplicaName(name)}</Typography>
      </Table.Cell>
      <Table.Cell variant="numeric">{containers?.length || 0}</Table.Cell>
      <Table.Cell>
        <RelativeToNow time={creationTimestamp} capitalize includeSeconds />
      </Table.Cell>
      <Table.Cell>
        {Duration({ start: creationTimestamp, end: lastKnown }) || 'N/A'}
      </Table.Cell>
      <Table.Cell className={'fitwidth padding-right-0'} variant="icon">
        <LogDownloadButton
          title="Download Replica log"
          onClick={() =>
            downloadLog(
              `${appName}_${envName}_${componentName}_${name}.txt`,
              () =>
                getLog({
                  appName,
                  envName,
                  componentName,
                  replicaName: name,
                  start: creationTimestamp,
                  // @ts-expect-error lastKnown is set, button is disabled when not
                  end: addMinutes(lastKnown, 10).toISOString(),
                }).unwrap() as Promise<string>
            )
          }
          disabled={isFetching || !lastKnown}
        />
      </Table.Cell>
    </Table.Row>
  );
}

type ReplicaContainerTableRowProps = {
  className?: string;
  replicaName: string;
  container: ModelsContainer;
} & ComponentNameProps;
function ReplicaContainerTableRow({
  className,
  appName,
  componentName,
  envName,
  replicaName,
  container: { creationTimestamp, id, lastKnown },
}: ReplicaContainerTableRowProps) {
  const [getLog, { isFetching }] =
    logApi.endpoints.getComponentContainerLog.useLazyQuery();

  return (
    <Table.Row className={className}>
      <Table.Cell className={'fitwidth padding-right-0'} variant="icon">
        <Icon title="Container" data={invert} color="gray" />
      </Table.Cell>
      <Table.Cell>
        <Typography
          title={id}
          variant="body_long_italic"
          token={{ fontSize: '97.5%' }}
        >
          {smallGithubCommitHash(id)}
        </Typography>
      </Table.Cell>
      <Table.Cell />
      <Table.Cell>
        <RelativeToNow time={creationTimestamp} capitalize includeSeconds />
      </Table.Cell>
      <Table.Cell>
        <Duration start={creationTimestamp} end={lastKnown} />
      </Table.Cell>
      <Table.Cell className={'fitwidth padding-right-0'} variant="icon">
        <LogDownloadButton
          title="Download Container log"
          onClick={() =>
            downloadLog(
              `${appName}_${envName}_${componentName}_${replicaName}_${id}.txt`,
              () =>
                getLog({
                  appName,
                  envName,
                  componentName,
                  replicaName,
                  containerId: id,
                  start: creationTimestamp,
                  // @ts-expect-error last known is set, button is disabled when not
                  end: addMinutes(lastKnown, 10).toISOString(),
                }).unwrap() as Promise<string>
            )
          }
          disabled={isFetching || !lastKnown}
        />
      </Table.Cell>
    </Table.Row>
  );
}
