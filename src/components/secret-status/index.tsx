import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import type { Secret } from '../../store/radix-api';
import { StatusBadge } from '../status-badges';

export const SecretStatus: FunctionComponent<{ status?: Secret['status'] }> = ({
  status,
}) => {
  if (!status) {
    console.warn('Secret for component is not being reported by environment');
    return <StatusBadge type="danger">Status not reported</StatusBadge>;
  }

  switch (status) {
    case 'Pending':
      return <StatusBadge type="danger">Not defined</StatusBadge>;
    case 'Consistent':
      return <StatusBadge type="success">{status}</StatusBadge>;
    case 'NotAvailable':
      return <StatusBadge type="success">Not available</StatusBadge>;
    default:
      return <StatusBadge type="danger">{status}</StatusBadge>;
  }
};

SecretStatus.propTypes = {
  status: PropTypes.string as PropTypes.Validator<Secret['status']>,
};
