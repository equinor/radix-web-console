import { Icon, Tooltip, TooltipProps } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { clsx } from 'clsx';
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
  icon?: React.JSX.Element;
  type?: StatusTooltipTemplateType;
  children?: ReactNode;
} & Pick<TooltipProps, 'placement'> &
  Required<Pick<TooltipProps, 'title'>>;

/** StatusTooltip template */
export const StatusTooltipTemplate: (
  props: StatusTooltipTemplateProps
) => React.JSX.Element = ({
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
        { [className]: !!className }
      )}
    >
      {icon ?? <></>}
      {children ?? <></>}
    </div>
  </Tooltip>
);
