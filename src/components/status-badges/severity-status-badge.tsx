import { Icon } from '@equinor/eds-core-react';
import { pressure } from '@equinor/eds-icons';
import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

export enum Severity {
  None = 0,
  Information = 1,
  Warning = 2,
  Critical = 3,
}

export const GetHighestSeverity = (a: Severity, b: Severity): Severity => {
  if (a > b) return a;
  return b;
};

export const GetHighestSeverityFns = <TArgs,>(
  data: TArgs,
  fns: ((data: TArgs) => Severity)[]
): Severity => {
  let highest = Severity.None;

  fns.forEach((fn) => {
    const res = fn(data);
    highest = GetHighestSeverity(res, highest);
  });

  return highest;
};

const BadgeTemplates = {
  [Severity.None]: {
    icon: <Icon data={pressure} />,
    message: 'Normal',
    type: 'none',
  },
  [Severity.Information]: {
    icon: <Icon data={pressure} />,
    message: 'Information',
    type: 'default',
  },
  [Severity.Warning]: {
    icon: <Icon data={pressure} />,
    message: 'Warning',
    type: 'warning',
  },
  [Severity.Critical]: {
    icon: <Icon data={pressure} />,
    message: 'Critical',
    type: 'danger',
  },
} satisfies Record<Severity, StatusBadgeTemplateProps & { message: string }>;

type Props = {
  severity: Severity;
} & StatusBadgeTemplateProps;

export const SeverityStatusBadge = ({ severity, children, ...rest }: Props) => {
  const { message, ...template } = BadgeTemplates[severity];
  return (
    <StatusBadgeTemplate {...template} {...rest}>
      {children ?? message}
    </StatusBadgeTemplate>
  );
};
