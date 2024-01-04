import { ChipProps, Icon } from '@equinor/eds-core-react';
import {
  blocked,
  check,
  error_outlined,
  IconData,
  run,
  timer,
  traffic_light,
  warning_outlined,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

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
      data.icon = <Icon data={run} />;
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
export const GenericStatusBadge: FunctionComponent<GenericStatusBadgeProps> = ({
  customIconData,
  type,
  ...rest
}) => (
  <StatusBadgeTemplate
    {...{
      ...rest,
      ...getGenericStatus(type?.toLowerCase()),
      ...(!!customIconData && { icon: <Icon data={customIconData} /> }),
    }}
  />
);

GenericStatusBadge.propTypes = {
  customIconData: PropTypes.object as PropTypes.Validator<IconData>,
  type: PropTypes.string,
};

/** GenericStatusBadgeProps alias */
export type StatusBadgeProps = GenericStatusBadgeProps;
/** GenericStatusBadge alias */
export const StatusBadge = GenericStatusBadge;
