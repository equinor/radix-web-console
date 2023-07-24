import {
  Accordion,
  Button,
  CircularProgress,
  Typography,
  Divider,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Alert } from '../alert';
import { AppConfigAdGroups } from '../app-config-ad-groups';
import { HandleAdGroupsChangeCB } from '../graph/adGroups';
import { AppModifyProps } from '../../api/apps';
import { RootState } from '../../init/store';
import {
  getModifyRequestError,
  getModifyRequestState,
} from '../../state/application';
import { actions as appActions } from '../../state/application/action-creators';
import { RequestState } from '../../state/state-utils/request-states';

interface ChangeAdminFormState {
  modifyState: RequestState;
  modifyError?: string;
}

interface ChangeAdminFormDispatch {
  changeAppAdmin: (appName: string, form: AppModifyProps) => void;
  modifyAppReset: (appName: string) => void;
}

export interface ChangeAdminFormProps
  extends ChangeAdminFormState,
    ChangeAdminFormDispatch {
  appName: string;
  adGroups?: Array<string>;
  readerAdGroups?: Array<string>;
}

function deriveStateFromProps(props: ChangeAdminFormProps): AppModifyProps {
  return {
    appRegistrationPatchRequest: {
      applicationRegistrationPatch: {
        adGroups: props.adGroups ?? [],
        readerAdGroups: props.readerAdGroups ?? [],
      },
    },
  };
}

export class ChangeAdminForm extends Component<
  ChangeAdminFormProps,
  AppModifyProps
> {
  static readonly propTypes: PropTypes.ValidationMap<ChangeAdminFormProps> = {
    appName: PropTypes.string.isRequired,
    adGroups: PropTypes.arrayOf(PropTypes.string),
    readerAdGroups: PropTypes.arrayOf(PropTypes.string),
    modifyError: PropTypes.string,
    modifyState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
    changeAppAdmin: PropTypes.func.isRequired,
    modifyAppReset: PropTypes.func.isRequired,
  };

  constructor(props: ChangeAdminFormProps) {
    super(props);
    this.state = deriveStateFromProps(props);

    this.handleAdGroupsChange = this.handleAdGroupsChange.bind(this);
    this.handleReaderAdGroupsChange =
      this.handleReaderAdGroupsChange.bind(this);
    this.handleFormChanged = this.handleFormChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleAdGroupsChange(
    ...[value]: Parameters<HandleAdGroupsChangeCB>
  ): ReturnType<HandleAdGroupsChangeCB> {
    this.handleFormChanged();
    this.setState(({ appRegistrationPatchRequest }) => ({
      appRegistrationPatchRequest: {
        ...appRegistrationPatchRequest,
        ...{
          applicationRegistrationPatch: {
            ...appRegistrationPatchRequest.applicationRegistrationPatch,
            ...{ adGroups: value.map(({ id }) => id) },
          },
        },
      },
    }));
  }
  private handleReaderAdGroupsChange(
    ...[value]: Parameters<HandleAdGroupsChangeCB>
  ): ReturnType<HandleAdGroupsChangeCB> {
    this.handleFormChanged();
    this.setState(({ appRegistrationPatchRequest }) => ({
      appRegistrationPatchRequest: {
        ...appRegistrationPatchRequest,
        ...{
          applicationRegistrationPatch: {
            ...appRegistrationPatchRequest.applicationRegistrationPatch,
            ...{ readerAdGroups: value.map(({ id }) => id) },
          },
        },
      },
    }));
  }

  private handleFormChanged(): void {
    // if there is a creation error then we will reset the creation request to clear the error
    if (this.props.modifyError) {
      this.props.modifyAppReset(this.props.appName);
    }
  }

  private handleSubmit(ev: FormEvent<HTMLFormElement>): void {
    ev.preventDefault();
    const { appRegistrationPatchRequest } = this.state;
    this.props.changeAppAdmin(this.props.appName, {
      appRegistrationPatchRequest: appRegistrationPatchRequest,
    });
  }

  override componentDidUpdate(prevProps: Readonly<ChangeAdminFormProps>) {
    // Reset the form if the app data changes (e.g. after the refresh once the update is successful)
    const adGroupsUnequal =
      this.props.adGroups?.length !== prevProps.adGroups?.length ||
      !!this.props.adGroups?.find((val, i) => val !== prevProps.adGroups[i]);
    const readerAdGroupsUnequal =
      this.props.readerAdGroups?.length !== prevProps.readerAdGroups?.length ||
      !!this.props.readerAdGroups?.find(
        (val, i) => val !== prevProps.readerAdGroups[i]
      );

    if (adGroupsUnequal || readerAdGroupsUnequal) {
      this.setState({ ...deriveStateFromProps(this.props) });
    }
  }

  override render() {
    return (
      <Accordion className="accordion" chevronPosition="right">
        <Accordion.Item style={{ overflow: 'visible' }}>
          <Accordion.Header>
            <Accordion.HeaderTitle>
              <Typography>Access control</Typography>
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
                labeling={'Administrators'}
                adGroups={
                  this.state.appRegistrationPatchRequest
                    .applicationRegistrationPatch.adGroups
                }
                handleAdGroupsChange={this.handleAdGroupsChange}
              />
            </form>
          </Accordion.Panel>
          <Divider style={{ width: '97%' }} />
          <Accordion.Panel>
            <form
              className="grid grid--gap-medium"
              onSubmit={this.handleSubmit}
            >
              {this.props.modifyState === RequestState.FAILURE && (
                <div>
                  <Alert type="danger">
                    Failed to change readers. {this.props.modifyError}
                  </Alert>
                </div>
              )}
              <AppConfigAdGroups
                labeling={'Readers'}
                adGroups={
                  this.state.appRegistrationPatchRequest
                    .applicationRegistrationPatch.readerAdGroups
                }
                handleAdGroupsChange={this.handleReaderAdGroupsChange}
              />
              {this.props.modifyState === RequestState.IN_PROGRESS ? (
                <div>
                  <CircularProgress size={24} /> Updating…
                </div>
              ) : (
                <div>
                  <Button color="danger" type="submit">
                    Change access control
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

function mapStateToProps(state: RootState): ChangeAdminFormState {
  return {
    modifyError: getModifyRequestError(state),
    modifyState: getModifyRequestState(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): ChangeAdminFormDispatch {
  return {
    changeAppAdmin: (appName, form) =>
      dispatch(appActions.changeAppAdmin(appName, form)),
    modifyAppReset: (appName) => dispatch(appActions.modifyAppReset(appName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAdminForm);
