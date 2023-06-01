import * as PropTypes from 'prop-types';

export interface NotificationsModel {
  webhook?: string;
}

/* PropTypes validation map for NotificationsModel */
export const NotificationsValidationMap: PropTypes.ValidationMap<NotificationsModel> =
  {
    webhook: PropTypes.string,
  };
