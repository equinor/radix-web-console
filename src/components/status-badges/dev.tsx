import { Divider, Icon, Typography } from '@equinor/eds-core-react';
import { coffee } from '@equinor/eds-icons';

import {
  ComponentStatusBadge,
  GenericStatusBadge,
  GenericStatusBadgeProps,
} from '.';
import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
  StatusBagdeTemplateType,
} from './status-badge-template';

import { ComponentStatus } from '../../models/component-status';

interface TestDataTemplate<T> {
  description: string;
  text?: string;
  type?: T;
}

const templateTestData: Array<
  TestDataTemplate<StatusBagdeTemplateType> & StatusBadgeTemplateProps
> = [
  { description: 'no Type, no Text, no Icon' },
  { description: 'no Type, Text, no Icon', text: 'TestBadge' },
  { description: 'no Type, no Text, Icon', icon: <Icon data={coffee} /> },
  {
    description: 'type, Text, Icon',
    text: 'TestBadge',
    type: 'success',
    icon: <Icon data={coffee} />,
  },
  { description: 'type Danger', text: 'Danger', type: 'danger' },
  { description: 'type Warning', text: 'Warning', type: 'warning' },
  { description: 'type Success', text: 'Success', type: 'success' },
  { description: 'type none', text: 'None', type: 'none' },
];

const genericTestData: Array<
  TestDataTemplate<string> & GenericStatusBadgeProps
> = [
  { description: 'Success', text: 'Success', type: 'success' },
  { description: 'Warning', text: 'Warning', type: 'warning' },
  { description: 'Error', text: 'Error', type: 'danger' },
  { description: 'Running', text: 'Running', type: 'running' },
  { description: 'No Type', text: 'TestLabel' },
  { description: 'Empty, with Type', type: 'warning' },
  { description: 'Empty, without Type' },
  {
    description: 'No Type, with Class',
    text: 'TestLabel',
    className: 'TestClass',
  },
  {
    description: 'CustomIcon, with Type',
    text: 'TestLabel',
    customIconData: coffee,
    type: 'danger',
  },
  {
    description: 'CustomIcon, without Type',
    text: 'TestLabel',
    customIconData: coffee,
  },
];

function TestBadge<T>(
  title: string,
  array: Array<TestDataTemplate<T>>,
  BadgeElement: (
    props?: Omit<TestDataTemplate<T>, 'description' | 'text'>
  ) => JSX.Element
) {
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

export default (
  <div
    style={{
      padding: '1.5em',
      backgroundColor: 'var(--eds_ui_background__default)',
    }}
  >
    {TestBadge('StatusBadgeTemplate', templateTestData, StatusBadgeTemplate)}
    <Divider />
    {TestBadge('GenericStatusBadges', genericTestData, GenericStatusBadge)}
    <Divider />

    <Typography variant="h4">ComponentStatusBadges</Typography>
    {Object.values(ComponentStatus).map((x, i) => (
      <div key={i} style={{ padding: '0.5em' }}>
        <ComponentStatusBadge status={x} />
      </div>
    ))}
  </div>
);
