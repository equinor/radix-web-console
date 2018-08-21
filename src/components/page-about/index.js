import React from 'react';
import DocumentTitle from '../document-title';

const PageAbout = () => {
  return (
    <React.Fragment>
      <DocumentTitle title="About" />
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">About</h1>
      </div>
      <p>Hello, this is the about page.</p>
    </React.Fragment>
  );
};

export default PageAbout;
