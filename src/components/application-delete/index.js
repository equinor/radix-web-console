import { connect } from 'react-redux';
import React from 'react';

import Button from '../button';

import appsActions from '../../state/applications/action-creators';

export class ApplicationDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasConfirmedDelete: false,
    };
    this.confirmDelete = this.confirmDelete.bind(this);
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
        <p className="alert--danger">
          Unexpected bad things will happen if you don’t read this!
        </p>
        <p>
          This action cannot be undone. This will permanently delete the{' '}
          {this.props.appName} application.
        </p>
        <p>Please type in the name of the application to confirm.</p>
        <p>
          <input
            onChange={this.handleAppNameChange}
            value={this.state.confirmedAppName}
          />
        </p>
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
        <p>Delete this application</p>
        <p>
          Once you delete an application, there is no going back. Please be
          certain.
        </p>
        <p>
          <Button btnType="danger" onClick={this.confirmDelete}>
            Delete this application
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
