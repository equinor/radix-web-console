import type { ExternalDns } from '../../store/radix-api'

const daysFromNow = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()

const certificate = (subject: string, notAfterDays: number) => ({
  issuer: 'CN=Radix Intermediate CA',
  subject: `CN=${subject}`,
  dnsNames: [subject],
  notBefore: daysFromNow(-60),
  notAfter: daysFromNow(notAfterDays),
})

export const mockedExternalDnsList: Array<ExternalDns> = [
  // Manual TLS, valid certificate installed
  {
    fqdn: 'app.example.com',
    tls: {
      useAutomation: false,
      status: 'Consistent',
      certificates: [certificate('app.example.com', 305)],
    },
  },
  // Manual TLS, certificate not yet provided
  {
    fqdn: 'pending.example.com',
    tls: {
      useAutomation: false,
      status: 'Pending',
      statusMessages: ['TLS certificate and private key not set'],
    },
  },
  // Manual TLS, invalid certificate
  {
    fqdn: 'invalid.example.com',
    tls: {
      useAutomation: false,
      status: 'Invalid',
      statusMessages: [
        'x509: certificate is valid for other.example.com, not invalid.example.com',
        'Private key does not match certificate',
      ],
    },
  },
  // Automated TLS, issued successfully (expiring soon)
  {
    fqdn: 'auto-success.example.com',
    tls: {
      useAutomation: true,
      status: 'Consistent',
      automation: { status: 'Success', message: 'Certificate issued successfully' },
      certificates: [certificate('auto-success.example.com', 20)],
    },
  },
  // Automated TLS, order in progress
  {
    fqdn: 'auto-pending.example.com',
    tls: {
      useAutomation: true,
      status: 'Pending',
      automation: { status: 'Pending', message: 'ACME order in progress' },
    },
  },
  // Automated TLS, order failed
  {
    fqdn: 'auto-failed.example.com',
    tls: {
      useAutomation: true,
      status: 'Invalid',
      automation: { status: 'Failed', message: 'ACME challenge failed: DNS record not found' },
    },
  },
  // Automated TLS, status unknown (no automation object yet)
  {
    fqdn: 'auto-unknown.example.com',
    tls: {
      useAutomation: true,
      status: 'Pending',
    },
  },
]
