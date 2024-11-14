import { Icon, Typography } from '@equinor/eds-core-react';
import { type IconData, external_link } from '@equinor/eds-icons';
import type { FunctionComponent, PropsWithChildren } from 'react';

export const ExternalLink: FunctionComponent<
  PropsWithChildren<{
    href: string;
    icon?: IconData;
    color?: string;
    className?: string;
  }>
> = ({
  href,
  children,
  icon = external_link,
  className = 'whitespace-nowrap',
  color,
}) => (
  <Typography
    link
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    color={color}
    className={className}
  >
    {children} {icon && <Icon data={icon} size={16} />}
  </Typography>
);
