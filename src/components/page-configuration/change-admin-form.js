import {
  Accordion,
  Button,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Alert } from '../alert';
import { AppConfigAdGroups } from '../app-config-ad-groups';
import {
  getModifyRequestError,
  getModifyRequestState,
} from '../../state/application';
import { actions as appActions } from '../../state/application/action-creators';
import { RequestState } from '../../state/state-utils/request-states';

function deriveStateFromProps(props) {
  return {
    form: {
      name: '',
      repository: '',
      sharedSecret: '',
      adGroups: props.adGroups?.join(',') ?? '',
      owner: '',
      creator: '',
      machineUser: false,
      wbs: '',
      configBranch: '',
      adModeAuto: !props.adGroups,
    },
  };
}

export class ChangeAdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = deriveStateFromProps(props);

    this.makeOnChangeHandler = this.makeOnChangeHandler.bind(this);
    this.handleAdModeChange = this.handleAdModeChange.bind(this);
    this.handleFormChanged = this.handleFormChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAdModeChange({ target }) {
    this.handleFormChanged();
    this.setState((state) => ({
      form: { ...state.form, ...{ adModeAuto: target.value === 'true' } },
    }));
  }

  handleFormChanged() {
    // if there is a creation error then we will reset the creation request to clear the error
    if (this.props.modifyError) {
      this.props.modifyAppReset();
    }
  }

  handleSubmit({ preventDefault }) {
    preventDefault();
    this.props.changeAppAdmin(this.props.appName, this.state.form);
  }

  makeOnChangeHandler({ target }) {
    this.handleFormChanged();
    this.setState((state) => ({
      form: { ...state.form, ...{ [target.name]: target.value } },
    }));
  }

  componentDidUpdate(prevProps) {
    // Reset the form if the app data changes (e.g. after the refresh once the update is successful)
    const adGroupsUnequal =
      this.props.adGroups !== prevProps.adGroups &&
      (!this.props.adGroups ||
        !prevProps.adGroups ||
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
      <Accordion className="accordion" chevronPosition="right">
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.HeaderTitle>
              <Typography>Change administrators</Typography>
            </Accordion.HeaderTitle>
          </Accordion.Header>
          <Accordion.Panel>
            <form
              className="grid grid--gap-medium"
              onSubmit={this.handleSubmit}
            >
              {this.props.modifyState === RequestState.FAILURE && (
                <div>
                  <Alert type="danger">
                    Failed to change administrators. {this.props.modifyError}
                  </Alert>
                </div>
              )}
              <AppConfigAdGroups
                adGroups={this.state.form.adGroups}
                adModeAuto={this.state.form.adModeAuto}
                handleAdGroupsChange={this.makeOnChangeHandler}
                handleAdModeChange={this.handleAdModeChange}
                isDisabled={this.props.modifyState === RequestState.IN_PROGRESS}
              />
              {this.props.modifyState === RequestState.IN_PROGRESS ? (
                <div>
                  <CircularProgress size={24} /> Updating…
                </div>
              ) : (
                <div>
                  <Button color="danger" type="submit">
                    Change administrators
                  </Button>
                </div>
              )}
            </form>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  }
}

ChangeAdminForm.propTypes = {
  appName: PropTypes.string.isRequired,
  adGroups: PropTypes.arrayOf(PropTypes.string),
  changeAppAdmin: PropTypes.func.isRequired,
  modifyAppReset: PropTypes.func.isRequired,
  modifyError: PropTypes.string,
  modifyState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
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
