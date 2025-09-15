import { type FunctionComponent, useState } from 'react'
import { logApi } from '../../store/log-api'
import { type ReplicaSummary, radixApi } from '../../store/radix-api'

import './style.css'
import { Accordion, Typography } from '@equinor/eds-core-react'
import { getScheduledJobLogStreamUrl } from '../../store/use-log'
import { StreamingLog } from '../code/log'
import { ReplicaOverview } from '../replica/replica-overview'

export const JobReplica: FunctionComponent<{
  header?: string
  appName: string
  jobComponentName: string
  envName: string
  scheduledJobName: string
  replica: ReplicaSummary
  isExpanded?: boolean
}> = ({ header, appName, envName, jobComponentName, scheduledJobName, replica, isExpanded }) => {
  const [getLog] = radixApi.endpoints.jobLog.useLazyQuery()
  const [_getHistoryLog] = logApi.endpoints.getJobReplicaLog.useLazyQuery()

  const [_log, _setLog] = useState('')
  const [_historyLog, _setHistoryLog] = useState('')

  // const eventStreamUrl = getJobLogStreamUrl(appName, envName, jobComponentName, scheduledJobName, replica.name)
  const eventStreamUrl = getScheduledJobLogStreamUrl(appName, envName, jobComponentName, scheduledJobName, replica.name)

  // useEffect(() => {
  //   getLog({ appName, envName, jobComponentName, scheduledJobName, replicaName: replica.name }).then(({ data }) =>
  //     setLog(data!)
  //   )
  // }, [replica, getLog, appName, envName, jobComponentName, scheduledJobName])

  // useEffect(() => {
  //   if (log) {
  //     return
  //   }
  //   getHistoryLog({ appName, envName, jobComponentName, jobName: jobComponentName, replicaName: replica.name }).then(
  //     ({ data }) => setHistoryLog(data as string)
  //   )
  // }, [replica, log, getHistoryLog, appName, envName, jobComponentName])

  return (
    <div className="grid grid--gap-medium">
      <Accordion className="accordion elevated" chevronPosition="right">
        <Accordion.Item isExpanded={isExpanded}>
          <Accordion.Header>
            <Accordion.HeaderTitle>
              <Typography variant="h4">{header}</Typography>
            </Accordion.HeaderTitle>
          </Accordion.Header>
          <Accordion.Panel>
            <>
              <ReplicaOverview replica={replica} />

              <StreamingLog
                eventStreamUrl={eventStreamUrl}
                copy
                download
                filename={`${replica.name}.txt`}
                downloadCb={() =>
                  getLog(
                    {
                      appName,
                      envName,
                      jobComponentName,
                      scheduledJobName,
                      replicaName: replica.name,
                      file: 'true',
                    },
                    false
                  ).unwrap()
                }
              />
            </>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
