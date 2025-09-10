import { AuthenticatedTemplate } from '@azure/msal-react'
import { Typography } from '@equinor/eds-core-react'
import { ADGroups, type HandleAdGroupsChangeCB } from '../graph/adGroups'
import './style.css'

interface Props {
  name?: string
  labeling: string
  adGroups?: Array<string>
  adUsers?: Array<string>
  isDisabled?: boolean
  onChange?: HandleAdGroupsChangeCB
}
export const AppConfigAdGroups = ({ name, labeling, adGroups, adUsers, isDisabled, onChange }: Props) => (
  <div className="ad-groups">
    <Typography className="label">{labeling}</Typography>
    <Typography className="label meta">
      User authentication is your application's responsibility; it is not related to these Entra objects
    </Typography>
    <AuthenticatedTemplate>
      <ADGroups
        name={name}
        onChange={onChange}
        adGroups={adGroups ?? []}
        adUsers={adUsers ?? []}
        isDisabled={isDisabled}
      />
    </AuthenticatedTemplate>
  </div>
)
