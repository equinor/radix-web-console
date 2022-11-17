import { Icon, Tooltip, TooltipProps } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import * as classNames from 'classnames';
import { ReactNode } from 'react';

import './style.css';

export type StatusTooltipTemplateType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none'
  | 'default';

export type StatusTooltipTemplateProps = {
  className?: string;
  icon?: JSX.Element;
  type?: StatusTooltipTemplateType;
  children?: ReactNode;
} & Pick<TooltipProps, 'placement'> &
  Required<Pick<TooltipProps, 'title'>>;

/** StatusTooltip template */
export const StatusTooltipTemplate = ({
  title,
  className,
  children,
  icon = <Icon data={info_circle} />,
  type,
  placement = 'top',
}: StatusTooltipTemplateProps): JSX.Element => (
  <Tooltip title={title} placement={placement}>
    <div
      className={classNames(
        'status-tooltip',
        `status-tooltip-type__${type ?? 'default'}`,
        { [className]: !!className }
      )}
    >
      {icon ?? <></>}
      {children ?? <></>}
    </div>
  </Tooltip>
);
