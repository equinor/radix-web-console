import { RelativeToNow } from '../../../../../components/time/relative-to-now'
import type { Step } from '../../../../../store/radix-api'
import { differenceInWords, formatDateTimePrecise } from '../../../../../utils/datetime'

type PipelineJobStepDurationProps = Pick<Step, 'started' | 'ended'>

export const PipelineJobStepDuration = (props: PipelineJobStepDurationProps) => {
  const { started, ended } = props

  if (!started) {
    return <>Not yet started</>
  }

  return (
    <>
      <RelativeToNow time={new Date(started)} titlePrefix="Start time" capitalize />
      {ended && (
        <span title={`End time ${formatDateTimePrecise(new Date(ended))}`}>
          {differenceInWords(new Date(ended), new Date(started))}
        </span>
      )}
    </>
  )
}
