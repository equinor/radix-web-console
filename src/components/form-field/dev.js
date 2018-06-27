import React from 'react';

import FormField from '.';

export default (
  <div className="o-layout-container">
    <FormField label="Standard">
      <input type="text" />
    </FormField>
    <FormField label="Disabled">
      <input type="text" disabled value="Some value" />
    </FormField>
    <FormField label="Invalid">
      <input type="email" value="Not an email" />
    </FormField>
  </div>
);
