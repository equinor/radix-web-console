import { Chip, ChipProps } from '@equinor/eds-core-react';
import classNames from 'classnames';

import './style.css';

export type StatusBadgeTemplateType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none'
  | 'default';

export type StatusBadgeTemplateProps = {
  icon?: JSX.Element;
  type?: StatusBadgeTemplateType;
} & ChipProps;

/** StatusBadge template */
export const StatusBadgeTemplate = ({
  className,
  children,
  icon,
  type = 'default',
  ...rest
}: StatusBadgeTemplateProps): JSX.Element => (
  <Chip
    className={classNames(
      'status-badge',
      `status-badge-type__${type}`,
      { center: !icon },
      { [className]: !!className }
    )}
    {...rest}
  >
    {icon ?? <></>}
    {children ?? <></>}
  </Chip>
);
