import type { ComponentProps } from 'react';
import type { ExternalDns } from '../../store/radix-api';
import { ExternalDNSList } from '.';

const testData: Array<ComponentProps<typeof ExternalDNSList>> = [
  {
    onItemClick: (item: ExternalDns) => alert(`clicked ${item.fqdn}`),
    externalDnsList: [
      {
        fqdn: 'foo.example.com',
        tls: {
          useAutomation: false,
          status: 'Consistent',
        },
      },
      {
        fqdn: 'bar.example.com',
        tls: {
          useAutomation: true,
          status: 'Consistent',
          certificates: [
            {
              issuer: 'Intermediate CA',
              notAfter: '2023-12-19T00:00:00Z',
              notBefore: '2022-12-19T00:00:00Z',
              subject: 'CN=bar1.example.com',
              dnsNames: ['bar1.example.com', 'barx.example.com'],
            },
          ],
        },
      },
    ],
  },
  {
    externalDnsList: [
      {
        fqdn: 'foo2.example.com',
        tls: {
          useAutomation: false,
          status: 'Pending',
        },
      },
      {
        fqdn: 'foo1.example.com',
        tls: {
          useAutomation: true,
          status: 'Pending',
          statusMessages: ['some pending 1', 'some pending 2'],
        },
      },
      {
        fqdn: 'bar.example.com',
        tls: {
          useAutomation: true,
          status: 'Consistent',
          statusMessages: ['some msg 1', 'some msg 2'],
          certificates: [
            {
              issuer: 'Intermediate CA',
              notAfter: '2024-12-19T00:00:00Z',
              notBefore: '2023-12-19T00:00:00Z',
              subject: 'CN=bar1.example.com',
              dnsNames: ['bar1.example.com', 'barx.example.com'],
            },
            {
              issuer: 'Root CA',
              notAfter: '2033-12-19T00:00:00Z',
              notBefore: '2023-12-19T00:00:00Z',
              subject: 'CN=Intermediate CA',
            },
          ],
        },
      },
      {
        fqdn: 'baz.example.com',
        tls: {
          useAutomation: false,
          status: 'Invalid',
          statusMessages: ['some error 1', 'some error 2'],
          certificates: [
            {
              issuer: 'Intermediate CA',
              notAfter: '2023-12-19T00:00:00Z',
              notBefore: '2022-12-19T00:00:00Z',
              subject: 'CN=bar1.example.com',
              dnsNames: ['bar1.example.com', 'barx.example.com'],
            },
          ],
        },
      },
    ],
  },
];

export default (
  <>
    {testData.map((x, i) => (
      <div
        key={i}
        className="grid grid--gap-medium"
        style={{
          width: '800px',
          margin: '12px auto',
          padding: '12px',
          backgroundColor: 'var(--eds_ui_background__default)',
        }}
      >
        <ExternalDNSList {...x} />
      </div>
    ))}
  </>
);
