import { Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { useInterval } from '../../hooks/use-interval'
import type { ReplicaSummary } from '../../store/radix-api'
import { smallReplicaName } from '../../utils/string'
import { ReplicaImage } from '../replica-image'
import { ResourceRequirements } from '../resource-requirements'
import { ReplicaStatusBadge } from '../status-badges'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'

export interface ReplicaElements {
  title?: React.JSX.Element
  duration?: React.JSX.Element
  status?: React.JSX.Element
  state?: React.JSX.Element
}

type OverviewProps = { replica: ReplicaSummary } & ReplicaElements
export const ReplicaOverview = ({ replica, title, duration, status, state }: OverviewProps) => {
  return (
    <>
      <section className="grid grid--gap-medium overview">
        <div className="grid grid--gap-medium grid--overview-columns">
          <div className="grid grid--gap-medium">
            {title || (
              <Typography>
                Replica <strong>{smallReplicaName(replica.name)}</strong>
              </Typography>
            )}
            <ReplicaImage replica={replica} />
            {status || <ReplicaStatusBadge status={replica.replicaStatus?.status ?? 'Pending'} />}
          </div>
          <div className="grid grid--gap-medium">
            {duration || (
              <>
                <ReplicaDuration
                  created={replica.created}
                  ended={replica.endTime ? new Date(replica.endTime) : undefined}
                />
                {replica.containerStarted && (
                  <ContainerDuration
                    started={new Date(replica.containerStarted)}
                    ended={replica.endTime ? new Date(replica.endTime) : undefined}
                  />
                )}
              </>
            )}
          </div>
          <div className="grid grid--gap-medium">
            {replica.resources && <ResourceRequirements resources={replica.resources} />}
          </div>
        </div>
      </section>
      <section className="grid grid--gap-medium">
        {state || (
          <ReplicaState
            restartCount={replica.restartCount}
            statusMessage={replica.statusMessage}
            exitCode={replica.exitCode}
          />
        )}
      </section>
    </>
  )
}

type ContainerDurationProps = { started: number | string | Date; ended?: Date }
const ContainerDuration = ({ started, ended }: ContainerDurationProps) => {
  const [now, setNow] = useState(new Date())
  useInterval(() => setNow(new Date()), 1000)

  return (
    <>
      <Typography>
        Container started{' '}
        <strong>
          <RelativeToNow time={started} />
        </strong>
      </Typography>
      <Typography>
        Container duration{' '}
        <strong>
          <Duration start={started} end={ended || now} />
        </strong>
      </Typography>
    </>
  )
}

type ReplicaDurationProps = { created: number | string | Date; ended?: Date }
const ReplicaDuration = ({ created: started, ended }: ReplicaDurationProps) => {
  const [now, setNow] = useState(new Date())
  useInterval(() => setNow(new Date()), 1000)

  return (
    <>
      <Typography>
        Replica created{' '}
        <strong>
          <RelativeToNow time={started} />
        </strong>
      </Typography>
      {ended && (
        <Typography>
          Replica ended{' '}
          <strong>
            <RelativeToNow time={ended} />
          </strong>
        </Typography>
      )}
      <Typography>
        Replica duration{' '}
        <strong>
          <Duration start={started} end={ended || now} />
        </strong>
      </Typography>
    </>
  )
}

type ReplicaStateProps = {
  restartCount: ReplicaSummary['restartCount']
  statusMessage: ReplicaSummary['statusMessage']
  exitCode: ReplicaSummary['exitCode']
}
const ReplicaState = ({ restartCount, statusMessage, exitCode }: ReplicaStateProps) => (
  <>
    {restartCount && restartCount > 0 && (
      <div>
        <Typography>
          Restarted <strong>{restartCount} times</strong>
        </Typography>
      </div>
    )}
    {exitCode != undefined && exitCode != 0 && (
      <Typography>
        Exit code <strong>{exitCode}</strong>
      </Typography>
    )}

    {statusMessage && (
      <>
        <Typography>
          Status message <strong>{statusMessage}</strong>
        </Typography>
      </>
    )}
  </>
)
