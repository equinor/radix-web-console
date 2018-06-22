import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export class CreateApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        repository: '',
        cloneUrl: '',
        sharedSecret: '',
        privateDeployKey: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
        <label>
          Name
          <input
            name="name"
            type="text"
            value={this.state.form.name}
            onChange={this.makeOnChangeHandler()}
          />
        </label>
        <label>
          Repository
          <input
            name="repository"
            type="text"
            value={this.state.form.repository}
            onChange={this.makeOnChangeHandler()}
          />
        </label>
        <label>
          Clone URL
          <input
            name="cloneUrl"
            type="text"
            value={this.state.form.cloneUrl}
            onChange={this.makeOnChangeHandler()}
          />
        </label>
        <label>
          Shared secret
          <input
            name="sharedSecret"
            type="text"
            value={this.state.form.sharedSecret}
            onChange={this.makeOnChangeHandler()}
          />
        </label>
        <label>
          Private deploy key
          <textarea
            name="privateDeployKey"
            value={this.state.form.privateDeployKey}
            onChange={this.makeOnChangeHandler()}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    );
  }
}

CreateApplicationForm.propTypes = {
  requestCreate: PropTypes.func.isRequired,
};

export default CreateApplicationForm;
