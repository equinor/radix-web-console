import {
  Button,
  Divider,
  Icon,
  Scrim,
  Typography,
} from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';

import './style.css';

export interface ScrimPopupProps {
  className?: string;
  title: ReactNode;
  open: boolean;
  onClose?: () => void;
  isDismissable?: boolean;
}

export const ScrimPopup: FunctionComponent<
  PropsWithChildren<ScrimPopupProps>
> = ({ className, title, children, open, onClose, isDismissable }) => (
  <Scrim open={open} {...(isDismissable && { isDismissable, onClose })}>
    <div
      className={clsx(
        'scrim-dialog',
        className ? { [className]: !!className } : undefined
      )}
    >
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
      <div className="dialog-content">
        {typeof children === 'string' || typeof children === 'number' ? (
          <Typography className="dialog-content-text">{children}</Typography>
        ) : (
          children
        )}
      </div>
    </div>
  </Scrim>
);
