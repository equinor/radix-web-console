import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { IconData, chevron_down, chevron_up } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import * as PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';

import { useGetComponentInventory } from './use-get-component-inventory';

import AsyncResource from '../async-resource/simple-async-resource';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ContainerModel } from '../../models/log-api/models/container';
import { ReplicaModel } from '../../models/log-api/models/replica';
import { RequestState } from '../../state/state-utils/request-states';
import { sortCompareDate, sortDirection } from '../../utils/sort-utils';
import { smallGithubCommitHash, smallReplicaName } from '../../utils/string';
import {
  getNewSortDir,
  tableDataSorter,
  TableSortIcon,
} from '../../utils/table-sort-utils';

export interface ComponentReplicaLogListProps {
  title: string;
  appName: string;
  envName: string;
  componentName: string;
  isExpanded?: boolean;
}

const chevronIcons: Array<IconData> = [chevron_down, chevron_up];

export const ComponentReplicaLogList = ({
  title,
  appName,
  envName,
  componentName,
  isExpanded,
}: ComponentReplicaLogListProps): JSX.Element => {
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
                ? '...'
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
                          <ReplicaLogRow
                            replica={replica}
                            isExpanded={expanded}
                            onClick={() => toggleExpandRow(replica.name)}
                          />
                          {expanded && replica.containers?.length > 0 && (
                            <ReplicaContainerRow
                              colSpan={5}
                              containers={replica.containers}
                            />
                          )}
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

const ReplicaLogRow = ({
  replica: { containers, name, creationTimestamp, lastKnown },
  isExpanded,
  onClick,
}: {
  replica: ReplicaModel;
  isExpanded: boolean;
  onClick: () => void;
}): JSX.Element => (
  <Table.Row className={clsx({ 'border-bottom-transparent': isExpanded })}>
    <Table.Cell className={`fitwidth padding-right-0`} variant="icon">
      <Typography link as="span" onClick={onClick}>
        <Icon
          size={24}
          data={chevronIcons[+!!isExpanded]}
          role="button"
          title="Toggle more information"
        />
      </Typography>
    </Table.Cell>
    <Table.Cell>
      <Typography>{smallReplicaName(name)}</Typography>
    </Table.Cell>
    <Table.Cell>{containers?.length || 0}</Table.Cell>
    <Table.Cell>
      <RelativeToNow time={creationTimestamp} capitalize />
    </Table.Cell>
    <Table.Cell>
      {Duration({ start: creationTimestamp, end: lastKnown }) || 'N/A'}
    </Table.Cell>
  </Table.Row>
);

const ReplicaContainerRow = ({
  containers,
  colSpan,
}: {
  containers: Array<ContainerModel>;
  colSpan?: number;
}): JSX.Element => (
  <Table.Row>
    <Table.Cell />
    <Table.Cell colSpan={colSpan - 1}>
      <div className="grid grid--gap-medium">
        {containers
          .sort(({ creationTimestamp: x }, { creationTimestamp: y }) =>
            sortCompareDate(x, y, 'descending')
          )
          .map(({ id, creationTimestamp, lastKnown }) => (
            <div key={id} className="grid grid--gap-large grid--auto-columns">
              <div>
                <Typography variant="body_short_bold">Container ID</Typography>
                <Typography variant="body_short_bold">Created</Typography>
                <Typography variant="body_short_bold">Duration</Typography>
              </div>
              <div>
                <Typography>{smallGithubCommitHash(id)}</Typography>
                <Typography>
                  <RelativeToNow time={creationTimestamp} capitalize />
                </Typography>
                <Typography>
                  <Duration start={creationTimestamp} end={lastKnown} />
                </Typography>
              </div>
            </div>
          ))}
      </div>
    </Table.Cell>
  </Table.Row>
);

ComponentReplicaLogList.propTypes = {
  title: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
} as PropTypes.ValidationMap<ComponentReplicaLogListProps>;
