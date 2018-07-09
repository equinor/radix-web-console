import React from 'react';
import { testSaga } from 'redux-saga-test-plan';

const PageApplicationPod = () => {
  return (
    <React.Fragment>
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">Pod</h1>
      </div>
      <p>Hello, this is the pod page</p>
      {/* TODO: show pod logs */}
    </React.Fragment>
  );
};

export default PageApplicationPod;
