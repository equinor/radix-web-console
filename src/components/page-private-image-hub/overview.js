import React from 'react';

const Overview = props => (
  <div className="o-layout-columns">
    <div>
      Server <strong>{props.server}</strong>
    </div>
    <div>
      Username <strong>{props.username}</strong>
    </div>
  </div>
);

export default Overview;
