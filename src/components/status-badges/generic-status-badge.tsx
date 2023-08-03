import { ChipProps, CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  blocked,
  check,
  error_outlined,
  IconData,
  timer,
  traffic_light,
  warning_outlined,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

export type GenericStatusBadgeProps = {
  customIconData?: IconData;
  type?: string;
} & ChipProps;

function getGenericStatus(
  status: string
): Pick<StatusBadgeTemplateProps, 'icon' | 'type'> {
  const data: Pick<StatusBadgeTemplateProps, 'icon' | 'type'> = {};

  switch (status) {
    case 'running':
      data.icon = <CircularProgress />;
      break;
    case 'danger':
    case 'failed':
      data.icon = <Icon data={error_outlined} />;
      data.type = 'danger';
      break;
    case 'queued':
      data.icon = <Icon data={timer} />;
      break;
    case 'waiting':
      data.icon = <Icon data={traffic_light} />;
      break;
    case 'stopped':
    case 'stoppednochanges':
      data.icon = <Icon data={blocked} />;
      break;
    case 'success':
    case 'succeeded':
      data.icon = <Icon data={check} />;
      break;
    case 'unknown':
    case 'warning':
      data.icon = <Icon data={warning_outlined} />;
      data.type = 'warning';
      break;
    default:
      break;
  }

  return data;
}

/** GenericStatusBadge */
export const GenericStatusBadge = ({
  customIconData,
  type,
  ...rest
}: GenericStatusBadgeProps): React.JSX.Element => (
  <StatusBadgeTemplate
    {...{
      ...rest,
      ...getGenericStatus(type?.toLowerCase()),
      ...(!!customIconData && { icon: <Icon data={customIconData} /> }),
    }}
  />
);

GenericStatusBadge.propTypes = {
  customIconData: PropTypes.object,
  type: PropTypes.string,
} as PropTypes.ValidationMap<Omit<GenericStatusBadgeProps, keyof ChipProps>>;

/** GenericStatusBadgeProps alias */
export type StatusBadgeProps = GenericStatusBadgeProps;
/** GenericStatusBadge alias */
export const StatusBadge = GenericStatusBadge;
