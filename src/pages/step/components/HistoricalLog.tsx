import { Typography } from '@equinor/eds-core-react'
import { addMinutes } from 'date-fns'
import AsyncResource from '../../../components/async-resource/async-resource'
import { Log } from '../../../components/code/log'
import { pollingInterval } from '../../../store/defaults'
import {
  type ModelsContainer,
  type ModelsInventoryResponse,
  useGetPipelineJobContainerLogQuery,
  useGetPipelineJobInventoryQuery,
} from '../../../store/log-api'
import type { Step } from '../../../store/radix-api'

interface StepLogsProps {
  appName: string
  jobName: string
  step: Step
  start?: string
  end?: string
}

export function HistoricalLog({ appName, jobName, step, start, end }: StepLogsProps) {
  end = end ? addMinutes(new Date(end), 10).toISOString() : undefined
  const { container, ...state } = useGetPipelineJobInventoryQuery(
    { appName, pipelineJobName: jobName, start, end },
    {
      skip: !appName || !jobName,
      pollingInterval: 0,
      selectFromResult: ({ data, ...state }) => ({
        container: data ? findContainer(data, step) : null,
        ...state,
      }),
    }
  )

  return (
    <AsyncResource asyncState={state}>
      {container ? (
        <ContainerLog jobName={jobName} appName={appName} start={start} end={end} container={container} />
      ) : (
        <Typography>This replica has no log</Typography>
      )}
    </AsyncResource>
  )
}

type BrandedContainerModel = ModelsContainer & { parentId: string }

function findContainer(data: ModelsInventoryResponse, step: Step): BrandedContainerModel | null {
  for (const replica of data?.replicas ?? []) {
    if (step.podName && replica.name !== step.podName) {
      continue
    }
    for (const container of replica.containers ?? []) {
      const containerName = (step.containerName ?? '').length > 0 ? step.containerName : (step.name ?? '')
      if (container.name === containerName) {
        return { ...container, parentId: replica.name }
      }
    }
  }
  return null
}

type ContainerLogProps = {
  appName: string
  jobName: string
  container: BrandedContainerModel
  start?: string
  end?: string
}
function ContainerLog({ appName, container: { name, parentId, id }, jobName, start, end }: ContainerLogProps) {
  const localEnd = end ? addMinutes(new Date(end), 10).toISOString() : undefined
  const { data, ...state } = useGetPipelineJobContainerLogQuery(
    {
      appName,
      pipelineJobName: jobName,
      replicaName: parentId,
      containerId: id,
      start,
      end: localEnd,
    },
    { skip: !appName || !jobName || !parentId || !id, pollingInterval: end ? 0 : pollingInterval }
  )

  return (
    <AsyncResource asyncState={state}>
      {data ? (
        <Log content={data as string} copy download filename={`${jobName}_${name}.txt`} />
      ) : (
        <Typography>This replica has no log</Typography>
      )}
    </AsyncResource>
  )
}
