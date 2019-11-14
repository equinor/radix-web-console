import React from 'react';

const overview = props => (
  <div className="build-secrets-overview">
    <div>
      Secret name <strong>{props.secretName}</strong>
    </div>
  </div>
);

export default overview;
