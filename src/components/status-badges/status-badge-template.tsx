import { Chip, ChipProps } from '@equinor/eds-core-react';
import classNames from 'classnames';

import './style.css';

export type StatusBagdeTemplateType = 'success' | 'warning' | 'danger' | 'none';

export type StatusBadgeTemplateProps = {
  icon?: JSX.Element;
  type?: StatusBagdeTemplateType;
} & ChipProps;

/** StatusBadge template */
export const StatusBadgeTemplate = ({
  className,
  children,
  icon,
  type = 'none',
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
