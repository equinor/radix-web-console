import { TLSCertificateModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<TLSCertificateModel> = [
  {
    __testDescription: 'Valid full object',
    subject: 'CN=mysite.example.com',
    issuer: 'CN=ca.example.com',
    notBefore: new Date(),
    notAfter: new Date(),
    dnsNames: ['dns1', 'dns2'],
  },
  {
    __testDescription: 'Valid partial object',
    subject: 'CN=mysite.example.com',
    issuer: 'CN=ca.example.com',
    notBefore: new Date(),
    notAfter: new Date(),
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    subject: 'CN=mysite.example.com',
    issuer: new Date() as unknown as string,
    notBefore: new Date(),
    notAfter: new Date(),
    dnsNames: ['dns1', 'dns2'],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    subject: { lastName: 'CN=mysite.example.com' } as unknown as string,
    issuer: 'CN=ca.example.com',
    notBefore: new Date(),
    notAfter: new Date(),
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    subject: undefined,
    issuer: undefined,
    notBefore: undefined,
    notAfter: undefined,
  },
];
