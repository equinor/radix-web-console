import { Alert } from '../alert'
import { List } from '@equinor/eds-core-react'

interface Props {
  unknownADGroups?: Array<string>
}
export function UnknownADGroupsAlert({ unknownADGroups }: Props) {
  return (
    <>
      {unknownADGroups?.length > 0 && (
        <Alert type="danger">
          Unknown or deleted AD group(s)
          <List className="o-indent-list">
            {unknownADGroups.map((adGroup) => (
              <List.Item key={adGroup}>{adGroup}</List.Item>
            ))}
          </List>
        </Alert>
      )}
    </>
  )
}
