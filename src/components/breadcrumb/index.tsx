import { Breadcrumbs } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

export interface BreadcrumbProps {
  links: Readonly<Array<{ label: string; to?: string }>>
}

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({ links }) => (
  <Breadcrumbs>
    {links.map(({ to, label }, i) => {
      return (
        label !== '' && (
          <Breadcrumbs.Breadcrumb
            key={i}
            as={Link}
            // @ts-expect-error EDS Breadcrumbs typescript doesnt reccognize Links props
            to={to}
          >
            {label}
          </Breadcrumbs.Breadcrumb>
        )
      )
    })}
  </Breadcrumbs>
)
