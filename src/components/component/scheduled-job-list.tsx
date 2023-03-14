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
  IconData,
  stop,
} from '@equinor/eds-icons';
import { clsx } from 'clsx';
import * as PropTypes from 'prop-types';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { JobContextMenu } from './job-context-menu';
import { JobDeploymentLink } from './job-deployment-link';
import { Payload } from './scheduled-job/payload';

import { ReplicaImage } from '../replica-image';
import { ScrimPopup } from '../scrim-popup';
import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { deleteJob, stopJob } from '../../api/jobs';
import { ProgressStatus } from '../../models/progress-status';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import {
  ScheduledJobSummaryModel,
  ScheduledJobSummaryModelValidationMap,
} from '../../models/scheduled-job-summary';
import { getScheduledJobUrl } from '../../utils/routing';
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

const chevronIcons: Array<IconData> = [chevron_down, chevron_up];

export interface ScheduledJobListProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  totalJobCount: number;
  scheduledJobList?: Array<ScheduledJobSummaryModel>;
  isExpanded?: boolean;
  isDeletable?: boolean;
}

function isJobStoppable({ status }: ScheduledJobSummaryModel): boolean {
  return status === ProgressStatus.Waiting || status === ProgressStatus.Running;
}

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
}: ScheduledJobListProps): JSX.Element => {
  const [visibleScrims, setVisibleScrims] = useState<Record<string, boolean>>(
    {}
  );

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

  function setScrimState(id: string, visible: boolean) {
    setVisibleScrims({ ...visibleScrims, [id]: visible });
  }

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4">
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
                          <Table.Cell width="1">
                            <ScrimPopup
                              title={`Payload for job: ${job.name}`}
                              open={!!visibleScrims[job.name]}
                              onClose={() => setScrimState(job.name, false)}
                              isDismissable
                            >
                              <Payload
                                appName={appName}
                                envName={envName}
                                jobComponentName={jobComponentName}
                                jobName={job.name}
                              />
                            </ScrimPopup>
                            <JobContextMenu
                              menuItems={[
                                <Menu.Item
                                  onClick={() =>
                                    setScrimState(
                                      job.name,
                                      !visibleScrims[job.name]
                                    )
                                  }
                                >
                                  <Icon data={apps} /> Payload
                                </Menu.Item>,
                                <Menu.Item
                                  disabled={!isJobStoppable(job)}
                                  onClick={() =>
                                    stopJob(
                                      appName,
                                      envName,
                                      jobComponentName,
                                      job.name
                                    )
                                  }
                                >
                                  <Icon data={stop} /> Stop
                                </Menu.Item>,
                                isDeletable && (
                                  <Menu.Item
                                    onClick={() =>
                                      deleteJob(
                                        appName,
                                        envName,
                                        jobComponentName,
                                        job.name
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
                            <Table.Cell colSpan={5}>
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
} as PropTypes.ValidationMap<ScheduledJobListProps>;
