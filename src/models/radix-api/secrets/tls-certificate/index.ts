import * as PropTypes from 'prop-types';

export interface TLSCertificateModel {
  subject: string;
  issuer: string;
  notBefore: Date;
  notAfter: Date;
  dnsNames?: Array<string>;
}

/* PropTypes validation map for TlsCertificateModel */
export const TLSCertificateModelValidationMap: PropTypes.ValidationMap<TLSCertificateModel> =
  {
    subject: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    notBefore: PropTypes.instanceOf(Date).isRequired,
    notAfter: PropTypes.instanceOf(Date).isRequired,
    dnsNames: PropTypes.arrayOf(PropTypes.string),
  };
