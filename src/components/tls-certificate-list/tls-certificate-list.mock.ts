import type { X509Certificate } from '../../store/radix-api'

const daysFromNow = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()

const leaf: X509Certificate = {
  subject: 'CN=mysite.example.com',
  issuer: 'CN=Radix Intermediate CA',
  notBefore: daysFromNow(-30),
  notAfter: daysFromNow(335),
  dnsNames: ['mysite.example.com', 'www.mysite.example.com'],
}

const intermediate: X509Certificate = {
  subject: 'CN=Radix Intermediate CA',
  issuer: 'CN=Radix Root CA',
  notBefore: daysFromNow(-400),
  notAfter: daysFromNow(1500),
}

const root: X509Certificate = {
  subject: 'CN=Radix Root CA',
  issuer: 'CN=Radix Root CA',
  notBefore: daysFromNow(-2000),
  notAfter: daysFromNow(4000),
}

/** A single leaf certificate, including subject alternative names. */
export const singleCertificate: Array<X509Certificate> = [leaf]

/** Full chain from leaf certificate to self-signed root. */
export const certificateChain: Array<X509Certificate> = [leaf, intermediate, root]

/** Leaf certificate without any subject alternative names. */
export const certificateWithoutSan: Array<X509Certificate> = [{ ...leaf, dnsNames: undefined }]

/** Expired leaf certificate (expiry date in the past). */
export const expiredCertificate: Array<X509Certificate> = [
  { ...leaf, notBefore: daysFromNow(-395), notAfter: daysFromNow(-30) },
]
