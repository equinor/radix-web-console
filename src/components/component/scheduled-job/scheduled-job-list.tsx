import {
  Accordion,
  Icon,
  Menu,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import {
  apps,
  chevron_down,
  chevron_up,
  delete_to_trash,
  replay,
  stop,
} from '@equinor/eds-icons';
import { clsx } from 'clsx';
import {
  Fragment,
  type FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import { JobContextMenu } from './job-context-menu';
import { JobDeploymentLink } from './job-deployment-link';
import { Payload } from './payload';
import { RestartJob } from './restart-job';

import {
  type ReplicaSummary,
  type ScheduledJobSummary,
  useDeleteJobMutation,
  useStopJobMutation,
} from '../../../store/radix-api';
import { promiseHandler } from '../../../utils/promise-handler';
import {
  getScheduledBatchJobUrl,
  getScheduledJobUrl,
} from '../../../utils/routing';
import {
  type SortDirection,
  dataSorter,
  sortCompareDate,
  sortCompareString,
} from '../../../utils/sort-utils';
import { smallScheduledJobName } from '../../../utils/string';
import { TableSortIcon, getNewSortDir } from '../../../utils/table-sort-utils';
import { ReplicaImage } from '../../replica-image';
import { ScrimPopup } from '../../scrim-popup';
import { ProgressStatusBadge } from '../../status-badges';
import { Duration } from '../../time/duration';
import { RelativeToNow } from '../../time/relative-to-now';

import '../style.css';

function isJobStoppable(status: ScheduledJobSummary['status']): boolean {
  return status === 'Waiting' || status === 'Running';
}

const JobReplicaInfo: FunctionComponent<{
  replicaList?: Array<ReplicaSummary>;
}> = ({ replicaList }) =>
  replicaList && replicaList.length > 0 ? (
    <ReplicaImage replica={replicaList[0]} />
  ) : (
    <Typography>
      Unable to get image tag and digest. The container for this job no longer
      exists.
    </Typography>
  );

export const ScheduledJobList: FunctionComponent<{
  appName: string;
  envName: string;
  jobComponentName: string;
  batchName?: string;
  totalJobCount: number;
  scheduledJobList?: Array<ScheduledJobSummary>;
  isDeletable?: boolean; // set if jobs can be deleted
  fetchJobs?: () => void;
  isExpanded?: boolean;
  onExpanded?: (isExpanded: boolean) => void;
}> = ({
  appName,
  envName,
  jobComponentName,
  scheduledJobList,
  totalJobCount,
  batchName,
  isDeletable,
  fetchJobs: refreshJobs,
  isExpanded,
  onExpanded,
}) => {
  const [deleteJob] = useDeleteJobMutation();
  const [stopJob] = useStopJobMutation();
  const [dateSort, setDateSort] = useState<SortDirection>(undefined);
  const [statusSort, setStatusSort] = useState<SortDirection>(undefined);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [visiblePayloadScrims, setVisiblePayloadScrims] = useState<
    Record<string, boolean>
  >({});
  const [visibleRestartScrims, setVisibleRestartScrims] = useState<
    Record<string, boolean>
  >({});

  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  );
  const setVisiblePayloadScrim = useCallback<
    (id: string, visible: boolean) => void
  >(
    (id, visible) => setVisiblePayloadScrims((x) => ({ ...x, [id]: visible })),
    []
  );
  const setVisibleRestartScrim = useCallback<
    (id: string, visible: boolean) => void
  >(
    (id, visible) => setVisibleRestartScrims((x) => ({ ...x, [id]: visible })),
    []
  );

  const sortedData = useMemo(() => {
    return dataSorter(scheduledJobList, [
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
  }, [dateSort, scheduledJobList, statusSort]);

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded} onExpandedChange={onExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4" as="span">
              Jobs ({sortedData.length}
              {totalJobCount > 0 && `/${totalJobCount}`})
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
                    <Table.Cell>Job ID</Table.Cell>
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
                    .map((job) => ({
                      job,
                      smallJobName: smallScheduledJobName(job.name),
                      expanded: !!expandedRows[job.name],
                    }))
                    .map(({ job, smallJobName, expanded }, i) => (
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
                            <Typography
                              link
                              as="span"
                              onClick={() => expandRow(job.name)}
                            >
                              <Icon
                                size={24}
                                data={expanded ? chevron_up : chevron_down}
                                role="button"
                                title="Toggle more information"
                              />
                            </Typography>
                          </Table.Cell>
                          <Table.Cell>
                            <Typography
                              className="scheduled-job__link"
                              as={Link}
                              to={
                                batchName
                                  ? getScheduledBatchJobUrl(
                                      appName,
                                      envName,
                                      jobComponentName,
                                      batchName,
                                      job.name
                                    )
                                  : getScheduledJobUrl(
                                      appName,
                                      envName,
                                      jobComponentName,
                                      job.name
                                    )
                              }
                              link
                              token={{ textDecoration: 'none' }}
                            >
                              {smallJobName}
                            </Typography>
                          </Table.Cell>
                          <Table.Cell>{job.jobId}</Table.Cell>
                          <Table.Cell>
                            <ProgressStatusBadge status={job.status} />
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            <RelativeToNow time={job.created} capitalize />
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            <Duration
                              start={job.created}
                              end={job.ended ? new Date(job.ended) : new Date()}
                            />
                          </Table.Cell>
                          <Table.Cell width="1">
                            <ScrimPopup
                              title={`Payload for job: ${job.name}`}
                              open={!!visiblePayloadScrims[job.name]}
                              onClose={() =>
                                setVisiblePayloadScrim(job.name, false)
                              }
                              isDismissable
                            >
                              <Payload
                                appName={appName}
                                envName={envName}
                                jobComponentName={jobComponentName}
                                jobName={job.name}
                              />
                            </ScrimPopup>
                            <ScrimPopup
                              title={`Restart job ${smallJobName}`}
                              open={!!visibleRestartScrims[job.name]}
                              onClose={() =>
                                setVisibleRestartScrim(job.name, false)
                              }
                              isDismissable
                            >
                              <RestartJob
                                appName={appName}
                                envName={envName}
                                jobComponentName={jobComponentName}
                                deploymentName={job.deploymentName}
                                jobName={job.name}
                                smallJobName={smallJobName}
                                onSuccess={refreshJobs}
                                onDone={() =>
                                  setVisibleRestartScrim(job.name, false)
                                }
                              />
                            </ScrimPopup>
                            <JobContextMenu
                              menuItems={[
                                <Menu.Item
                                  key={0}
                                  onClick={() =>
                                    setVisiblePayloadScrim(
                                      job.name,
                                      !visiblePayloadScrims[job.name]
                                    )
                                  }
                                >
                                  <Icon data={apps} /> Payload
                                </Menu.Item>,
                                <Menu.Item
                                  key={1}
                                  disabled={!isJobStoppable(job.status)}
                                  onClick={() =>
                                    promiseHandler(
                                      stopJob({
                                        appName,
                                        envName,
                                        jobComponentName,
                                        jobName: job.name,
                                      }).unwrap(),
                                      refreshJobs,
                                      `Error stopping job '${smallJobName}'`
                                    )
                                  }
                                >
                                  <Icon data={stop} /> Stop
                                </Menu.Item>,
                                <Menu.Item
                                  key={2}
                                  onClick={() =>
                                    setVisibleRestartScrim(
                                      job.name,
                                      !visibleRestartScrims[job.name]
                                    )
                                  }
                                >
                                  <Icon data={replay} /> Restart
                                </Menu.Item>,
                                isDeletable && (
                                  <Menu.Item
                                    key={4}
                                    onClick={() =>
                                      promiseHandler(
                                        deleteJob({
                                          appName,
                                          envName,
                                          jobComponentName,
                                          jobName: job.name,
                                        }).unwrap(),
                                        refreshJobs,
                                        `Error deleting job '${smallJobName}'`
                                      )
                                    }
                                  >
                                    <Icon data={delete_to_trash} /> Delete
                                  </Menu.Item>
                                ),
                              ]}
                            />
                          </Table.Cell>
                        </Table.Row>

                        {expanded && (
                          <Table.Row>
                            <Table.Cell />
                            <Table.Cell colSpan={6}>
                              <div className="grid grid--gap-medium">
                                {job.deploymentName ? (
                                  <JobDeploymentLink
                                    appName={appName}
                                    jobComponentName={jobComponentName}
                                    deploymentName={job.deploymentName}
                                  />
                                ) : (
                                  <JobReplicaInfo
                                    replicaList={job.replicaList}
                                  />
                                )}
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </Fragment>
                    ))}
                </Table.Body>
              </Table>
            ) : (
              <Typography>This component has no jobs.</Typography>
            )}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
