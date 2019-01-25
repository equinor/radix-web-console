import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Alert from '../alert';
import Button from '../button';
import FormField from '../form-field';
import Spinner from '../spinner';

import requestStates from '../../state/state-utils/request-states';

import jobActions from '../../state/job-creation/action-creators';
import { getCreationError, getCreationState } from '../../state/job-creation';
import { getEnvironmentBranches } from '../../state/application';

class CreateJobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        pipelineName: 'build-deploy',
        branch: props.branch || 'master',
      },
    };

    this.handleChangeBranch = this.handleChangeBranch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url = new URL(document.location.href);
    if (url.searchParams.has('branch')) {
      const branch = url.searchParams.get('branch');

      this.setState({ form: { ...this.state.form, branch } });
    }
  }

  handleChangeBranch(ev) {
    this.setState({ form: { ...this.state.form, branch: ev.target.value } });
  }

  handleSubmit(ev) {
    const { appName } = this.props;
    ev.preventDefault();
    this.props.requestCreate({
      appName,
      ...this.state.form,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset
          disabled={this.props.creationState === requestStates.IN_PROGRESS}
        >
          <FormField label="Pipeline">
            <select>
              <option>build-deploy</option>
            </select>
          </FormField>
          <FormField label="Git branch to build">
            {this.renderBranches()}
          </FormField>
          <div className="o-action-bar">
            {this.props.creationState === requestStates.IN_PROGRESS && (
              <Spinner>Creating…</Spinner>
            )}
            {this.props.creationState === requestStates.FAILURE && (
              <Alert type="danger">
                Failed to create job. {this.props.creationError}
              </Alert>
            )}
            <Button btnType="primary" type="submit">
              Create
            </Button>
          </div>
        </fieldset>
      </form>
    );
  }

  renderBranches() {
    const { branches } = this.props;

    const optionsRender = branches.map(branch => (
      <option key={branch} value={branch}>
        {branch}
      </option>
    ));

    return (
      <select value={this.state.form.branch} onChange={this.handleChangeBranch}>
        {optionsRender}
      </select>
    );
  }
}

CreateJobForm.propTypes = {
  appName: PropTypes.string.isRequired,
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  creationError: PropTypes.string,
  branches: PropTypes.array.isRequired,
  requestCreate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  creationState: getCreationState(state),
  creationError: getCreationError(state),
  branches: getEnvironmentBranches(state),
});

const mapDispatchToProps = dispatch => ({
  requestCreate: job => dispatch(jobActions.addJobRequest(job)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJobForm);
