import { Code } from '../../code'
import './style.css'
import { pollingInterval } from '../../../store/defaults'
import { useGetJobPayloadQuery } from '../../../store/radix-api'

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
    { pollingInterval }
  )

  return (
    <div className="payload-content">
      <Code copy resizable>
        {data ?? ''}
      </Code>
    </div>
  )
}
