import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../button';
import FormField from '../form-field';
import Spinner from '../spinner';

import requestStates from '../../state/state-utils/request-states';

class CreateJobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        pipeline: 'build-deploy',
        branch: props.branch || 'master',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url = new URL(document.location.href);
    if (url.searchParams.has('branch')) {
      const branch = url.searchParams.get('branch');

      this.setState({ form: { ...this.state.form, branch } });
    }
  }

  makeOnChangeHandler() {
    return ev =>
      this.setState({
        form: Object.assign({}, this.state.form, {
          [ev.target.name]: ev.target.value,
        }),
      });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.requestCreate(this.state.form);
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
            <select>
              <option>master</option>
              <option>release</option>
            </select>
          </FormField>
          <div className="o-action-bar">
            {this.props.creationState === requestStates.IN_PROGRESS && (
              <Spinner>Creating…</Spinner>
            )}
            <Button btnType="primary" type="submit">
              Create
            </Button>
          </div>
        </fieldset>
      </form>
    );
  }
}

// todo: remove
const getCreationState = state => {};
const getCreationError = state => {};
const appsActions = {
  addAppRequest: app => {},
};

CreateJobForm.propTypes = {
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  creationError: PropTypes.string,
  requestCreate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  creationState: getCreationState(state),
  creationError: getCreationError(state),
});

const mapDispatchToProps = dispatch => ({
  requestCreate: app => dispatch(appsActions.addAppRequest(app)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJobForm);
