import React from 'react';

import DocumentTitle from '../document-title';

const PageApplicationSecret = () => {
  return (
    <React.Fragment>
      <DocumentTitle title="Secret page" />
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">Secret</h1>
      </div>
      <p>Hello, this is the secret page</p>
      {/* TODO: show secret details */}
    </React.Fragment>
  );
};

export default PageApplicationSecret;
