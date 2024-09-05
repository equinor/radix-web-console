import * as PropTypes from 'prop-types'
import type { FunctionComponent } from 'react'
import { logApi } from '../../store/log-api'
import { type ReplicaSummary, radixApi } from '../../store/radix-api'
import type { FetchQueryResult } from '../../store/types'
import { downloadLazyLogCb, downloadLazyLogPromise } from '../code/log-helper'
import { Replica } from '../replica'

import './style.css'
import { Accordion, Typography } from '@equinor/eds-core-react'

export const JobReplica: FunctionComponent<{
  header?: string
  appName: string
  jobComponentName: string
  envName: string
  scheduledJobName: string
  replica?: ReplicaSummary
  logState?: FetchQueryResult<string>
  isExpanded?: boolean
}> = ({
  header,
  appName,
  envName,
  jobComponentName,
  scheduledJobName,
  replica,
  logState,
  isExpanded,
}) => {
  const [getLog] = radixApi.endpoints.jobLog.useLazyQuery()
  const [getHistoryLog] = logApi.endpoints.getJobReplicaLog.useLazyQuery()
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
            <Replica
              replica={replica}
              logState={logState}
              downloadCb={downloadLazyLogCb(
                `${replica.name}.txt`,
                getLog,
                {
                  appName,
                  envName,
                  jobComponentName,
                  scheduledJobName,
                  replicaName: replica.name,
                  file: 'true',
                },
                false
              )}
              getHistoryLog={async () => {
                return await getHistoryLog({
                  appName: appName,
                  envName: envName,
                  jobComponentName: jobComponentName,
                  jobName: scheduledJobName,
                  replicaName: replica.name,
                  tail: 1000,
                }).unwrap()
              }}
              downloadHistoryCb={() =>
                downloadLazyLogPromise(
                  `${replica.name}.txt`,
                  () =>
                    getHistoryLog({
                      appName: appName,
                      envName: envName,
                      jobComponentName: jobComponentName,
                      jobName: scheduledJobName,
                      replicaName: replica.name,
                      file: true,
                    }).unwrap() as unknown as Promise<string>
                )
              }
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

JobReplica.propTypes = {
  header: PropTypes.string,
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  scheduledJobName: PropTypes.string.isRequired,
  replica: PropTypes.object as PropTypes.Validator<ReplicaSummary>,
  logState: PropTypes.object as PropTypes.Validator<FetchQueryResult<string>>,
  isExpanded: PropTypes.bool,
}
