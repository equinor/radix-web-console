import { connect } from 'react-redux';
import React from 'react';

import Alert from '../alert';
import Button from '../button';
import FormField from '../form-field';

import appsActions from '../../state/applications/action-creators';

export class ApplicationDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasConfirmedDelete: false,
    };
    this.confirmDelete = this.confirmDelete.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.handleAppNameChange = this.handleAppNameChange.bind(this);
  }

  confirmDelete() {
    this.setState({
      confirmedAppName: '',
      hasConfirmedDelete: true,
    });
  }

  doDelete() {
    this.props.deleteApp(this.props.appName);
  }

  handleAppNameChange(ev) {
    this.setState({
      confirmedAppName: ev.target.value,
    });
  }

  render() {
    if (this.state.hasConfirmedDelete) {
      return this.renderConfirmed();
    }

    return this.renderNotConfirmed();
  }

  renderConfirmed() {
    return (
      <div>
        <p>Are you absolutely sure?</p>
        <Alert type="danger">
          Unexpected bad things will happen if you don’t read this!
        </Alert>
        <p>
          This action cannot be undone. You will permanently remove the{' '}
          <strong>{this.props.appName}</strong> application from Radix,
          including all of its environments.
        </p>
        <p>Type the name of the application to confirm.</p>
        <FormField label="Confirm application name">
          <input
            onChange={this.handleAppNameChange}
            type="text"
            value={this.state.confirmedAppName}
          />
        </FormField>
        <p>
          <Button
            btnType="danger"
            disabled={this.state.confirmedAppName !== this.props.appName}
            onClick={this.doDelete}
          >
            I understand the consequences, delete this application
          </Button>
        </p>
      </div>
    );
  }

  renderNotConfirmed() {
    return (
      <div>
        <p>
          Delete this application. Once you delete an application, there is no
          going back. Please be certain.
        </p>
        <p>
          <Button btnType="danger" onClick={this.confirmDelete}>
            Delete application
          </Button>
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteApp: appName => dispatch(appsActions.deleteAppRequest(appName)),
});

export default connect(
  null,
  mapDispatchToProps
)(ApplicationDelete);
