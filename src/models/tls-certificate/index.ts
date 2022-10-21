import * as PropTypes from 'prop-types';

//TlsCertificateModel Runtime component secret
export interface TLSCertificateModel {
  subject?: string;
  issuer?: string;
  notBefore?: Date;
  notAfter?: Date;
  dnsNames?: Array<string>;
}

/* PropTypes validation map for TlsCertificateModel */
export const TLSCertificateModelValidationMap: PropTypes.ValidationMap<TLSCertificateModel> =
  {
    subject: PropTypes.string,
    issuer: PropTypes.string,
    notBefore: PropTypes.instanceOf(Date),
    notAfter: PropTypes.instanceOf(Date),
    dnsNames: PropTypes.arrayOf(PropTypes.string),
  };
