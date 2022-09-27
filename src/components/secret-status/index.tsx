import { StatusBadge } from '../status-badges';
import { SecretModel } from '../../models/secret';
import { SecretStatus as Status } from '../../models/secret-status';

export const SecretStatus = ({
  secret,
}: {
  secret: SecretModel;
}): JSX.Element => {
  if (!secret) {
    console.warn(`Secret for component is not being reported by environment`);
    return <StatusBadge type="danger">Status not reported</StatusBadge>;
  }

  switch (secret.status) {
    case Status.Pending:
      return <StatusBadge type="danger">Not defined</StatusBadge>;
    case Status.Consistent:
      return <StatusBadge type="success">{secret.status}</StatusBadge>;
    case Status.NotAvailable:
      return <StatusBadge type="success">Not available</StatusBadge>;
    default:
      return <StatusBadge type="danger">{secret.status}</StatusBadge>;
  }
};
