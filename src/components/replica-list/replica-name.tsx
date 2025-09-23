import { Icon, type IconProps, Popover, Typography } from '@equinor/eds-core-react'
import { info_circle } from '@equinor/eds-icons'
import { type FunctionComponent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ReplicaSummary } from '../../store/radix-api'
import { smallReplicaName } from '../../utils/string'

interface ReplicaNameWithHelpDescriptionProps {
  displayName?: string
  replicaName: string
  description: string
  replicaUrlFunc: (name: string) => string
}

const ReplicaNameWithHelpDescription: FunctionComponent<ReplicaNameWithHelpDescriptionProps> = ({
  displayName,
  replicaName,
  description,
  replicaUrlFunc,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Popover open={popoverOpen} anchorEl={containerRef.current} placement={'top'}>
        <Popover.Header>
          <Popover.Title>{displayName || smallReplicaName(replicaName)}</Popover.Title>
        </Popover.Header>

        <Popover.Content className="grid grid--gap-x-small grid--auto-columns">
          <Typography className="replica-name-description">{description}</Typography>
        </Popover.Content>
      </Popover>
      <Typography as={Link} to={replicaUrlFunc(replicaName)} link>
        {displayName || smallReplicaName(replicaName)}{' '}
      </Typography>{' '}
      <span ref={containerRef} onMouseEnter={() => setPopoverOpen(true)} onMouseLeave={() => setPopoverOpen(false)}>
        <Icon data={info_circle} size={16 as IconProps['size']} />
      </span>
    </>
  )
}

export const ReplicaName: FunctionComponent<{
  replica: ReplicaSummary
  replicaUrlFunc: (name: string) => string
}> = ({ replica, replicaUrlFunc }) => {
  switch (replica.type) {
    case 'JobManager':
      return (
        <ReplicaNameWithHelpDescription
          displayName={'Job Manager'}
          replicaName={replica.name}
          description={'Job Manager creates, gets, deletes single jobs and batch jobs with Job API'}
          replicaUrlFunc={replicaUrlFunc}
        />
      )
    case 'JobManagerAux':
      return (
        <ReplicaNameWithHelpDescription
          displayName={'Job Resources Validator'}
          replicaName={replica.name}
          description={
            'Job Resources Validator validates accesses to Volume Mounts and Azure Key Vaults if they are used in a job-component'
          }
          replicaUrlFunc={replicaUrlFunc}
        />
      )
    default:
      return (
        <Typography as={Link} to={replicaUrlFunc(replica.name)} link>
          {smallReplicaName(replica.name)}{' '}
        </Typography>
      )
  }
}
