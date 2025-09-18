import { useGetJobPayloadQuery } from '../../../store/radix-api'
import { Code } from '../../code/code'

import './style.css'

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
    <div className="payload">
      <Code content={data ?? ''} copy />
    </div>
  )
}
