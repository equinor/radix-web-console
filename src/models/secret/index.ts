import * as PropTypes from 'prop-types';

import { SecretStatus } from '../secret-status';
import { SecretType } from '../secret-type';
import {
  TLSCertificateModel,
  TLSCertificateModelValidationMap,
} from '../tls-certificate';

export interface SecretModel {
  name: string;
  displayName?: string;
  type?: SecretType;
  resource?: string;
  id?: string;
  component: string;
  status: SecretStatus;
  statusMessages?: Array<string>;
  tlsCertificates?: Array<TLSCertificateModel>;
}

/* PropTypes validation map for SecretModel */
export const SecretModelValidationMap: PropTypes.ValidationMap<SecretModel> = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  type: PropTypes.oneOf(Object.values(SecretType)),
  resource: PropTypes.string,
  id: PropTypes.string,
  component: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(SecretStatus)).isRequired,
  statusMessages: PropTypes.arrayOf(PropTypes.string),
  tlsCertificates: PropTypes.arrayOf(
    PropTypes.shape(
      TLSCertificateModelValidationMap
    ) as PropTypes.Validator<TLSCertificateModel>
  ),
};
