import * as PropTypes from 'prop-types';

export interface NodeModel {
  gpu?: string;
  gpuCount?: string;
}

/* PropTypes validation map for NodeModel */
export const NodeModelValidationMap: PropTypes.ValidationMap<NodeModel> = {
  gpu: PropTypes.string,
  gpuCount: PropTypes.string,
};
