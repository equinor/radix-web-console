import { Breadcrumbs } from '@equinor/eds-core-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export interface BreadcrumbLink {
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  links: Array<BreadcrumbLink>;
}

function crumbLink({ label, to }: BreadcrumbLink): ReactNode {
  return to ? (
    <Link className="breadcrumb-link" to={to}>
      {label}
    </Link>
  ) : (
    label
  );
}

export const Breadcrumb = ({ links }: BreadcrumbProps): React.JSX.Element => (
  <Breadcrumbs>
    {links.map((link, i) => (
      <Breadcrumbs.Breadcrumb className="breadcrumb-element" key={i}>
        {crumbLink(link) as string}
      </Breadcrumbs.Breadcrumb>
    ))}
  </Breadcrumbs>
);
