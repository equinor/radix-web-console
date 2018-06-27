import React from 'react';
import { connect } from 'react-redux';

import CreateApplicationForm from '../create-application-form';
import { isCreating } from '../../state/applications';
import { requestCreateApp } from '../../state/applications/action-creators';

export const PageCreateApplication = ({ requestCreate, isCreating }) => {
  return (
    <React.Fragment>
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">Create application</h1>
      </div>
      <main className="o-layout-page-content">
        <CreateApplicationForm
          requestCreate={requestCreate}
          isCreating={isCreating}
        />
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isCreating: isCreating(state),
});

const mapDispatchToProps = dispatch => ({
  requestCreate: request => dispatch(requestCreateApp(request)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreateApplication);
