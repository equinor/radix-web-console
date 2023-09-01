import { Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { Fragment, FunctionComponent, useState } from 'react';

import { TLSCertificateModel } from '../../models/radix-api/secrets/tls-certificate';
import { formatDateTime } from '../../utils/datetime';

import './style.css';

export const TLSCertificateList: FunctionComponent<{
  tlsCertificates: Array<TLSCertificateModel>;
}> = ({ tlsCertificates }) => {
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
        .map(({ tlsCertificate, isExpanded }, i) => (
          <Fragment key={i}>
            <div>
              <Typography link as="span">
                <Icon
                  size={24}
                  data={isExpanded ? chevron_up : chevron_down}
                  role="button"
                  title="Toggle more information"
                  onClick={() => toggleExpandRow(i)}
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
                      {tlsCertificate.dnsNames.map((dnsName, i, a) => (
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
          </Fragment>
        ))}
    </div>
  );
};
