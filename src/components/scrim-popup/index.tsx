import {
  Button,
  Divider,
  Icon,
  Scrim,
  Typography,
} from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { ReactChild } from 'react';

import './style.css';

export interface ScrimPopupProps {
  className?: string;
  title: ReactChild;
  children: ReactChild;
  open: boolean;
  onClose?: () => void;
  isDismissable?: boolean;
}

export const ScrimPopup = ({
  className,
  title,
  children,
  open,
  onClose,
  isDismissable,
}: ScrimPopupProps): JSX.Element => (
  <Scrim open={open} {...(isDismissable && { isDismissable, onClose })}>
    <div className={classNames('scrim-dialog', { className: !!className })}>
      <div className="dialog-header">
        {typeof title === 'string' || typeof title === 'number' ? (
          <Typography variant="h5">{title}</Typography>
        ) : (
          title
        )}
        <Button variant="ghost" onClick={onClose}>
          <Icon data={clear} />
        </Button>
      </div>
      <div>
        <Divider />
      </div>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Typography className="dialog-text-content">{children}</Typography>
      ) : (
        children
      )}
    </div>
  </Scrim>
);

ScrimPopup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  isDismissable: PropTypes.bool,
} as PropTypes.ValidationMap<ScrimPopupProps>;
