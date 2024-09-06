import { Breadcrumbs } from '@equinor/eds-core-react';
import type { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbProps {
  links: Readonly<Array<{ label: string; to?: string }>>;
}

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({ links }) => (
  <Breadcrumbs>
    {links.map(({ to, label }, i) => (
      <Breadcrumbs.Breadcrumb key={i} as={Link} to={to}>
        {label}
      </Breadcrumbs.Breadcrumb>
    ))}
  </Breadcrumbs>
);
