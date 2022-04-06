import { Chip, ChipProps } from '@equinor/eds-core-react';

import './style.css';

export type StatusBagdeTemplateType = 'success' | 'warning' | 'danger' | 'none';

export type StatusBadgeTemplateProps = {
  icon?: JSX.Element;
  type?: StatusBagdeTemplateType;
} & ChipProps;

/** StatusBadge template */
export const StatusBadgeTemplate = (
  props: StatusBadgeTemplateProps
): JSX.Element => {
  const { children, className, icon, type, ...rest } = props;
  const classes = `${type || 'none'}${className ? ` ${className}` : ''}${
    !icon ? ' center' : ''
  }`;

  return (
    <Chip className={`status-badge ${classes}`} {...rest}>
      {icon || <></>}
      {children || <></>}
    </Chip>
  );
};
