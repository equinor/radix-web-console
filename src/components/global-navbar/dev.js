import React from 'react';
import { GlobalNavbar } from './index';

const envs = ['dev', 'qa', 'prod', 'yoto', 'poco'];

export default (
  <div style={{ width: 250, margin: 'auto', marginTop: 50 }}>
    <GlobalNavbar envs={envs} />
  </div>
);
