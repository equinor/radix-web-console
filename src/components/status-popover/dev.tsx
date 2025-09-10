import { Icon } from '@equinor/eds-core-react'
import { check } from '@equinor/eds-icons'
import { StatusPopover, type StatusPopoverType } from './status-popover'

const types = ['success', 'warning', 'danger', 'none', 'default'] satisfies StatusPopoverType[]

const labels = ['short', undefined, 'two words']

export default (
  <div
    style={{
      padding: '1.5em',
      backgroundColor: 'var(--eds_ui_background__default)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gridGap: '0.25em',
    }}
  >
    {labels.map((label) =>
      types.map((type) => (
        <StatusPopover icon={<Icon data={check} />} title={type} key={label + type} label={label} type={type}>
          {label}
        </StatusPopover>
      ))
    )}
  </div>
)
