import React from 'react';
import DocumentTitle from '../document-title';
import ConfigList from '../config-list';

const PageAbout = () => {
  return (
    <React.Fragment>
      <DocumentTitle title="About" />
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">About</h1>
      </div>
      <p>Hello, this is the about page.</p>
      <h1 className="o-heading-page">Configuration</h1>
      <ConfigList />
    </React.Fragment>
  );
};

export default PageAbout;
