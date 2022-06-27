import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  minimize,
  run,
  stop,
  warning_outlined,
} from '@equinor/eds-icons';
import { ReactNode } from 'react';

import {
  StatusBadgeTemplate,
  StatusBagdeTemplateType,
} from '../status-badges/status-badge-template';

import './style.css';

export enum EnvironmentCardBadgeStatus {
  Consistent,
  Running,
  Starting,
  Stopped,
  Notice,
  Warning,
}

export type EnvironmentCardBadgeProps = {
  title: ReactNode;
  status: EnvironmentCardBadgeStatus;
  type?: StatusBagdeTemplateType;
};

const StatusIconMap: { [key: string]: JSX.Element } = {
  [EnvironmentCardBadgeStatus.Consistent]: <Icon data={check} />,
  [EnvironmentCardBadgeStatus.Running]: <Icon data={run} />,
  [EnvironmentCardBadgeStatus.Starting]: <CircularProgress />,
  [EnvironmentCardBadgeStatus.Stopped]: <Icon data={stop} />,
  [EnvironmentCardBadgeStatus.Notice]: <Icon data={error_outlined} />,
  [EnvironmentCardBadgeStatus.Warning]: <Icon data={warning_outlined} />,
};

const StatusTypeMap: { [key: string]: StatusBagdeTemplateType } = {
  [EnvironmentCardBadgeStatus.Notice]: 'warning',
  [EnvironmentCardBadgeStatus.Warning]: 'danger',
};

export const EnvironmentCardBadge = ({
  title,
  status,
  type,
}: EnvironmentCardBadgeProps): JSX.Element => (
  <StatusBadgeTemplate
    className="env_card-badge"
    icon={StatusIconMap[status] ?? <Icon data={minimize} />}
    type={type ?? StatusTypeMap[status]}
    children={title}
  />
);
