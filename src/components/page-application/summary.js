import React from 'react';

import Pods from './pods';
import Secrets from './secrets';

export const Summary = ({ app }) => (
  <div className="o-layout-columns">
    <div>
      <h2 className="o-heading-section">Pods</h2>
      <Pods app={app} />
    </div>
    <div>
      <h2 className="o-heading-section">Secrets</h2>
      <Secrets app={app} />
    </div>
  </div>
);

export default Summary;
