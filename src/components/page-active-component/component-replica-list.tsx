import { Accordion, Typography } from '@equinor/eds-core-react'
import type { ReplicaSummary } from '../../store/radix-api'
import { getReplicaUrl } from '../../utils/routing'
import { ReplicaList } from '../replica-list'

type Props = {
  title: string
  appName: string
  envName: string
  componentName: string
  replicaList?: Array<ReplicaSummary>
  isExpanded?: boolean
  showUtilization?: boolean
}
export const ComponentReplicaList = ({
  title,
  appName,
  envName,
  componentName,
  replicaList,
  isExpanded,
  showUtilization,
}: Props) => (
  <Accordion className="accordion elevated" chevronPosition="right">
    <Accordion.Item isExpanded={isExpanded}>
      <Accordion.Header>
        <Accordion.HeaderTitle>
          <Typography className="whitespace-nowrap" variant="h4" as="span">
            {title}
          </Typography>
        </Accordion.HeaderTitle>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="grid">
          {replicaList && replicaList.length > 0 ? (
            <ReplicaList
              showUtilization={showUtilization}
              appName={appName}
              envName={envName}
              compName={componentName}
              replicaList={replicaList}
              replicaUrlFunc={(name) => getReplicaUrl(appName, envName, componentName, name)}
            />
          ) : (
            <Typography>This component has no replicas</Typography>
          )}
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
)
