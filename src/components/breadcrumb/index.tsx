import { Breadcrumbs } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';

import './style.css';

export interface BreadcrumbLink {
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  links: Array<BreadcrumbLink>;
}

function crumbLink(link: BreadcrumbLink): string {
  return (link.to ? (
    <Link className="breadcrumb-link" to={link.to}>
      {link.label}
    </Link>
  ) : (
    link.label
  )) as unknown as string;
}

export const Breadcrumb = (props: BreadcrumbProps): JSX.Element => (
  <Breadcrumbs>
    {props.links.map((link, i) => (
      <Breadcrumbs.Breadcrumb className="breadcrumb-element" key={i}>
        {crumbLink(link)}
      </Breadcrumbs.Breadcrumb>
    ))}
  </Breadcrumbs>
);
