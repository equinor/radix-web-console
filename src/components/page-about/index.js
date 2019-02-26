import React from 'react';
import DocumentTitle from '../document-title';
import ConfigList from '../config-list';
import Panel from '../panel';

const PageAbout = () => {
  return (
    <React.Fragment>
      <DocumentTitle title="About" />
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">About</h1>
      </div>
      <Panel>
        <p>
          Radix Web Console [{process.env.REACT_APP_NAME}@
          {process.env.REACT_APP_VERSION}]
        </p>
        <h2 className="o-heading-section">Configuration</h2>
        <ConfigList />
      </Panel>
    </React.Fragment>
  );
};

export default PageAbout;
