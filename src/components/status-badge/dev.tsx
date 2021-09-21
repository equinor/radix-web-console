import { Typography } from '@equinor/eds-core-react';
import { coffee } from '@equinor/eds-icons';

import { StatusBadge } from '.';

const testData = [
  { description: 'Success', text: 'Success', type: 'success' },
  { description: 'Warning', text: 'Warning', type: 'warning' },
  { description: 'Error', text: 'Error', type: 'danger' },
  { description: 'Running', text: 'Running', type: 'running' },
  { description: 'No Type', text: 'TestLabel' },
  { description: 'Empty, with Type', type: 'warning' },
  { description: 'Empty, without Type' },
  {
    description: 'CustomIcon, with Type',
    text: 'TestLabel',
    type: 'danger',
    icon: coffee,
  },
  { description: 'CustomIcon, without Type', text: 'TestLabel', icon: coffee },
  { description: 'With added Class', text: 'TestLabel', class: 'TestClass' },
];

export default (
  <div
    className="grid grid--gap-medium"
    style={{
      padding: '1rem',
      backgroundColor: 'var(--eds_ui_background__default)',
    }}
  >
    {testData.map((x, i) => (
      <div key={i}>
        <Typography>{x.description}</Typography>
        <StatusBadge
          {...(x.class && { className: x.class })}
          {...(x.icon && { customIconData: x.icon })}
          {...(x.type && { type: x.type })}
        >
          {x.text}
        </StatusBadge>
      </div>
    ))}
  </div>
);
