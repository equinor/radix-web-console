import { Divider, Icon, Typography } from '@equinor/eds-core-react';
import { coffee } from '@equinor/eds-icons';
import type React from 'react';
import type { ComponentType, PropsWithChildren } from 'react';

import {
  BadgeTemplates,
  BuildSecretStatusBadge,
  ComponentSecretStatusBadge,
  ComponentStatusBadge,
  GenericStatusBadge,
  type GenericStatusBadgeProps,
  ImageHubSecretStatusBadge,
  JobConditionBadgeTemplates,
  PipelineRunStatusBadge,
  ProgressStatusBadge,
  RadixJobConditionBadge,
  ReplicaStatusBadge,
} from '.';
import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

interface TestDataTemplate {
  description: string;
  text?: string;
}

const templateTestData: Array<
  TestDataTemplate &
    Pick<StatusBadgeTemplateProps, 'className' | 'icon' | 'type'>
> = [
  { description: 'no Type, no Text, no Icon' },
  { description: 'no Type, Text, no Icon', text: 'TestBadge' },
  { description: 'no Type, no Text, Icon', icon: <Icon data={coffee} /> },
  {
    description: 'Type, Text, Icon',
    text: 'TestBadge',
    type: 'success',
    icon: <Icon data={coffee} />,
  },
  { description: 'type Success', text: 'Success', type: 'success' },
  { description: 'type Warning', text: 'Warning', type: 'warning' },
  { description: 'type Danger', text: 'Danger', type: 'danger' },
  { description: 'type None', text: 'None', type: 'none' },
  { description: 'type Default', text: 'Default', type: 'default' },
];

const genericTestData = [
  { description: 'no Type, no Text', type: 'unknown' },
  { description: 'no Type, Text', text: 'TestLabel', type: 'unknown' },
  { description: 'Type, no Text', type: 'warning' },
  { description: 'Success', text: 'Success', type: 'success' },
  { description: 'Warning', text: 'Warning', type: 'warning' },
  { description: 'Error', text: 'Error', type: 'danger' },
  { description: 'Running', text: 'Running', type: 'running' },
  {
    description: 'no Type, Custom Class',
    text: 'TestLabel',
    className: 'TestClass',
    type: 'unknown',
  },
  {
    description: 'Custom Icon, Type',
    text: 'TestLabel',
    type: 'danger',
    customIconData: coffee,
  },
  {
    description: 'Custom Icon, no Type',
    text: 'TestLabel',
    customIconData: coffee,
    type: 'unknown',
  },
] satisfies Array<TestDataTemplate & GenericStatusBadgeProps>;

const GenericBadge: <P, S extends TestDataTemplate>(
  title: string,
  array: Array<S>,
  BadgeElement: ComponentType<P | PropsWithChildren>
) => React.JSX.Element = (title, array, BadgeElement) => (
  <>
    <Typography variant="h4">{title}</Typography>
    {array.map(({ description, text, ...rest }, i) => (
      <div key={i} style={{ padding: '0.5em' }}>
        <Typography>{description}</Typography>
        <BadgeElement {...rest}>{text}</BadgeElement>
      </div>
    ))}
  </>
);

const EnumBadge: <P extends { status: S }, S extends string>(
  title: string,
  types: Array<S>,
  BadgeElement: ComponentType<P | { status: S }>
) => React.JSX.Element = (title, types, BadgeElement) => (
  <>
    <Typography variant="h4">{title}</Typography>
    {Object.values(types).map((status, i) => (
      <div key={i} style={{ padding: '0.5em' }}>
        <BadgeElement {...{ status }} />
      </div>
    ))}
  </>
);

const testData = [
  GenericBadge('StatusBadgeTemplate', templateTestData, StatusBadgeTemplate),
  GenericBadge('GenericStatusBadges', genericTestData, GenericStatusBadge),
  EnumBadge(
    'BuildSecretStatusBadge',
    ['Consistent', 'Pending'],
    // @ts-expect-error No idea how to fix this one
    BuildSecretStatusBadge
  ),
  EnumBadge(
    'ComponentSecretStatusBadge',
    ['Pending', 'Consistent', 'NotAvailable', 'Invalid', 'Unsupported'],
    // @ts-expect-error No idea how to fix this one
    ComponentSecretStatusBadge
  ),
  EnumBadge(
    'ComponentStatusBadges',
    [
      'StoppedComponent',
      'ConsistentComponent',
      'ComponentReconciling',
      'ComponentRestarting',
      'ComponentOutdated',
      'Unsupported',
    ],
    ComponentStatusBadge
  ),
  EnumBadge(
    'ImageHubSecretStatusBadge',
    ['Consistent', 'Pending'],
    ImageHubSecretStatusBadge
  ),
  EnumBadge(
    'PipelineRunBadges',
    Object.keys(BadgeTemplates),
    PipelineRunStatusBadge
  ),
  EnumBadge(
    'ProgressStatusBadges',
    ['Failed', 'Running', 'Stopped', 'Stopping', 'Succeeded', 'Waiting'],
    ProgressStatusBadge
  ),
  EnumBadge(
    'RadixJobConditionBadges',
    Object.keys(JobConditionBadgeTemplates),
    RadixJobConditionBadge
  ),
  EnumBadge(
    'ReplicaStatusBadges',
    [
      'Pending',
      'Failed',
      'Failing',
      'Running',
      'Succeeded',
      'Terminated',
      'Starting',
    ],
    ReplicaStatusBadge
  ),
] as const;

export default (
  <div
    style={{
      padding: '1.5em',
      backgroundColor: 'var(--eds_ui_background__default)',
    }}
  >
    {testData.map((x, i) => (
      <div key={i}>
        {x} <Divider />
      </div>
    ))}
  </div>
);
