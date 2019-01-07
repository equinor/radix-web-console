import React from 'react';
import { AppNavbar } from '.';

const appName = 'radix-api';
const envs = ['dev', 'qa', 'prod', 'yoto', 'poco'];

export default (
  <div style={{ width: 250, margin: 'auto', marginTop: 50 }}>
    <AppNavbar appName={appName} envs={envs} />
  </div>
);
