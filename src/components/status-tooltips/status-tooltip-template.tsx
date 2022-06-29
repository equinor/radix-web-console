import { Icon, Tooltip, TooltipProps } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import classNames from 'classnames';

import './style.css';

export type StatusTooltipTemplateType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none';

export type StatusTooltipTemplateProps = {
  className?: string;
  icon?: JSX.Element;
  type?: StatusTooltipTemplateType;
} & Pick<TooltipProps, 'placement'> &
  Required<Pick<TooltipProps, 'title'>>;

/** StatusTooltip template */
export const StatusTooltipTemplate = ({
  title,
  className,
  icon = <Icon data={info_circle} />,
  type = 'none',
  placement = 'top',
}: StatusTooltipTemplateProps): JSX.Element => (
  <Tooltip title={title} placement={placement}>
    <span
      className={classNames('status-tooltip', `status-tooltip-type__${type}`, {
        [className]: !!className,
      })}
    >
      {icon}
    </span>
  </Tooltip>
);
