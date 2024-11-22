import { Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import { type IconData, external_link } from '@equinor/eds-icons';
import type { PropsWithChildren } from 'react';

type ToolTipWrapperProps = { toolTip?: string };

const ToolTipWrapper = ({
  toolTip,
  children,
}: PropsWithChildren<ToolTipWrapperProps>) =>
  toolTip ? (
    <Tooltip title={toolTip}>
      <span>{children}</span>
    </Tooltip>
  ) : (
    <>{children}</>
  );

type ExternalLinkProps = {
  href: string;
  icon?: IconData;
  color?: string;
  className?: string;
  toolTip?: string;
  title?: string;
};

export const ExternalLink = ({
  href,
  children,
  icon = external_link,
  className = 'whitespace-nowrap',
  color,
  toolTip,
  title,
}: PropsWithChildren<ExternalLinkProps>) => (
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