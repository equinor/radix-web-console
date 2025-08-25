import { Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import { external_link, type IconData } from '@equinor/eds-icons';
import { forwardRef, type PropsWithChildren } from 'react';

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
  icon?: IconData | null | undefined; // null = no icon, undefined = external_link (default), or custom icon
  color?: string;
  className?: string;
  toolTip?: string;
  title?: string;
};

export const ExternalLink = forwardRef(
  (
    {
      href,
      children,
      icon = external_link,
      className = 'whitespace-nowrap',
      color,
      toolTip,
      title,
    }: PropsWithChildren<ExternalLinkProps>,
    ref
  ) => (
    <ToolTipWrapper toolTip={toolTip}>
      <Typography
        ref={ref}
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
  )
);
