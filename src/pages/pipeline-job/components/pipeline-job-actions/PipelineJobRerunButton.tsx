import { Button, CircularProgress, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Dialog } from '../../../../components/dialog/Dialog'
import { handlePromiseWithToast } from '../../../../components/global-top-nav/styled-toaster'
import { type Job, radixApi } from '../../../../store/radix-api'
import { smallJobName } from '../../../../utils/string'

interface PipelineJobRerunButtonProps {
  readonly appName: string
  readonly jobName: string
  readonly status: Job['status']
  readonly onRerun: (newJobName: string) => void
}

/**
 * When a job has failed or been stopped, this button allows the user to rerun the job.
 */
export const PipelineJobRerunButton = (props: PipelineJobRerunButtonProps) => {
  const { appName, jobName, status, onRerun } = props
  const [rerunJob, rerunJobState] = radixApi.endpoints.rerunApplicationJob.useMutation()
  const [isConfirmPopupVisible, setIsConfirmPopupVisible] = useState(false)

  const canBeRerun = status === 'Failed' || status === 'Stopped'
  const isRerunning = rerunJobState.isLoading

  if (!canBeRerun) {
    return null
  }

  const openConfirmPopup = () => setIsConfirmPopupVisible(true)
  const closeConfirmPopup = () => setIsConfirmPopupVisible(false)

  const confirmRerun = handlePromiseWithToast(
    async () => {
      closeConfirmPopup()
      const result = await rerunJob({ appName, jobName }).unwrap()
      onRerun(result.name)
    },
    `Pipeline job '${smallJobName(jobName)}' was successfully rerun.`
  )

  return (
    <div>
      <Button onClick={openConfirmPopup} disabled={isRerunning}>
        Rerun
      </Button>
      {isRerunning && (
        <>
          {' '}
          <CircularProgress size={24} />
        </>
      )}

      <Dialog onClose={closeConfirmPopup} open={isConfirmPopupVisible} isDismissable>
        <Dialog.Header>
          <Dialog.Title>Rerun pipeline job</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography>
            Rerunning this pipeline job will create a new job with the same configuration as the original job.
          </Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Button disabled={isRerunning} onClick={confirmRerun}>
            Rerun
          </Button>
          <Button variant="outlined" onClick={closeConfirmPopup}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </div>
  )
}
