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
import * as PropTypes from 'prop-types';
import {
  ComponentProps,
  Fragment,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';

import AsyncResource from '../async-resource/async-resource';
import { LazyQueryTriggerPlain, downloadLazyLogCb } from '../code/log-helper';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { addMinutes } from 'date-fns';
import {
  ModelsContainer,
  ModelsReplica,
  logApi,
  useGetJobInventoryQuery,
} from '../../store/log-api';
import { pollingInterval } from '../../store/defaults';
import {
  dataSorter,
  sortCompareDate,
  sortDirection,
} from '../../utils/sort-utils';
import { smallGithubCommitHash, smallReplicaName } from '../../utils/string';
import { TableSortIcon, getNewSortDir } from '../../utils/table-sort-utils';

interface JobComponentProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  jobName: string;
}

interface JobComponentHistoryLogProps extends JobComponentProps {
  title: string;
  start: string;
  end?: string;
  isExpanded?: boolean;
}

function LogDownloadButton(props: ComponentProps<typeof Button>) {
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

export function JobComponentHistoryLog({
  appName,
  envName,
  jobComponentName,
  jobName,
  title,
  start,
  end,
  isExpanded,
}: JobComponentHistoryLogProps) {
  end = end ? addMinutes(new Date(end), 10).toISOString() : undefined;
  const jobInventory = useGetJobInventoryQuery(
    { appName, envName, jobComponentName, jobName, end, start },
    {
      skip: !appName || !envName || !jobComponentName || !jobName,
      pollingInterval,
    }
  );

  const [dateSort, setDateSort] = useState<sortDirection>('descending');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  );

  const sortedData = useMemo(() => {
    return dataSorter(jobInventory.data?.replicas, [
      (x, y) =>
        sortCompareDate(x.creationTimestamp, y.creationTimestamp, dateSort),
    ]);
  }, [jobInventory.data?.replicas, dateSort]);

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              {title} ({jobInventory.isLoading ? '…' : sortedData.length})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid">
            <AsyncResource asyncState={jobInventory}>
              {sortedData.length > 0 ? (
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell />
                      <Table.Cell>Run ID</Table.Cell>
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
                          {...{ appName, envName, jobComponentName, jobName }}
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
                              {...{
                                appName,
                                envName,
                                jobComponentName,
                                jobName,
                              }}
                            />
                          ))}
                      </Fragment>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <Typography>This job has no logs</Typography>
              )}
            </AsyncResource>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

const ReplicaLogTableRow: FunctionComponent<
  {
    replica: ModelsReplica;
    isExpanded: boolean;
    onClick: () => void;
  } & JobComponentProps
> = ({
  appName,
  envName,
  jobComponentName,
  jobName,
  replica: { containers, creationTimestamp, lastKnown, name },
  isExpanded,
  onClick,
}) => {
  const [getLog, { isFetching }] =
    logApi.endpoints.getJobReplicaLog.useLazyQuery();

  const created = new Date(creationTimestamp);
  const ended = new Date(lastKnown);

  return (
    <Table.Row className={clsx({ 'border-bottom-transparent': isExpanded })}>
      <Table.Cell className={`fitwidth padding-right-0`} variant="icon">
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
        <RelativeToNow time={created} capitalize includeSeconds />
      </Table.Cell>
      <Table.Cell>
        {Duration({ start: created, end: ended }) || 'N/A'}
      </Table.Cell>
      <Table.Cell className={`fitwidth padding-right-0`} variant="icon">
        <LogDownloadButton
          title="Download Replica log"
          onClick={downloadLazyLogCb(
            `${appName}_${envName}_${jobComponentName}_${jobName}_${smallReplicaName(
              name
            )}.txt`,
            getLog as LazyQueryTriggerPlain<Parameters<typeof getLog>[0]>,
            {
              appName,
              envName,
              jobComponentName,
              jobName,
              replicaName: name,
              start: created.toISOString(),
              end: addMinutes(ended, 10).toISOString(),
            }
          )}
          disabled={isFetching}
        />
      </Table.Cell>
    </Table.Row>
  );
};

type ReplicaContainerTableRowProps = {
  className?: string;
  replicaName: string;
  container: ModelsContainer;
} & JobComponentProps;

function ReplicaContainerTableRow({
  className,
  appName,
  jobComponentName,
  jobName,
  envName,
  replicaName,
  container: { creationTimestamp, id, lastKnown },
}: ReplicaContainerTableRowProps) {
  const [getLog, { isFetching }] =
    logApi.endpoints.getJobContainerLog.useLazyQuery();

  const created = new Date(creationTimestamp);
  const ended = new Date(lastKnown);

  return (
    <Table.Row className={className}>
      <Table.Cell className={`fitwidth padding-right-0`} variant="icon">
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
        <RelativeToNow time={created} capitalize includeSeconds />
      </Table.Cell>
      <Table.Cell>
        <Duration start={created} end={ended} />
      </Table.Cell>
      <Table.Cell className={`fitwidth padding-right-0`} variant="icon">
        <LogDownloadButton
          title="Download Container log"
          onClick={downloadLazyLogCb(
            `${appName}_${envName}_${jobComponentName}_${jobName}_${smallReplicaName(
              replicaName
            )}_${id}.txt`,
            getLog as LazyQueryTriggerPlain<Parameters<typeof getLog>[0]>,
            {
              appName,
              envName,
              jobComponentName,
              jobName,
              replicaName,
              containerId: id,
              start: created.toISOString(),
              end: addMinutes(ended, 10).toISOString(),
            }
          )}
          disabled={isFetching}
        />
      </Table.Cell>
    </Table.Row>
  );
}

JobComponentHistoryLog.propTypes = {
  title: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
};
