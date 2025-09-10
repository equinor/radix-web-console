import type { Secret } from '../../store/radix-api'
import { GenericStatusBadge as StatusBadge } from '../status-badges'

type Props = { status?: Secret['status'] }
export const SecretStatus = ({ status }: Props) => {
  if (!status) {
    console.warn('Secret for component is not being reported by environment')
    return <StatusBadge type="danger">Status not reported</StatusBadge>
  }

  switch (status) {
    case 'Pending':
      return <StatusBadge type="danger">Not defined</StatusBadge>
    case 'Consistent':
      return <StatusBadge type="success">{status}</StatusBadge>
    case 'NotAvailable':
      return <StatusBadge type="success">Not available</StatusBadge>
    default:
      return <StatusBadge type="danger">{status}</StatusBadge>
  }
}
