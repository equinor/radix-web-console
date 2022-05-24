import { Icon, Tooltip } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

import './style.css';

export type StatusTooltipTemplateType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none';

export type StatusTooltipTemplateProps = {
  className?: string;
  title: string;
  icon?: JSX.Element;
  type?: StatusTooltipTemplateType;
};

/** StatusTooltip template */
export const StatusTooltipTemplate = ({
  className,
  title,
  icon,
  type = 'none',
}: StatusTooltipTemplateProps): JSX.Element => (
  <Tooltip title={title} placement="top">
    <span
      className={`status-tooltip status-tooltip-type__${type}${
        className ? ` ${className}` : ''
      }`}
    >
      {icon || <Icon data={info_circle} />}
    </span>
  </Tooltip>
);
