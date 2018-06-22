import React from 'react';
import { connect } from 'react-redux';

import CreateApplicationForm from '../create-application-form';
import { isCreating } from '../../state/applications';
import { requestCreateApp } from '../../state/applications/action-creators';

export const PageCreateApplication = ({ requestCreate, isCreating }) => {
  return (
    <React.Fragment>
      <h1>Create application</h1>
      <CreateApplicationForm
        requestCreate={requestCreate}
        isCreating={isCreating}
      />
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
