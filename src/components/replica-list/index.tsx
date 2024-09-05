import { Icon, Table, Typography } from '@equinor/eds-core-react'
import { chevron_down, chevron_up } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import * as PropTypes from 'prop-types'
import {
  Fragment,
  type FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { ReplicaImage } from '../replica-image'
import { ReplicaStatusBadge } from '../status-badges'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'
import type { ReplicaSummary } from '../../store/radix-api'
import {
  dataSorter,
  sortCompareDate,
  sortCompareString,
  type sortDirection,
} from '../../utils/sort-utils'
import { getNewSortDir, TableSortIcon } from '../../utils/table-sort-utils'

import './style.css'
import { ReplicaName } from './replica-name'

export const ReplicaList: FunctionComponent<{
  replicaList: Array<ReplicaSummary>
  replicaUrlFunc: (name: string) => string
}> = ({ replicaList, replicaUrlFunc }) => {
  const [sortedData, setSortedData] = useState(replicaList || [])
  const [dateSort, setDateSort] = useState<sortDirection>()
  const [statusSort, setStatusSort] = useState<sortDirection>()
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  )

  useEffect(() => {
    setLastUpdate(new Date())
  }, [replicaList])

  useEffect(() => {
    setSortedData(
      dataSorter(replicaList, [
        (x, y) =>
          sortCompareDate(x.created, y.created, dateSort, () => !!dateSort),
        (x, y) =>
          sortCompareString(
            x.replicaStatus?.status,
            y.replicaStatus?.status,
            statusSort,
            false,
            () => !!statusSort
          ),
      ])
    )
  }, [dateSort, replicaList, statusSort])

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.Cell>Name</Table.Cell>
          <Table.Cell
            sort="none"
            onClick={() => setStatusSort(getNewSortDir(statusSort, true))}
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
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedData
          .map((x) => ({ replica: x, expanded: !!expandedRows[x.name] }))
          .map(({ replica, expanded }) => (
            <Fragment key={replica.name}>
              <Table.Row
                className={clsx({ 'border-bottom-transparent': expanded })}
              >
                <Table.Cell
                  className={'fitwidth padding-right-0'}
                  variant="icon"
                >
                  <Typography
                    link
                    as="span"
                    onClick={() => expandRow(replica.name)}
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
                  <ReplicaName
                    replica={replica}
                    replicaUrlFunc={replicaUrlFunc}
                  />
                </Table.Cell>
                <Table.Cell>
                  <ReplicaStatusBadge status={replica.replicaStatus?.status} />
                </Table.Cell>
                <Table.Cell>
                  <RelativeToNow time={new Date(replica.created)} />
                </Table.Cell>
                <Table.Cell>
                  <Duration
                    start={new Date(replica.created)}
                    end={lastUpdate}
                  />
                </Table.Cell>
              </Table.Row>
              {expanded && (
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell colSpan={4}>
                    <div className="grid grid--gap-medium">
                      <ReplicaImage replica={replica} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Fragment>
          ))}
      </Table.Body>
    </Table>
  )
}

ReplicaList.propTypes = {
  replicaList: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ReplicaSummary>
  ).isRequired,
  replicaUrlFunc: PropTypes.func.isRequired,
}
