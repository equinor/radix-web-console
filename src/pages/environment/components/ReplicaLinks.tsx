import { Typography } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import { ReplicaStatusTooltip } from '../../../components/status-tooltips'
import type { ReplicaSummary } from '../../../store/radix-api'
import { smallReplicaName } from '../../../utils/string'

interface ReplicaLinksProps {
  readonly replicaList?: Readonly<Array<ReplicaSummary>>
  readonly urlFunc: (replica: ReplicaSummary) => string
}

export const ReplicaLinks = (props: ReplicaLinksProps) => {
  const { replicaList, urlFunc } = props

  if (!replicaList || replicaList.length === 0) {
    return <Typography>No active replicas</Typography>
  }

  return (
    <div className="component-replica__link-container">
      {replicaList.map((replica) => (
        <Typography key={replica.name} className="component-replica__link" as={Link} to={urlFunc(replica)} link>
          <ReplicaStatusTooltip status={replica.replicaStatus?.status ?? 'Pending'} />
          {smallReplicaName(replica.name)}
        </Typography>
      ))}
    </div>
  )
}
