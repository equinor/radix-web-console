import { Chip, ChipProps } from '@equinor/eds-core-react';

import './style.css';

export type StatusBagdeTemplateType = 'success' | 'warning' | 'danger' | 'none';

export type StatusBadgeTemplateProps = {
  icon?: JSX.Element;
  type?: StatusBagdeTemplateType;
} & ChipProps;

/** StatusBadge template */
export const StatusBadgeTemplate = ({
  children,
  className,
  icon,
  type,
  ...rest
}: StatusBadgeTemplateProps): JSX.Element => (
  <Chip
    className={`status-badge status-badge-type__${`${type || 'none'}${
      className ? ` ${className}` : ''
    }${!icon ? ' center' : ''}`}`}
    {...rest}
  >
    {icon || <></>}
    {children || <></>}
  </Chip>
);
