import { useGetJobPayloadQuery } from '../../../store/radix-api'
import { Code } from '../../code/code'

export interface PayloadProps {
  appName: string
  envName: string
  jobComponentName: string
  jobName: string
}

export const Payload = ({ appName, envName, jobComponentName, jobName }: PayloadProps) => {
  const { data } = useGetJobPayloadQuery(
    {
      appName,
      envName,
      jobComponentName,
      jobName,
    },
    { pollingInterval: 0 }
  )

  return (
    <div className="tw:m-4 tw:mt-0">
      <Code content={data ?? ''} copy />
    </div>
  )
}
