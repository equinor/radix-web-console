import { Accordion, Typography } from '@equinor/eds-core-react'
import { getTektonPipelineRunTaskStepLogsStreamUrl } from '../../store/eventstream-log-api'
import { radixApi } from '../../store/radix-api'
import { StreamingLog } from '../code/log'

interface Props {
  appName: string
  jobName: string
  pipelineRunName: string
  taskName: string
  stepName: string
  title: string
}

export function PipelineRunTaskStepLog({ appName, jobName, pipelineRunName, taskName, stepName, title }: Props) {
  const [getLog] = radixApi.endpoints.getTektonPipelineRunTaskStepLogs.useLazyQuery()
  const eventStreamUrl = getTektonPipelineRunTaskStepLogsStreamUrl(
    appName,
    jobName,
    pipelineRunName,
    taskName,
    stepName
  )

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4" as="span">
              {title}
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <StreamingLog
            eventStreamUrl={eventStreamUrl}
            copy
            download
            filename="{stepName}.txt"
            downloadCb={() =>
              getLog(
                {
                  appName,
                  jobName,
                  pipelineRunName,
                  taskName,
                  stepName,
                  file: 'true',
                },
                false
              ).unwrap()
            }
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
