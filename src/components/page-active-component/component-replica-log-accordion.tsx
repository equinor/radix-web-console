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
import { Fragment, FunctionComponent, useEffect, useState } from 'react';

import { useGetComponentInventory } from './use-get-component-inventory';
import { useGetReplicaContainerLog } from './use-get-replica-container-log';
import { useGetReplicaLog } from './use-get-replica-log';

import AsyncResource from '../async-resource/simple-async-resource';
import { AsyncState } from '../../effects/effect-types';
import { errorToast } from '../global-top-nav/styled-toaster';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ContainerModel } from '../../models/log-api/models/container';
import { ReplicaModel } from '../../models/log-api/models/replica';
import { RequestState } from '../../state/state-utils/request-states';
import { sortCompareDate, sortDirection } from '../../utils/sort-utils';
import {
  copyToTextFile,
  smallGithubCommitHash,
  smallReplicaName,
} from '../../utils/string';
import {
  getNewSortDir,
  tableDataSorter,
  TableSortIcon,
} from '../../utils/table-sort-utils';

interface ComponentNameProps {
  appName: string;
  envName: string;
  componentName: string;
}

export interface ComponentReplicaLogAccordionProps extends ComponentNameProps {
  title: string;
  isExpanded?: boolean;
}

const chevronIcons = [chevron_down, chevron_up];

const LogDownloadButton: FunctionComponent<{
  status: RequestState;
  title?: string;
  disabled?: boolean;
  onClick: () => void;
}> = ({ status, ...rest }) => (
  <Button variant="ghost_icon" {...rest}>
    {status === RequestState.IN_PROGRESS ? (
      <CircularProgress size={16} />
    ) : (
      <Icon data={download} role="button" />
    )}
  </Button>
);

function useSaveLog(
  { data, status, error }: AsyncState<string>,
  fileName: string,
  errMsg = 'Failed to download log'
): void {
  useEffect(() => {
    if (status === RequestState.SUCCESS) {
      const extension = !fileName.endsWith('.txt') ? '.txt' : '';
      copyToTextFile(`${fileName}${extension}`, data);
    } else if (status === RequestState.FAILURE) {
      errorToast(`${errMsg}: ${error}`);
    }
  }, [data, errMsg, error, fileName, status]);
}

export const ComponentReplicaLogAccordion: FunctionComponent<
  ComponentReplicaLogAccordionProps
> = ({ appName, envName, componentName, title, isExpanded }) => {
  const [componentInventory] = useGetComponentInventory(
    appName,
    envName,
    componentName
  );

  const [expandRows, setExpandRows] = useState<Record<string, boolean>>({});
  function toggleExpandRow(name: string) {
    setExpandRows({ ...expandRows, [name]: !expandRows[name] });
  }

  const [replicas, setReplicas] = useState<Array<ReplicaModel>>([]);
  const [dateSort, setDateSort] = useState<sortDirection>('descending');
  useEffect(() => {
    if (componentInventory.status === RequestState.SUCCESS) {
      setReplicas(
        tableDataSorter(componentInventory.data?.replicas, [
          (x, y) =>
            sortCompareDate(x.creationTimestamp, y.creationTimestamp, dateSort),
        ])
      );
    }
  }, [componentInventory.data, componentInventory.status, dateSort]);

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              {title} (
              {componentInventory.status === RequestState.IN_PROGRESS
                ? '…'
                : replicas.length}
              )
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid">
            <AsyncResource asyncState={componentInventory}>
              {replicas.length > 0 ? (
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
                    {replicas
                      .map((x) => ({
                        replica: x,
                        expanded: !!expandRows[x.name],
                      }))
                      .map(({ replica, expanded }) => (
                        <Fragment key={replica.name}>
                          <ReplicaLogTableRow
                            {...{ appName, envName, componentName }}
                            replica={replica}
                            isExpanded={expanded}
                            onClick={() => toggleExpandRow(replica.name)}
                          />
                          {expanded &&
                            replica.containers
                              ?.sort(
                                (
                                  { creationTimestamp: x },
                                  { creationTimestamp: y }
                                ) => sortCompareDate(x, y, 'descending')
                              )
                              .map((container, i, { length }) => (
                                <ReplicaContainerTableRow
                                  key={container.id}
                                  container={container}
                                  replicaName={replica.name}
                                  {...{ appName, envName, componentName }}
                                  {...(length - 1 > i && {
                                    className: 'border-bottom-transparent',
                                  })}
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
};

const ReplicaLogTableRow: FunctionComponent<
  {
    replica: ReplicaModel;
    isExpanded: boolean;
    onClick: () => void;
  } & ComponentNameProps
> = ({
  appName,
  envName,
  componentName,
  replica: { containers, name, creationTimestamp, lastKnown },
  isExpanded,
  onClick,
}) => {
  const [replicaLog, getReplicaLog] = useGetReplicaLog(
    appName,
    envName,
    componentName,
    name
  );
  useSaveLog(replicaLog, `${appName}_${envName}_${componentName}_${name}`);

  return (
    <Table.Row className={clsx({ 'border-bottom-transparent': isExpanded })}>
      <Table.Cell className={`fitwidth padding-right-0`} variant="icon">
        <Typography link as="span" onClick={onClick}>
          <Icon
            title="Toggle more information"
            data={chevronIcons[+!!isExpanded]}
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
        <RelativeToNow time={creationTimestamp} capitalize />
      </Table.Cell>
      <Table.Cell>
        {Duration({ start: creationTimestamp, end: lastKnown }) || 'N/A'}
      </Table.Cell>
      <Table.Cell className={`fitwidth padding-right-0`} variant="icon">
        <LogDownloadButton
          title="Download Replica log"
          status={replicaLog.status}
          onClick={() => getReplicaLog()}
          disabled={replicaLog.status === RequestState.IN_PROGRESS}
        />
      </Table.Cell>
    </Table.Row>
  );
};

const ReplicaContainerTableRow: FunctionComponent<
  {
    className?: string;
    replicaName: string;
    container: ContainerModel;
  } & ComponentNameProps
> = ({
  className,
  appName,
  componentName,
  envName,
  replicaName,
  container: { id, creationTimestamp, lastKnown },
}) => {
  const [containerLog, getReplicaContainerLog] = useGetReplicaContainerLog(
    appName,
    envName,
    componentName,
    replicaName,
    id
  );
  useSaveLog(
    containerLog,
    `${appName}_${envName}_${componentName}_${replicaName}_${id}`
  );

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
        <RelativeToNow time={creationTimestamp} capitalize />
      </Table.Cell>
      <Table.Cell>
        <Duration start={creationTimestamp} end={lastKnown} />
      </Table.Cell>
      <Table.Cell className={`fitwidth padding-right-0`} variant="icon">
        <LogDownloadButton
          title="Download Container log"
          status={containerLog.status}
          onClick={() => getReplicaContainerLog()}
          disabled={containerLog.status === RequestState.IN_PROGRESS}
        />
      </Table.Cell>
    </Table.Row>
  );
};

ComponentReplicaLogAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
};
