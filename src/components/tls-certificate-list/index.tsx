import { Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { type FunctionComponent, useCallback, useState } from 'react';

import type { X509Certificate } from '../../store/radix-api';
import { formatDateTime } from '../../utils/datetime';

import './style.css';

export const TLSCertificateList: FunctionComponent<{
  tlsCertificates: Array<X509Certificate>;
}> = ({ tlsCertificates }) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({
    0: true,
  });
  const expandRow = useCallback<(index: number) => void>(
    (idx) => setExpandedRows((x) => ({ ...x, [idx]: !x[idx] })),
    []
  );

  return (
    <div className="grid grid--gap-large">
      {tlsCertificates
        .map((x, i) => ({ tls: x, expanded: !!expandedRows[i] }))
        .map(({ tls, expanded }, i) => (
          <div key={i} className="tls-certificate-list">
            <div>
              <Typography link as="span">
                <Icon
                  size={24}
                  data={expanded ? chevron_up : chevron_down}
                  role="button"
                  title="Toggle more information"
                  onClick={() => expandRow(i)}
                />
              </Typography>
            </div>

            <div className="grid grid--gap-medium">
              <Typography>
                Issued to <strong>{tls?.subject}</strong>
              </Typography>

              {expanded && (
                <>
                  <Typography>
                    Issued by <strong>{tls?.issuer}</strong>
                  </Typography>
                  {tls?.notBefore && (
                    <Typography>
                      Issued{' '}
                      <strong>{formatDateTime(new Date(tls.notBefore))}</strong>
                    </Typography>
                  )}
                  {tls?.notAfter && (
                    <Typography>
                      Expires{' '}
                      <strong>{formatDateTime(new Date(tls.notAfter))}</strong>
                    </Typography>
                  )}
                  {tls.dnsNames && tls.dnsNames.length > 0 && (
                    <Typography>
                      Subject alternative name{' '}
                      {tls.dnsNames.map((name, i, { length }) => (
                        <strong key={i}>
                          {name}
                          {i < length - 1 && ', '}
                        </strong>
                      ))}
                    </Typography>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
