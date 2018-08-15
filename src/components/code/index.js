import React from 'react';

import './style.css';

export const Code = ({ children }) => (
  <div className="code">
    <pre>{children}</pre>
  </div>
);

export default Code;
