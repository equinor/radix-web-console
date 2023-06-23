import * as PropTypes from 'prop-types';

export interface ImageModel {
  image: string;
  baseImage?: string;
}

/* PropTypes validation map for ImageModel */
export const ImageModelValidationMap: PropTypes.ValidationMap<ImageModel> = {
  image: PropTypes.string.isRequired,
  baseImage: PropTypes.string,
};
