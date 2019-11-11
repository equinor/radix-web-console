import React from 'react';

const overview = props => (
  <div className="private-image-hubs-overview">
    <div>
      Secret <strong>{props.server}</strong>
    </div>
    <div>
      Username <strong>{props.username}</strong>
    </div>
  </div>
);

export default overview;
