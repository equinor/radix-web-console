import { Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import { type IconData, external_link } from '@equinor/eds-icons';
import type { FunctionComponent, PropsWithChildren } from 'react';

const ToolTipWrapper: FunctionComponent<
  PropsWithChildren<{ toolTip?: string }>
> = ({ toolTip, children }) =>
  toolTip ? (
    <Tooltip title={toolTip}>
      <span>{children}</span>
    </Tooltip>
  ) : (
    <>{children}</>
  );

export const ExternalLink: FunctionComponent<
  PropsWithChildren<{
    href: string;
    icon?: IconData;
    color?: string;
    className?: string;
    toolTip?: string;
    title?: string;
  }>
> = ({
  href,
  children,
  icon = external_link,
  className = 'whitespace-nowrap',
  color,
  toolTip,
  title,
}) => (
  <ToolTipWrapper toolTip={toolTip}>
    <Typography
      link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      color={color}
      className={className}
      title={title}
    >
      {children} {icon && <Icon data={icon} size={16} />}
    </Typography>
  </ToolTipWrapper>
);
