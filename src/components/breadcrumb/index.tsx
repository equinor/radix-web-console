import { Breadcrumbs, Tooltip } from '@equinor/eds-core-react';
import { type FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { copyToClipboard } from '../../utils/string';

export interface BreadcrumbProps {
  links: Readonly<Array<{ label: string; to?: string; fullName?: string }>>;
}

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = function ({
  links,
}) {
  return (
    <Breadcrumbs>
      {links.map(({ to, label, fullName }, i) => {
        const [copyTitle, setCopyTitle] = useState(fullName ?? 'test');

        const handleCopy = (text: string) => {
          if (!text) return;
          copyToClipboard(text);
          setCopyTitle('Copied');
        };
        return (
          label !== '' && (
            <>
              {fullName ? (
                <Tooltip placement="top" title={copyTitle} enterDelay={300}>
                  <Breadcrumbs.Breadcrumb
                    key={i}
                    onClick={() => handleCopy(fullName)}
                    onMouseLeave={() => setCopyTitle(fullName)}
                  >
                    {label}
                  </Breadcrumbs.Breadcrumb>
                </Tooltip>
              ) : (
                <Breadcrumbs.Breadcrumb
                  key={i}
                  as={Link}
                  // @ts-expect-error EDS Breadcrumbs typescript doesnt reccognize Links props
                  to={to}
                >
                  {label}
                </Breadcrumbs.Breadcrumb>
              )}
            </>
          )
        );
      })}
    </Breadcrumbs>
  );
};
