import React from 'react';
import { Breadcrumb } from './index';

const links = [
  {
    label: 'Applications',
    to: '/applications',
  },
  {
    label: 'radix-api',
    to: '/applications/radix-api',
  },
  {
    label: 'prod',
    to: '/applications/radix-api/env/prod',
  },
  {
    label: 'server-8fd44cc58-6zmjt',
  },
];

const links2 = [
  {
    label: 'Applications',
    to: '/applications',
  },
  {
    label: 'radix-api',
    to: '/applications/radix-api',
  },
  {
    label: 'prod',
  },
];

const links3 = [
  {
    label: 'Applications',
    to: '/applications',
  },
  {
    label: 'radix-api',
  },
];

export default (
  <div
    style={{
      width: 999,
      margin: 'auto',
      marginTop: 50,
      gridGap: 10,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Breadcrumb links={links} />
    <Breadcrumb links={links2} />
    <Breadcrumb links={links3} />
  </div>
);
