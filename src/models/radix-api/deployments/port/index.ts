import * as PropTypes from 'prop-types';

export interface PortModel {
  name: string;
  port: number;
}

/* PropTypes validation map for PortModel */
export const PortModelValidationMap: PropTypes.ValidationMap<PortModel> = {
  name: PropTypes.string.isRequired,
  port: PropTypes.number.isRequired,
};
