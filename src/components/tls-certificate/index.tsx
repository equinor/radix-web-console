import { Typography } from '@equinor/eds-core-react';
import { TLSCertificateModel } from '../../models/tls-certificate';
import { formatDateTime } from '../../utils/datetime';

export const TLSCertificate = ({
  tlCertificateStatus,
}: {
  tlCertificateStatus: TLSCertificateModel;
}): JSX.Element => (
  <div className="grid grid--gap-medium">
    <Typography>
      Issued to <strong>{tlCertificateStatus?.subject}</strong>
    </Typography>
    <Typography>
      Issued by <strong>{tlCertificateStatus?.issuer}</strong>
    </Typography>
    {tlCertificateStatus?.notBefore && (
      <Typography>
        Issued <strong>{formatDateTime(tlCertificateStatus.notBefore)}</strong>
      </Typography>
    )}
    {tlCertificateStatus?.notAfter && (
      <Typography>
        Expires <strong>{formatDateTime(tlCertificateStatus.notAfter)}</strong>
      </Typography>
    )}
    {tlCertificateStatus.dnsNames?.length > 0 && (
      <Typography>
        Subject alternative name{' '}
        {tlCertificateStatus.dnsNames?.map((dnsName, i, a) => (
          <strong key={i}>
            {dnsName}
            {i < a.length - 1 && ', '}
          </strong>
        ))}
      </Typography>
    )}
  </div>
);
