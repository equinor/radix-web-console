import { Typography } from '@equinor/eds-core-react'
import type { EnvironmentCardPublicComponents } from '../environmentCard.types'
import { PublicComponentItem } from './PublicComponentItem'

export const PublicComponentsList = (props: { publicComponents: EnvironmentCardPublicComponents }) => {
  const { publicComponents } = props

  if (publicComponents.visible.length === 0) {
    return <Typography color="disabled">No public components available</Typography>
  }

  return (
    <ul>
      {publicComponents.visible.map((component) => (
        <PublicComponentItem key={component.name} component={component} />
      ))}
    </ul>
  )
}
