import {
  Accordion,
  Button,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Alert } from '../alert';
import { AppConfigAdGroups } from '../app-config-ad-groups';
import { HandleAdGroupsChangeCB } from '../graph/adGroups';
import { AppCreateProps } from '../../api/apps';
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
  changeAppAdmin: (appName: string, form: AppCreateProps) => void;
  modifyAppReset: (appName: string) => void;
}

export interface ChangeAdminFormProps
  extends ChangeAdminFormState,
    ChangeAdminFormDispatch {
  appName: string;
  adGroups?: Array<string>;
  adModeAuto?: boolean;
}

function deriveStateFromProps(props: ChangeAdminFormProps): AppCreateProps {
  return {
    adModeAuto: !props.adGroups,
    appRegistration: {
      name: '',
      repository: '',
      sharedSecret: '',
      adGroups: props.adGroups ?? [],
      owner: '',
      creator: '',
      machineUser: false,
      wbs: '',
      configBranch: '',
    },
  };
}

export class ChangeAdminForm extends Component<
  ChangeAdminFormProps,
  AppCreateProps
> {
  static readonly propTypes: PropTypes.ValidationMap<ChangeAdminFormProps> = {
    appName: PropTypes.string.isRequired,
    adGroups: PropTypes.arrayOf(PropTypes.string),
    adModeAuto: PropTypes.bool,
    modifyError: PropTypes.string,
    modifyState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
    changeAppAdmin: PropTypes.func.isRequired,
    modifyAppReset: PropTypes.func.isRequired,
  };

  constructor(props: ChangeAdminFormProps) {
    super(props);
    this.state = deriveStateFromProps(props);

    this.handleAdGroupsChange = this.handleAdGroupsChange.bind(this);
    this.handleAdModeChange = this.handleAdModeChange.bind(this);
    this.handleFormChanged = this.handleFormChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAdGroupsChange(
    ...[value]: Parameters<HandleAdGroupsChangeCB>
  ): ReturnType<HandleAdGroupsChangeCB> {
    this.setState(({ appRegistration }) => ({
      appRegistration: {
        ...appRegistration,
        ...{ adGroups: value.map(({ id }) => id) },
      },
    }));
  }

  handleAdModeChange({ target }: ChangeEvent<HTMLInputElement>): void {
    this.handleFormChanged();
    this.setState({ adModeAuto: target.value === 'true' });
  }

  handleFormChanged(): void {
    // if there is a creation error then we will reset the creation request to clear the error
    if (this.props.modifyError) {
      this.props.modifyAppReset(this.props.appName);
    }
  }

  handleSubmit(ev: FormEvent): void {
    ev.preventDefault();
    const { adModeAuto, appRegistration } = this.state;
    this.props.changeAppAdmin(this.props.appName, {
      adModeAuto: adModeAuto,
      appRegistration: appRegistration,
    });
  }

  override componentDidUpdate(prevProps: Readonly<ChangeAdminFormProps>) {
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

  override render() {
    return (
      <Accordion className="accordion" chevronPosition="right">
        <Accordion.Item
          style={{
            overflow: 'visible',
          }}
        >
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
                adGroups={this.state.appRegistration.adGroups}
                adModeAuto={this.state.adModeAuto}
                handleAdGroupsChange={this.handleAdGroupsChange}
                handleAdModeChange={this.handleAdModeChange}
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
