import { Typography } from '@equinor/eds-core-react';
import { coffee } from '@equinor/eds-icons';

import { StatusBadge, StatusBadgeProps } from '.';

const testData: Array<
  { description: string; text?: string } & StatusBadgeProps
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

export default (
  <div
    style={{
      padding: '1.5em',
      backgroundColor: 'var(--eds_ui_background__default)',
    }}
  >
    {testData.map(({ description, text, ...rest }, i) => (
      <div key={i} style={{ padding: '0.5em' }}>
        <Typography>{description}</Typography>
        <StatusBadge {...rest}>{text}</StatusBadge>
      </div>
    ))}
  </div>
);
