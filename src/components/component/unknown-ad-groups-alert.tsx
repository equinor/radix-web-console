import { Icon, List } from '@equinor/eds-core-react'
import { computer, group } from '@equinor/eds-icons'
import { Alert } from '../alert'

interface Props {
  unknownADGroups?: Array<string>
  unknownADUsers?: Array<string>
}
export function UnknownADGroupsAlert({ unknownADGroups, unknownADUsers }: Props) {
  return (
    <Alert type="danger">
      Unknown or deleted Entra object(s)
      <List className="o-indent-list">
        {unknownADGroups?.map((adGroup) => (
          <List.Item key={adGroup}>
            <Icon data={group} size={16} /> {adGroup}
          </List.Item>
        ))}
        {unknownADUsers?.map((adSp) => (
          <List.Item key={adSp}>
            <Icon data={computer} size={16} /> {adSp}
          </List.Item>
        ))}
      </List>
    </Alert>
  )
}
