import { Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { FunctionComponent, useCallback, useState } from 'react';

import { TLSCertificateModel } from '../../models/radix-api/secrets/tls-certificate';
import { formatDateTime } from '../../utils/datetime';

import './style.css';

export const TLSCertificateList: FunctionComponent<{
  tlsCertificates: Array<TLSCertificateModel>;
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
        .map((v, i) => ({ tlsCertificate: v, isExpanded: !!expandedRows[i] }))
        .map(({ tlsCertificate, isExpanded }, i) => (
          <div key={i} className="tls-certificate-list">
            <div>
              <Typography link as="span">
                <Icon
                  size={24}
                  data={isExpanded ? chevron_up : chevron_down}
                  role="button"
                  title="Toggle more information"
                  onClick={() => expandRow(i)}
                />
              </Typography>
            </div>

            <div className="grid grid--gap-medium">
              <Typography>
                Issued to <strong>{tlsCertificate?.subject}</strong>
              </Typography>

              {isExpanded && (
                <>
                  <Typography>
                    Issued by <strong>{tlsCertificate?.issuer}</strong>
                  </Typography>
                  {tlsCertificate?.notBefore && (
                    <Typography>
                      Issued{' '}
                      <strong>
                        {formatDateTime(tlsCertificate.notBefore)}
                      </strong>
                    </Typography>
                  )}
                  {tlsCertificate?.notAfter && (
                    <Typography>
                      Expires{' '}
                      <strong>{formatDateTime(tlsCertificate.notAfter)}</strong>
                    </Typography>
                  )}
                  {tlsCertificate.dnsNames?.length > 0 && (
                    <Typography>
                      Subject alternative name{' '}
                      {tlsCertificate.dnsNames.map((name, i, { length }) => (
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
