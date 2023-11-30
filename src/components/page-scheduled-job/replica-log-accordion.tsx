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
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import AsyncResource from '../async-resource/another-async-resource';
import { errorToast } from '../global-top-nav/styled-toaster';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { RawModel } from '../../models/model-types';
import {
  ModelsContainer,
  ModelsReplica,
  logApi,
  useGetJobInventoryQuery,
} from '../../store/log-api';
import { FetchQueryResult } from '../../store/types';
import { getFetchErrorData } from '../../store/utils';
import { sortCompareDate, sortDirection } from '../../utils/sort-utils';
import {
  copyToTextFile,
  smallGithubCommitHash,
  smallReplicaName,
} from '../../utils/string';
import {
  TableSortIcon,
  getNewSortDir,
  tableDataSorter,
} from '../../utils/table-sort-utils';

interface JobNameProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  jobName: string;
}

export interface JobReplicaLogAccordionProps extends JobNameProps {
  title: string;
  timeSpan?: { start: Date; end?: Date };
  isExpanded?: boolean;
}

const LogDownloadButton: FunctionComponent<{
  title?: string;
  disabled?: boolean;
  onClick: () => void;
}> = (props) => (
  <Button variant="ghost_icon" {...props}>
    {props.disabled ? (
      <CircularProgress size={16} />
    ) : (
      <Icon data={download} role="button" />
    )}
  </Button>
);

function getTimespan(
  span: JobReplicaLogAccordionProps['timeSpan']
): RawModel<JobReplicaLogAccordionProps['timeSpan']> {
  return {
    ...(span && {
      start: new Date(span.start).toISOString(),
      end: span.end && new Date(span.end.getTime() + 10 * 60000).toISOString(),
    }),
  };
}

function saveLog(
  query: Pick<FetchQueryResult, 'data' | 'error' | 'isError' | 'isSuccess'>,
  filename: string,
  errMsg = 'Failed to download log'
): void {
  if (query.isSuccess) {
    copyToTextFile(filename, query.data as string);
  } else if (query.isError) {
    const { code, message } = getFetchErrorData(query.error);
    errorToast(`${errMsg}: ${code && `[${code}] `}${message}`);
  }
}

export const JobReplicaLogAccordion: FunctionComponent<
  JobReplicaLogAccordionProps
> = ({
  appName,
  envName,
  jobComponentName,
  jobName,
  title,
  timeSpan,
  isExpanded,
}) => {
  const jobInventory = useGetJobInventoryQuery(
    { appName, envName, jobComponentName, jobName, ...getTimespan(timeSpan) },
    { skip: !appName || !envName || !jobComponentName || !jobName }
  );

  const [sortedData, setSortedData] = useState<Array<ModelsReplica>>([]);
  const [dateSort, setDateSort] = useState<sortDirection>('descending');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  );

  useEffect(() => {
    if (jobInventory.isSuccess) {
      setSortedData(
        tableDataSorter(jobInventory.data?.replicas, [
          (x, y) =>
            sortCompareDate(x.creationTimestamp, y.creationTimestamp, dateSort),
        ])
      );
    }
  }, [jobInventory.data, jobInventory.isSuccess, dateSort]);

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
                          replica.containers
                            ?.sort((a, b) =>
                              sortCompareDate(
                                a.creationTimestamp,
                                b.creationTimestamp,
                                'descending'
                              )
                            )
                            .map((container, i, { length }) => (
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
};

const ReplicaLogTableRow: FunctionComponent<
  {
    replica: ModelsReplica;
    isExpanded: boolean;
    onClick: () => void;
  } & JobNameProps
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
          onClick={async () => {
            const response = await getLog({
              appName,
              envName,
              jobComponentName,
              jobName,
              replicaName: name,
            });

            const filename = `${appName}_${envName}_${jobComponentName}_${jobName}_${smallReplicaName(
              name
            )}.txt`;
            saveLog(response, filename);
          }}
          disabled={isFetching}
        />
      </Table.Cell>
    </Table.Row>
  );
};

const ReplicaContainerTableRow: FunctionComponent<
  {
    className?: string;
    replicaName: string;
    container: ModelsContainer;
  } & JobNameProps
> = ({
  className,
  appName,
  jobComponentName,
  jobName,
  envName,
  replicaName,
  container: { creationTimestamp, id, lastKnown },
}) => {
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
          onClick={async () => {
            const response = await getLog({
              appName,
              envName,
              jobComponentName,
              jobName,
              replicaName,
              containerId: id,
            });

            const filename = `${appName}_${envName}_${jobComponentName}_${jobName}_${smallReplicaName(
              replicaName
            )}_${id}.txt`;
            saveLog(response, filename);
          }}
          disabled={isFetching}
        />
      </Table.Cell>
    </Table.Row>
  );
};

JobReplicaLogAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
};
