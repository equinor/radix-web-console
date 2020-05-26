import { connect } from 'react-redux';
import React from 'react';

import Alert from '../alert';
import Button from '../button';
import FormField from '../form-field';
import Panel from '../panel';
import Toggler from '../toggler';

import appActions from '../../state/application/action-creators';

export class DeleteApplicationForm extends React.Component {
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
    return (
      <Panel>
        <Toggler summary="Delete application">
          {this.state.hasConfirmedDelete
            ? this.renderConfirmed()
            : this.renderNotConfirmed()}
        </Toggler>
      </Panel>
    );
  }

  renderConfirmed() {
    return (
      <React.Fragment>
        <Alert type="danger">Are you absolutely sure?</Alert>
        <p>
          This action cannot be undone. You will permanently remove the{' '}
          <strong>{this.props.appName}</strong> application from Radix,
          including all of its environments.
        </p>
        <FormField label="Type application name to continue">
          <input
            onChange={this.handleAppNameChange}
            type="text"
            value={this.state.confirmedAppName}
          />
        </FormField>
        <div className="o-action-bar">
          <Button
            btnType="danger"
            disabled={this.state.confirmedAppName !== this.props.appName}
            onClick={this.doDelete}
          >
            I understand the consequences; delete this application
          </Button>
        </div>
      </React.Fragment>
    );
  }

  renderNotConfirmed() {
    return (
      <React.Fragment>
        <p>
          Once you delete an application there is no going back. Please be
          certain.
        </p>
        <div className="o-action-bar">
          <Button btnType="danger" onClick={this.confirmDelete}>
            Delete application
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteApp: (appName) => dispatch(appActions.deleteAppRequest(appName)),
});

export default connect(null, mapDispatchToProps)(DeleteApplicationForm);
