import { Accordion, Typography } from '@equinor/eds-core-react'
import { getPipelineJobStepLogsStreamUrl } from '../../store/eventstream-log-api'
import { radixApi, useGetPipelineJobStepLogsQuery } from '../../store/radix-api'
import { getFetchErrorCode } from '../../store/utils/parse-errors'
import { StreamingLog } from '../code/log'
import { HistoricalLog } from './historical-log'

import './style.css'
import AsyncResource from '../async-resource/async-resource'

interface StepLogsProps {
  appName: string
  jobName: string
  stepName: string
  start?: string
  end?: string
}

export function JobStepLogs({ appName, jobName, stepName, start, end }: StepLogsProps) {
  const [getLog] = radixApi.endpoints.getPipelineJobStepLogs.useLazyQuery()
  const state = useGetPipelineJobStepLogsQuery(
    { appName, jobName, stepName, lines: '1' },
    { skip: !appName || !jobName || !stepName, pollingInterval: 0 }
  )
  const eventStreamUrl = getPipelineJobStepLogsStreamUrl(appName, jobName, stepName)
  const notFound = state.isError && getFetchErrorCode(state.error) === 404

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4">Log</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          {notFound ? (
            <HistoricalLog appName={appName} jobName={jobName} stepName={stepName} start={start} end={end} />
          ) : (
            <AsyncResource asyncState={state}>
              <StreamingLog
                eventStreamUrl={eventStreamUrl}
                copy
                download
                downloadCb={() => getLog({ appName, jobName, stepName, file: 'true' }, false).unwrap()}
              />
            </AsyncResource>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
