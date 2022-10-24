import { Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import * as React from 'react';
import { useState } from 'react';
import { TLSCertificateModel } from '../../models/tls-certificate';
import { formatDateTime } from '../../utils/datetime';

import './style.css';

export const TLSCertificateList = ({
  tlsCertificates,
}: {
  tlsCertificates: Array<TLSCertificateModel>;
}) => {
  const [expandRows, setExpandRows] = useState<Record<number, boolean>>({
    0: true,
  });
  function toggleExpandRow(i: number) {
    setExpandRows({ ...expandRows, [i]: !expandRows[i] });
  }

  return (
    <div className="tls-certificate-list">
      {tlsCertificates
        .map((v, i) => ({ tlsCertificate: v, isExpanded: !!expandRows[i] }))
        .map((v, i) => (
          <React.Fragment key={i}>
            <div>
              <Typography link as="span">
                <Icon
                  size={24}
                  data={v.isExpanded ? chevron_up : chevron_down}
                  role="button"
                  title="Toggle more information"
                  onClick={() => toggleExpandRow(i)}
                />
              </Typography>
            </div>
            <div className="grid grid--gap-medium">
              <Typography>
                Issued to <strong>{v.tlsCertificate?.subject}</strong>
              </Typography>
              {v.isExpanded && (
                <>
                  <Typography>
                    Issued by <strong>{v.tlsCertificate?.issuer}</strong>
                  </Typography>
                  {v.tlsCertificate?.notBefore && (
                    <Typography>
                      Issued{' '}
                      <strong>
                        {formatDateTime(v.tlsCertificate.notBefore)}
                      </strong>
                    </Typography>
                  )}
                  {v.tlsCertificate?.notAfter && (
                    <Typography>
                      Expires{' '}
                      <strong>
                        {formatDateTime(v.tlsCertificate.notAfter)}
                      </strong>
                    </Typography>
                  )}
                  {v.tlsCertificate.dnsNames?.length > 0 && (
                    <Typography>
                      Subject alternative name{' '}
                      {v.tlsCertificate.dnsNames?.map((dnsName, i, a) => (
                        <strong key={i}>
                          {dnsName}
                          {i < a.length - 1 && ', '}
                        </strong>
                      ))}
                    </Typography>
                  )}
                </>
              )}
            </div>
          </React.Fragment>
        ))}
    </div>
  );
};
