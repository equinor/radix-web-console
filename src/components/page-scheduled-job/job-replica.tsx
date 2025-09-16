import { type FunctionComponent, useState } from 'react'
import { logApi, useGetJobReplicaLogQuery } from '../../store/log-api'
import { type ReplicaSummary, radixApi, useJobLogQuery } from '../../store/radix-api'

import './style.css'
import { Accordion, Typography } from '@equinor/eds-core-react'
import { getScheduledJobLogStreamUrl } from '../../store/eventstream-log-api'
import { getFetchErrorCode } from '../../store/utils/parse-errors'
import AsyncResource from '../async-resource/async-resource'
import { Log, StreamingLog } from '../code/log'
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


  const state = useJobLogQuery(
    { appName, envName, jobComponentName, scheduledJobName, lines: '1', replicaName: replica.name },
    { skip: !appName || !scheduledJobName || !jobComponentName, pollingInterval: 0 }
  )
  const notFound = state.isError && getFetchErrorCode(state.error) === 404

  const historyLogState = useGetJobReplicaLogQuery(
    { appName, envName, jobComponentName, jobName: scheduledJobName, replicaName: replica.name },
    { skip: !notFound && !state.isLoading }
  )

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
            <AsyncResource asyncState={{ isLoading: state.isLoading || historyLogState.isLoading, isError: false }}>
              <ReplicaOverview replica={replica} />
              {notFound && (
                <Log content={historyLogState.data as string} copy download filename={`${replica.name}.txt`} />
              )}
              {!notFound && (
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
              )}
            </AsyncResource>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
