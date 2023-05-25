import { Divider, Icon, Typography } from '@equinor/eds-core-react';
import { coffee } from '@equinor/eds-icons';
import { ReactNode } from 'react';

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
} from './status-badge-template';

import { ComponentStatus } from '../../models/component-status';
import { BuildSecretStatus } from '../../models/radix-api/buildsecrets/build-secret-status';
import { ImageHubSecretStatus } from '../../models/radix-api/privateimagehubs/image-hub-secret-status';
import { ReplicaStatus } from '../../models/replica-status';
import { SecretStatus } from '../../models/secret-status';

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

const genericTestData: Array<
  TestDataTemplate &
    Pick<GenericStatusBadgeProps, 'className' | 'customIconData' | 'type'>
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

const GenericBadge = <P, S extends TestDataTemplate>(
  title: string,
  array: Array<S>,
  BadgeElement: (props: P | { children?: ReactNode }) => JSX.Element
): JSX.Element => (
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

const EnumBadge = <P extends { status: S }, S>(
  title: string,
  types: Record<string | number, S>,
  BadgeElement: (props: P | { status: S }) => JSX.Element
): JSX.Element => (
  <>
    <Typography variant="h4">{title}</Typography>
    {Object.values(types).map((status, i) => (
      <div key={i} style={{ padding: '0.5em' }}>
        <BadgeElement {...{ status }} />
      </div>
    ))}
  </>
);

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
