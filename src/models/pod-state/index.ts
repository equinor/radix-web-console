import * as PropTypes from 'prop-types';

export interface PodStateModel {
  ready: boolean;
  started?: boolean;
  restartCount: number;
}

/* PropTypes validation map for PodStateModel */
export const PodStateModelValidationMap: PropTypes.ValidationMap<PodStateModel> =
  {
    ready: PropTypes.bool.isRequired,
    started: PropTypes.bool,
    restartCount: PropTypes.number.isRequired,
  };
