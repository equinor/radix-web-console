import type { X509Certificate } from '../../store/radix-api';
import { TLSCertificateList } from '.';

const certsGroups: Array<X509Certificate[]> = [
  [
    {
      subject: 'CN=mysite.example.com',
      issuer: 'CN=ca.example.com',
      notBefore: '2023-12-01T11:27:17Z',
      notAfter: '2023-12-01T12:16:54Z',
      dnsNames: ['dns1', 'dns2'],
    },
  ],
  [
    {
      subject: 'CN=mysite.example.com',
      issuer: 'CN=ca.example.com',
      notBefore: '2023-12-01T11:27:17Z',
      notAfter: '2023-12-01T12:16:54Z',
      dnsNames: ['dns1', 'dns2'],
    },
    {
      subject: 'CN=ca.example.com',
      issuer: 'CN=ca2.example.com',
      notBefore: '2023-12-01T11:27:17Z',
      notAfter: '2023-12-01T12:16:54Z',
    },
    {
      subject: 'CN=ca2.example.com',
      issuer: 'CN=root.example.com',
      notBefore: '2023-12-01T11:27:17Z',
      notAfter: '2023-12-01T12:16:54Z',
    },
  ],
];

export default (
  <div className="grid grid--gap-medium">
    {certsGroups.map((certs, i) => (
      <div key={i} style={{ backgroundColor: 'var(--color-bright)' }}>
        <TLSCertificateList tlsCertificates={certs} />
      </div>
    ))}
  </div>
);
