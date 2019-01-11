import React from 'react';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

import EmptyState from '.';

export default (
  <div>
    <EmptyState title="Something is missing" icon={faTruck} />
    <hr />
  </div>
);
