import { TLSCertificateList } from '.';

import { TLSCertificateModel } from '../../models/tls-certificate';

const certsGroups: TLSCertificateModel[][] = [
  [
    {
      subject: 'CN=mysite.example.com',
      issuer: 'CN=ca.example.com',
      notBefore: new Date(2020, 10, 1, 12, 30),
      notAfter: new Date(2020, 12, 1, 17, 20),
      dnsNames: ['dns1', 'dns2'],
    },
  ],
  [
    {
      subject: 'CN=mysite.example.com',
      issuer: 'CN=ca.example.com',
      notBefore: new Date(),
      notAfter: new Date(),
      dnsNames: ['dns1', 'dns2'],
    },
    {
      subject: 'CN=ca.example.com',
      issuer: 'CN=ca2.example.com',
      notBefore: new Date(),
      notAfter: new Date(),
    },
    {
      subject: 'CN=ca2.example.com',
      issuer: 'CN=root.example.com',
      notBefore: new Date(),
      notAfter: new Date(),
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
