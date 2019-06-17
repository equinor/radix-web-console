import React from 'react';
import ConfigList from '../config-list';
import Panel from '../panel';

const PageAbout = () => {
  return (
    <Panel>
      <p>
        Radix Web Console [{process.env.REACT_APP_NAME}@
        {process.env.REACT_APP_VERSION}]
      </p>
      <h2 className="o-heading-section">Configuration</h2>
      <ConfigList />
    </Panel>
  );
};

export default PageAbout;
