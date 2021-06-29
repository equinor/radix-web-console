import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Alert from '../alert';
import AppConfigAdGroups from '../app-config-ad-groups';

import {
  getModifyRequestError,
  getModifyRequestState,
} from '../../state/application';
import appActions from '../../state/application/action-creators';
import requestStates from '../../state/state-utils/request-states';

import { Accordion, Button, CircularProgress } from '@equinor/eds-core-react';

function deriveStateFromProps(props) {
  return {
    form: {
      adGroups: props.adGroups ? props.adGroups.join(',') : '',
      adModeAuto: !props.adGroups,
    },
  };
}

export class ChangeAdminForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = deriveStateFromProps(props);

    this.makeOnChangeHandler = this.makeOnChangeHandler.bind(this);
    this.handleAdModeChange = this.handleAdModeChange.bind(this);
    this.handleFormChanged = this.handleFormChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAdModeChange(ev) {
    this.handleFormChanged();
    this.setState({
      form: Object.assign({}, this.state.form, {
        adModeAuto: ev.target.value === 'true',
      }),
    });
  }

  handleFormChanged() {
    // if there is a creation error then we will reset the creation request to clear the error
    if (this.props.modifyError) {
      this.props.modifyAppReset();
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.changeAppAdmin(this.props.appName, this.state.form);
  }

  makeOnChangeHandler() {
    return (ev) => {
      this.handleFormChanged();
      this.setState({
        form: Object.assign({}, this.state.form, {
          [ev.target.name]: ev.target.value,
        }),
      });
    };
  }

  componentDidUpdate(prevProps) {
    // Reset the form if the app data changes (e.g. after the refresh once the update is successful)
    let adGroupsUnequal =
      this.props.adGroups !== prevProps.adGroups &&
      (this.props.adGroups === null ||
        prevProps.adGroups === null ||
        this.props.adGroups.length !== prevProps.adGroups.length ||
        (this.props.adGroups.length !== 0 &&
          this.props.adGroups.reduce(
            (neq, val, i) => neq || val !== prevProps.adGroups[i],
            false
          )));

    if (adGroupsUnequal || this.props.adModeAuto !== prevProps.adModeAuto) {
      this.setState(deriveStateFromProps(this.props));
    }
  }

  render() {
    return (
      <Accordion chevronPosition="right" headerLevel="p">
        <Accordion.Item className="accordion__item">
          <Accordion.Header className="accordion__header body_short">
            Change administrators
          </Accordion.Header>
          <Accordion.Panel className="accordion__panel">
            <form onSubmit={this.handleSubmit} className="accordion__content">
              {this.props.modifyState === requestStates.FAILURE && (
                <Alert type="danger" className="gap-bottom">
                  Failed to change administrators. {this.props.modifyError}
                </Alert>
              )}
              <AppConfigAdGroups
                adGroups={this.state.form.adGroups}
                adModeAuto={this.state.form.adModeAuto}
                handleAdGroupsChange={this.makeOnChangeHandler()}
                handleAdModeChange={this.handleAdModeChange}
                handleDisabled={
                  this.props.modifyState === requestStates.IN_PROGRESS
                }
              />
              <div className="o-action-bar">
                {this.props.modifyState === requestStates.IN_PROGRESS && (
                  <>
                    <CircularProgress size="24" />
                    <span className="progress">Updating…</span>
                  </>
                )}
                {this.props.modifyState !== requestStates.IN_PROGRESS && (
                  <Button color="danger" type="submit">
                    Change administrators
                  </Button>
                )}
              </div>
            </form>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  }
}

ChangeAdminForm.propTypes = {
  appName: PropTypes.string.isRequired,
  changeAppAdmin: PropTypes.func.isRequired,
  modifyAppReset: PropTypes.func.isRequired,
  modifyError: PropTypes.string,
  modifyState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
};

const mapStateToProps = (state) => ({
  modifyError: getModifyRequestError(state),
  modifyState: getModifyRequestState(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeAppAdmin: (appName, adGroupConfig) =>
    dispatch(appActions.changeAppAdmin(appName, adGroupConfig)),
  modifyAppReset: (appName) => dispatch(appActions.modifyAppReset(appName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAdminForm);
