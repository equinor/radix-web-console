import { Divider, Icon, Typography } from '@equinor/eds-core-react';
import { coffee } from '@equinor/eds-icons';

import {
  BuildSecretStatusBadge,
  ComponentSecretStatusBadge,
  ComponentStatusBadge,
  GenericStatusBadge,
  GenericStatusBadgeProps,
  ImageHubSecretStatusBadge,
  ReplicaStatusBadge,
} from '.';
import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
  StatusBadgeTemplateType,
} from './status-badge-template';

import { BuildSecretStatus } from '../../models/build-secret-status';
import { ComponentStatus } from '../../models/component-status';
import { ImageHubSecretStatus } from '../../models/image-hub-secret-status';
import { ReplicaStatus } from '../../models/replica-status';
import { SecretStatus } from '../../models/secret-status';

interface TestDataTemplate<T> {
  description: string;
  text?: string;
  type?: T;
}

const templateTestData: Array<
  TestDataTemplate<StatusBadgeTemplateType> & StatusBadgeTemplateProps
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

const genericTestData: Array<
  TestDataTemplate<string> & GenericStatusBadgeProps
> = [
  { description: 'no Type, no Text' },
  { description: 'no Type, Text', text: 'TestLabel' },
  { description: 'Type, no Text', type: 'warning' },
  { description: 'Success', text: 'Success', type: 'success' },
  { description: 'Warning', text: 'Warning', type: 'warning' },
  { description: 'Error', text: 'Error', type: 'danger' },
  { description: 'Running', text: 'Running', type: 'running' },
  {
    description: 'no Type, Custom Class',
    text: 'TestLabel',
    className: 'TestClass',
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
  },
];

function GenericBadge<T>(
  title: string,
  array: Array<TestDataTemplate<T>>,
  BadgeElement: (
    props?: Omit<TestDataTemplate<T>, 'description' | 'text'>
  ) => JSX.Element
): JSX.Element {
  return (
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
}

function EnumBadge<T>(
  title: string,
  type: Record<string | number, T>,
  BadgeElement: ({ status }: { status: T }) => JSX.Element
): JSX.Element {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      {Object.values(type).map((x, i) => (
        <div key={i} style={{ padding: '0.5em' }}>
          <BadgeElement status={x} />
        </div>
      ))}
    </>
  );
}

const testData: Array<JSX.Element> = [
  GenericBadge('StatusBadgeTemplate', templateTestData, StatusBadgeTemplate),
  GenericBadge('GenericStatusBadges', genericTestData, GenericStatusBadge),
  EnumBadge(
    'BuildSecretStatusBadge',
    BuildSecretStatus,
    BuildSecretStatusBadge
  ),
  EnumBadge(
    'ComponentSecretStatusBadge',
    SecretStatus,
    ComponentSecretStatusBadge
  ),
  EnumBadge('ComponentStatusBadges', ComponentStatus, ComponentStatusBadge),
  EnumBadge(
    'ImageHubSecretStatusBadge',
    ImageHubSecretStatus,
    ImageHubSecretStatusBadge
  ),
  EnumBadge('ReplicaStatusBadges', ReplicaStatus, ReplicaStatusBadge),
];

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
