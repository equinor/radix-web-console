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
  stop,
  replay,
} from '@equinor/eds-icons';
import { clsx } from 'clsx';
import * as PropTypes from 'prop-types';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { deleteJob, stopJob } from '../../../api/jobs';
import { JobSchedulerProgressStatus } from '../../../models/radix-api/deployments/job-scheduler-progress-status';
import { ReplicaSummaryNormalizedModel } from '../../../models/radix-api/deployments/replica-summary';
import {
  ScheduledJobSummaryModel,
  ScheduledJobSummaryModelValidationMap,
} from '../../../models/radix-api/deployments/scheduled-job-summary';
import { refreshEnvironmentScheduledJobs } from '../../../state/subscriptions/action-creators';
import { getScheduledJobUrl } from '../../../utils/routing';
import {
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../../utils/sort-utils';
import { smallScheduledJobName } from '../../../utils/string';
import {
  getNewSortDir,
  tableDataSorter,
  TableSortIcon,
} from '../../../utils/table-sort-utils';
import { errorToast } from '../../global-top-nav/styled-toaster';
import { ReplicaImage } from '../../replica-image';
import { ScrimPopup } from '../../scrim-popup';
import { ProgressStatusBadge } from '../../status-badges';
import { Duration } from '../../time/duration';
import { RelativeToNow } from '../../time/relative-to-now';
import { JobContextMenu } from './job-context-menu';
import { JobDeploymentLink } from './job-deployment-link';
import { Payload } from './payload';
import { RestartJob } from './restart-job';

import '../style.css';

interface ScheduledJobListDispatch {
  refreshScheduledJobs?: (
    appName: string,
    envName: string,
    jobComponentName: string
  ) => void;
}

export interface ScheduledJobListProps extends ScheduledJobListDispatch {
  appName: string;
  envName: string;
  jobComponentName: string;
  totalJobCount: number;
  scheduledJobList?: Array<ScheduledJobSummaryModel>;
  isExpanded?: boolean;
  isDeletable?: boolean; // set if jobs can be deleted
}

function jobPromiseHandler<T>(
  promise: Promise<T>,
  onSuccess: (data: T) => void,
  errMsg = 'Error'
): void {
  promise
    .then(onSuccess)
    .catch((err) => errorToast(`${errMsg}: ${err.message}`));
}

function isJobStoppable({ status }: ScheduledJobSummaryModel): boolean {
  return (
    status === JobSchedulerProgressStatus.Waiting ||
    status === JobSchedulerProgressStatus.Running
  );
}

const chevronIcons = [chevron_down, chevron_up];

const JobReplicaInfo = ({
  replicaList,
}: {
  replicaList: Array<ReplicaSummaryNormalizedModel>;
}): JSX.Element =>
  replicaList?.length > 0 ? (
    <ReplicaImage replica={replicaList[0]} />
  ) : (
    <Typography>
      Unable to get image tag and digest. The container for this job no longer
      exists.
    </Typography>
  );

export const ScheduledJobList = ({
  appName,
  envName,
  jobComponentName,
  scheduledJobList,
  totalJobCount,
  isExpanded,
  isDeletable,
  refreshScheduledJobs,
}: ScheduledJobListProps): JSX.Element => {
  const [sortedData, setSortedData] = useState(scheduledJobList || []);
  const [dateSort, setDateSort] = useState<sortDirection>();
  const [statusSort, setStatusSort] = useState<sortDirection>();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [visiblePayloadScrims, setVisiblePayloadScrims] = useState<
    Record<string, boolean>
  >({});
  const [visibleRestartScrims, setVisibleRestartScrims] = useState<
    Record<string, boolean>
  >({});

  const setPayloadScrimState = (id: string, visible: boolean): void => {
    setVisiblePayloadScrims({ ...visiblePayloadScrims, [id]: visible });
  };
  const setRestartScrimState = (id: string, visible: boolean): void => {
    setVisibleRestartScrims({ ...visibleRestartScrims, [id]: visible });
  };

  const refreshJobs = useCallback(
    () => refreshScheduledJobs?.(appName, envName, jobComponentName),
    [appName, envName, jobComponentName, refreshScheduledJobs]
  );
  const expandRow = useCallback(
    (name: string): void =>
      setExpandedRows({ ...expandedRows, [name]: !expandedRows[name] }),
    [expandedRows]
  );

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

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
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
                    .map((x) => ({
                      job: x,
                      smallJobName: smallScheduledJobName(x.name),
                      expanded: !!expandedRows[x.name],
                    }))
                    .map(({ job, smallJobName, expanded }, i) => (
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
                                data={chevronIcons[+expanded]}
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
                                {smallJobName}
                              </Typography>
                            </Link>
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
                              end={job.ended ?? new Date()}
                            />
                          </Table.Cell>
                          <Table.Cell width="1">
                            <ScrimPopup
                              title={`Payload for job: ${job.name}`}
                              open={!!visiblePayloadScrims[job.name]}
                              onClose={() =>
                                setPayloadScrimState(job.name, false)
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
                                setRestartScrimState(job.name, false)
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
                                  setRestartScrimState(job.name, false)
                                }
                              ></RestartJob>
                            </ScrimPopup>
                            <JobContextMenu
                              menuItems={[
                                <Menu.Item
                                  onClick={() =>
                                    setPayloadScrimState(
                                      job.name,
                                      !visiblePayloadScrims[job.name]
                                    )
                                  }
                                >
                                  <Icon data={apps} /> Payload
                                </Menu.Item>,
                                <Menu.Item
                                  disabled={!isJobStoppable(job)}
                                  onClick={() =>
                                    jobPromiseHandler(
                                      stopJob(
                                        appName,
                                        envName,
                                        jobComponentName,
                                        job.name
                                      ),
                                      refreshJobs,
                                      `Error stopping job '${smallJobName}'`
                                    )
                                  }
                                >
                                  <Icon data={stop} /> Stop
                                </Menu.Item>,
                                <Menu.Item
                                  onClick={() =>
                                    setRestartScrimState(
                                      job.name,
                                      !visibleRestartScrims[job.name]
                                    )
                                  }
                                >
                                  <Icon data={replay} /> Restart
                                </Menu.Item>,
                                isDeletable && (
                                  <Menu.Item
                                    onClick={() =>
                                      jobPromiseHandler(
                                        deleteJob(
                                          appName,
                                          envName,
                                          jobComponentName,
                                          job.name
                                        ),
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

ScheduledJobList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  totalJobCount: PropTypes.number.isRequired,
  scheduledJobList: PropTypes.arrayOf(
    PropTypes.shape(ScheduledJobSummaryModelValidationMap)
  ),
  isExpanded: PropTypes.bool,
  isDeletable: PropTypes.bool,
  refreshScheduledJobs: PropTypes.func,
} as PropTypes.ValidationMap<ScheduledJobListProps>;

function mapDispatchToProps(dispatch: Dispatch): ScheduledJobListDispatch {
  return {
    refreshScheduledJobs: (...args) =>
      dispatch(refreshEnvironmentScheduledJobs(...args)),
  };
}

export default connect(undefined, mapDispatchToProps)(ScheduledJobList);
