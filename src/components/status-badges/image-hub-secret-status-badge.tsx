import { Icon } from '@equinor/eds-core-react'
import { check, time } from '@equinor/eds-icons'
import * as PropTypes from 'prop-types'
import type { FunctionComponent } from 'react'

import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template'

import type { ImageHubSecret } from '../../store/radix-api'

const BadgeTemplates: Record<
  ImageHubSecret['status'],
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  Pending: { icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
}

export const ImageHubSecretStatusBadge: FunctionComponent<{
  status: ImageHubSecret['status']
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
)

ImageHubSecretStatusBadge.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<
    ImageHubSecret['status']
  >,
}
