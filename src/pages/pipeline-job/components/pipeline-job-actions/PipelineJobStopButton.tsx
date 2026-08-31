import { Button, CircularProgress } from '@equinor/eds-core-react'
import { handlePromiseWithToast } from '../../../../components/global-top-nav/styled-toaster'
import { type Job, radixApi } from '../../../../store/radix-api'
import { canStopJob, getStopButtonText } from '../pipeline-job.utils'

interface PipelineJobStopButtonProps {
  readonly appName: string
  readonly jobName: string
  readonly status: Job['status']
  readonly onStopped: () => void
}

export const PipelineJobStopButton = (props: PipelineJobStopButtonProps) => {
  const { appName, jobName, status, onStopped } = props

  const [stopJob, stopJobState] = radixApi.endpoints.stopApplicationJob.useMutation()

  const canStop = canStopJob(status)
  const isStopping = stopJobState.isLoading || status === 'Stopping'

  if (!canStop && !isStopping) {
    return null
  }

  const confirmStop = handlePromiseWithToast(async () => {
    await stopJob({ appName, jobName }).unwrap()
    onStopped()
  }, 'Stopped')

  return (
    <div>
      {canStop && (
        <Button onClick={confirmStop} disabled={isStopping}>
          {getStopButtonText(status)}
        </Button>
      )}

      {isStopping && (
        <>
          {' '}
          <CircularProgress size={24} />
        </>
      )}
    </div>
  )
}
