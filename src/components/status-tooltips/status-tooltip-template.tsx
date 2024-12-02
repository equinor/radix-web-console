import { Icon, Tooltip, type TooltipProps } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import type React from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';

import './style.css';

export type StatusTooltipTemplateType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none'
  | 'default';

export type StatusTooltipTemplateProps = {
  className?: string;
  icon?: React.JSX.Element;
  type?: StatusTooltipTemplateType;
} & Pick<TooltipProps, 'placement'> &
  Required<Pick<TooltipProps, 'title'>>;

/** StatusTooltip template */
export const StatusTooltipTemplate: FunctionComponent<
  PropsWithChildren<StatusTooltipTemplateProps>
> = ({
  title,
  className,
  children,
  icon = <Icon data={info_circle} />,
  type,
  placement = 'top',
}) => (
  <Tooltip title={title} placement={placement}>
    <div
      className={clsx(
        'status-tooltip',
        `status-tooltip-type__${type ?? 'default'}`,
        className ? { [className]: true } : undefined
      )}
    >
      {icon ?? <></>}
      {children ?? <></>}
    </div>
  </Tooltip>
);
