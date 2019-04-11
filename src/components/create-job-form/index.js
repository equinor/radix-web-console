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
import * as subscriptionActions from '../../state/subscriptions/action-creators';

const pipelineTypes = ['build', 'build-deploy'];
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
    this.handleChangePipeline = this.handleChangePipeline.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url = new URL(document.location.href);
    if (url.searchParams.has('branch')) {
      const branch = url.searchParams.get('branch');

      this.setState({ form: { ...this.state.form, branch } });
    }
  }

  componentWillMount() {
    this.props.subscribeApplication(this.props.appName);
  }

  componentWillUnmount() {
    this.props.unsubscribeApplication(this.props.appName);
  }

  getDeploymentTargets(envs) {
    if (envs.length === 1) {
      return (
        <React.Fragment>
          <code>{envs[0]}</code> environment
        </React.Fragment>
      );
    }

    const envsRender = envs.map((env, index) => {
      const sufix = this.getSufix(envs.length, index);
      return (
        <React.Fragment key={env}>
          <code>{env}</code>
          {sufix}
        </React.Fragment>
      );
    });

    return envsRender;
  }

  getSufix(length, currentIndex) {
    if (currentIndex === length - 2) {
      return ' and ';
    }
    if (currentIndex === length - 1) {
      return ' environments';
    }
    return ', ';
  }

  handleChangeBranch(ev) {
    this.setState({ form: { ...this.state.form, branch: ev.target.value } });
  }

  handleChangePipeline(ev) {
    this.setState({
      form: { ...this.state.form, pipelineName: ev.target.value },
    });
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
            <select
              value={this.state.form.pipelineName}
              onChange={this.handleChangePipeline}
            >
              {pipelineTypes.map(p => (
                <option value={p} key={p}>
                  {p}
                </option>
              ))}
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

    const optionsRender = Object.keys(branches).map(branch => (
      <option key={branch} value={branch}>
        {branch}
      </option>
    ));

    return (
      <React.Fragment>
        <select
          value={this.state.form.branch}
          onChange={this.handleChangeBranch}
        >
          {optionsRender}
        </select>
        <p>{this.renderDeployments()}</p>
      </React.Fragment>
    );
  }

  renderDeployments() {
    const { branches } = this.props;
    const selectedBranchName = this.state.form.branch;

    if (!branches || !selectedBranchName || !branches[selectedBranchName]) {
      return null;
    }

    const selectedBranch = branches[selectedBranchName];
    const targets = this.getDeploymentTargets(selectedBranch);

    return (
      <React.Fragment>
        Branch <code>{selectedBranchName}</code> will be deployed to {targets}.
      </React.Fragment>
    );
  }
}

CreateJobForm.propTypes = {
  appName: PropTypes.string.isRequired,
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  creationError: PropTypes.string,
  branches: PropTypes.object.isRequired,
  requestCreate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  creationState: getCreationState(state),
  creationError: getCreationError(state),
  branches: getEnvironmentBranches(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  requestCreate: job => dispatch(jobActions.addJobRequest(job)),
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: () =>
    dispatch(subscriptionActions.unsubscribeApplication(appName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJobForm);
