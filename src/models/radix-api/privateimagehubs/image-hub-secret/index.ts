import * as PropTypes from 'prop-types';

import { ImageHubSecretStatus } from '../image-hub-secret-status';

export interface ImageHubSecretModel {
  server: string;
  username: string;
  email?: string;
  status?: ImageHubSecretStatus;
}

/* PropTypes validation map for ImageHubSecretModel */
export const ImageHubSecretModelValidationMap: PropTypes.ValidationMap<ImageHubSecretModel> =
  {
    server: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    status: PropTypes.oneOf(Object.values(ImageHubSecretStatus)),
  };
