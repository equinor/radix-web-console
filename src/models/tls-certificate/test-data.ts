import { TLSCertificateModel } from '.';
import { TestDependencyDataType } from '../model-types';

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
    __testDescription: 'Valid empty issuer',
    subject: 'CN=mysite.example.com',
    issuer: '',
    notBefore: new Date(),
    notAfter: new Date(),
  },
  {
    __testDescription: 'Missing subject',
    __testIsInvalidSample: true,
    subject: undefined as unknown as string,
    issuer: 'CN=ca.example.com',
    notBefore: new Date(),
    notAfter: new Date(),
  },
  {
    __testDescription: 'Missing issuer',
    __testIsInvalidSample: true,
    subject: 'CN=mysite.example.com',
    issuer: undefined as unknown as string,
    notBefore: new Date(),
    notAfter: new Date(),
  },
  {
    __testDescription: 'Missing notBefore',
    __testIsInvalidSample: true,
    subject: 'CN=mysite.example.com',
    issuer: 'CN=ca.example.com',
    notBefore: undefined as unknown as Date,
    notAfter: new Date(),
  },
  {
    __testDescription: 'Missing notAfter',
    __testIsInvalidSample: true,
    subject: 'CN=mysite.example.com',
    issuer: 'CN=ca.example.com',
    notBefore: new Date(),
    notAfter: undefined as unknown as Date,
  },
];
