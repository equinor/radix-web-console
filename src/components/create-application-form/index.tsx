import {
  Button,
  CircularProgress,
  Icon,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { ChangeEvent, Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Alert } from '../alert';
import { AppConfigAdGroups } from '../app-config-ad-groups';
import { HandleAdGroupsChangeCB } from '../graph/adGroups';
import { AppCreateProps } from '../../api/apps';
import { externalUrls } from '../../externalUrls';
import { RootState } from '../../init/store';
import { ApplicationRegistrationModel } from '../../models/application-registration';
import {
  getCreationError,
  getCreationState,
} from '../../state/application-creation';
import { actions as appsActions } from '../../state/application-creation/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import {
  AppConfigConfigurationItem,
  OnConfigurationItemChangeCallback,
} from '../app-config-ci';

interface CreateApplicationFormState {
  creationState: RequestState;
  creationError?: string;
}

interface CreateApplicationFormDispatch {
  requestCreate: (form: AppCreateProps) => void;
}

export interface CreateApplicationFormProps
  extends CreateApplicationFormState,
    CreateApplicationFormDispatch {}

function sanitizeName(name: string): string {
  // force name to lowercase, no spaces
  return name?.toLowerCase().replace(/[^a-z0-9]/g, '-') ?? '';
}

export class CreateApplicationForm extends Component<
  CreateApplicationFormProps,
  AppCreateProps
> {
  static readonly propTypes: PropTypes.ValidationMap<CreateApplicationFormProps> =
    {
      creationState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
      requestCreate: PropTypes.func.isRequired,
      creationError: PropTypes.string,
    };

  constructor(props: CreateApplicationFormProps) {
    super(props);
    this.state = {
      adModeAuto: false,
      appRegistration: {
        name: '',
        repository: '',
        sharedSecret: '',
        adGroups: [],
        owner: '',
        creator: '',
        machineUser: false,
        wbs: '',
        configBranch: '',
      },
    };

    this.handleAdGroupsChange = this.handleAdGroupsChange.bind(this);
    this.handleAdModeChange = this.handleAdModeChange.bind(this);
    this.handleConfigurationItemChange =
      this.handleConfigurationItemChange.bind(this);
    this.handleAppRegistrationChange =
      this.handleAppRegistrationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleAdGroupsChange(
    ...[value]: Parameters<HandleAdGroupsChangeCB>
  ): ReturnType<HandleAdGroupsChangeCB> {
    this.setState(({ appRegistration }) => ({
      appRegistration: {
        ...appRegistration,
        ...{ adGroups: value.map(({ id }) => id) },
      },
    }));
  }

  private handleConfigurationItemChange(
    ...[value]: Parameters<OnConfigurationItemChangeCallback>
  ): ReturnType<OnConfigurationItemChangeCallback> {
    this.setState(({ appRegistration }) => ({
      appRegistration: {
        ...appRegistration,
        configurationItem: value.id,
      },
    }));
  }

  private handleAdModeChange({ target }: ChangeEvent<HTMLInputElement>): void {
    this.setState({ adModeAuto: target.value === 'true' });
  }

  private handleAppRegistrationChange({
    target,
  }: ChangeEvent<HTMLInputElement>): void {
    const key = target.name as keyof ApplicationRegistrationModel;
    const value = key === 'name' ? sanitizeName(target.value) : target.value;

    this.setState(({ appRegistration }) => ({
      appRegistration: { ...appRegistration, ...{ [key]: value } },
    }));
  }

  private handleSubmit(ev: FormEvent<HTMLFormElement>): void {
    ev.preventDefault();
    const { adModeAuto, appRegistration } = this.state;
    this.props.requestCreate({
      adModeAuto: adModeAuto,
      appRegistration: appRegistration,
    });
  }

  override render() {
    return (
      <form onSubmit={this.handleSubmit} className="grid grid--gap-medium">
        <Alert className="icon">
          <Icon data={info_circle} color="primary" />
          <div>
            <Typography>
              Your application needs a GitHub repository with a radixconfig.yaml
              file and a Dockerfile.
            </Typography>
            <Typography>
              You can read about{' '}
              <Typography
                link
                href={externalUrls.referenceRadixConfig}
                rel="noopener noreferrer"
                target="_blank"
              >
                radixconfig.yaml
              </Typography>{' '}
              and{' '}
              <Typography
                link
                href={externalUrls.guideDockerfileComponent}
                rel="noopener noreferrer"
                target="_blank"
              >
                Dockerfile best practices
              </Typography>
              .
            </Typography>
            <Typography>
              Need help? Get in touch on our{' '}
              <Typography
                link
                href={externalUrls.slackRadixSupport}
                rel="noopener noreferrer"
                target="_blank"
              >
                Slack support channel
              </Typography>
            </Typography>
          </div>
        </Alert>
        <fieldset
          disabled={this.props.creationState === RequestState.IN_PROGRESS}
          className="grid grid--gap-medium"
        >
          <TextField
            id="name_field"
            label="Name"
            helperText="Lower case; no spaces or special characters"
            name="name"
            value={this.state.appRegistration.name}
            onChange={this.handleAppRegistrationChange}
          />
          <TextField
            id="repository_field"
            label="GitHub repository"
            helperText="Full URL, e.g. 'https://github.com/equinor/my-app'"
            name="repository"
            value={this.state.appRegistration.repository}
            onChange={this.handleAppRegistrationChange}
          />
          <TextField
            id="configbranch_field"
            label="Config Branch"
            helperText="The name of the branch where Radix will read the radixconfig.yaml from, e.g. 'main' or 'master'"
            name="configBranch"
            value={this.state.appRegistration.configBranch}
            onChange={this.handleAppRegistrationChange}
          />
          <TextField
            id="owner_field"
            label="Owner"
            type="email"
            helperText="Owner of the application (email). Can be a single person or shared group email"
            name="owner"
            value={this.state.appRegistration.owner}
            onChange={this.handleAppRegistrationChange}
          />
          <AppConfigAdGroups
            adGroups={this.state.appRegistration.adGroups}
            adModeAuto={this.state.adModeAuto}
            handleAdGroupsChange={this.handleAdGroupsChange}
            handleAdModeChange={this.handleAdModeChange}
          />
          <TextField
            id="wbs_field"
            label="WBS"
            helperText="WBS of the application for cost allocation"
            name="wbs"
            value={this.state.appRegistration.wbs}
            onChange={this.handleAppRegistrationChange}
          />
          <AppConfigConfigurationItem
            configurationItemChangeCallback={this.handleConfigurationItemChange}
          ></AppConfigConfigurationItem>
          {this.props.creationState === RequestState.FAILURE && (
            <Alert type="danger">
              Failed to create application. {this.props.creationError}
            </Alert>
          )}
          <div className="o-action-bar grid grid--gap-medium">
            {this.props.creationState === RequestState.IN_PROGRESS && (
              <Typography>
                <CircularProgress size={24} /> Creating…
              </Typography>
            )}
            <div>
              <Button color="primary" type="submit">
                Create new app
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

function mapStateToProps(state: RootState): CreateApplicationFormState {
  return {
    creationState: getCreationState(state),
    creationError: getCreationError(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): CreateApplicationFormDispatch {
  return { requestCreate: (form) => dispatch(appsActions.addAppRequest(form)) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateApplicationForm);
