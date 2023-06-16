import {
  Button,
  Checkbox,
  CircularProgress,
  Icon,
  List,
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
import {
  AppConfigConfigurationItem,
  OnConfigurationItemChangeCallback,
} from '../app-config-ci';
import { HandleAdGroupsChangeCB } from '../graph/adGroups';
import { AppCreateProps } from '../../api/apps';
import { externalUrls } from '../../externalUrls';
import { RootState } from '../../init/store';
import { ApplicationRegistrationModel } from '../../models/radix-api/applications/application-registration';
import {
  ApplicationRegistrationUpsertResponseModelValidationMap,
  ApplicationRegistrationUpsertResponseModel,
} from '../../models/radix-api/applications/application-registration-upsert-response';
import {
  getCreationError,
  getCreationState,
  getCreationResult,
} from '../../state/application-creation';
import { actions as appsActions } from '../../state/application-creation/action-creators';
import { RequestState } from '../../state/state-utils/request-states';

interface CreateApplicationFormState {
  creationState: RequestState;
  creationError?: string;
  creationResponse?: ApplicationRegistrationUpsertResponseModel;
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
      creationResponse: PropTypes.shape(
        ApplicationRegistrationUpsertResponseModelValidationMap
      ),
    };

  constructor(props: CreateApplicationFormProps) {
    super(props);
    this.state = {
      appRegistrationRequest: {
        applicationRegistration: {
          name: '',
          repository: '',
          sharedSecret: '',
          adGroups: [],
          readerAdGroups: [],
          owner: '',
          creator: '',
          machineUser: false,
          wbs: '',
          configBranch: '',
          radixConfigFullName: 'radixconfig.yaml',
        },
        acknowledgeWarnings: false,
      },
    };

    this.handleAdGroupsChange = this.handleAdGroupsChange.bind(this);
    this.handleReaderAdGroupsChange =
      this.handleReaderAdGroupsChange.bind(this);
    this.handleConfigurationItemChange =
      this.handleConfigurationItemChange.bind(this);
    this.handleAppRegistrationChange =
      this.handleAppRegistrationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAcknowledgeWarnings = this.handleAcknowledgeWarnings.bind(this);
  }

  private handleAdGroupsChange(
    ...[value]: Parameters<HandleAdGroupsChangeCB>
  ): ReturnType<HandleAdGroupsChangeCB> {
    this.setState(({ appRegistrationRequest }) => ({
      appRegistrationRequest: {
        ...appRegistrationRequest,
        applicationRegistration: {
          ...appRegistrationRequest.applicationRegistration,
          adGroups: value.map(({ id }) => id),
        },
      },
    }));
  }

  private handleReaderAdGroupsChange(
    ...[value]: Parameters<HandleAdGroupsChangeCB>
  ): ReturnType<HandleAdGroupsChangeCB> {
    this.setState(({ appRegistrationRequest }) => ({
      appRegistrationRequest: {
        ...appRegistrationRequest,
        applicationRegistration: {
          ...appRegistrationRequest.applicationRegistration,
          readerAdGroups: value.map(({ id }) => id),
        },
      },
    }));
  }
  private handleConfigurationItemChange(
    ...[value]: Parameters<OnConfigurationItemChangeCallback>
  ): ReturnType<OnConfigurationItemChangeCallback> {
    this.setState(({ appRegistrationRequest }) => ({
      appRegistrationRequest: {
        ...appRegistrationRequest,
        applicationRegistration: {
          ...appRegistrationRequest.applicationRegistration,
          configurationItem: value?.id,
        },
      },
    }));
  }

  private handleAppRegistrationChange({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void {
    const key = name as keyof ApplicationRegistrationModel;
    this.setState(({ appRegistrationRequest }) => ({
      appRegistrationRequest: {
        ...appRegistrationRequest,
        applicationRegistration: {
          ...appRegistrationRequest.applicationRegistration,
          [key]: key === 'name' ? sanitizeName(value) : value,
        },
      },
    }));
  }

  private handleSubmit(ev: FormEvent<HTMLFormElement>): void {
    ev.preventDefault();
    const { appRegistrationRequest } = this.state;
    this.props.requestCreate({
      appRegistrationRequest: appRegistrationRequest,
    });
  }

  private handleAcknowledgeWarnings(): void {
    this.setState(({ appRegistrationRequest }) => ({
      appRegistrationRequest: {
        ...appRegistrationRequest,
        acknowledgeWarnings: !appRegistrationRequest.acknowledgeWarnings,
      },
    }));
  }

  override render() {
    const { acknowledgeWarnings, applicationRegistration } =
      this.state.appRegistrationRequest;

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
            value={applicationRegistration.name}
            onChange={this.handleAppRegistrationChange}
          />
          <TextField
            id="repository_field"
            label="GitHub repository"
            helperText="Full URL, e.g. 'https://github.com/equinor/my-app'"
            name="repository"
            value={applicationRegistration.repository}
            onChange={this.handleAppRegistrationChange}
          />
          <TextField
            id="configbranch_field"
            label="Config Branch"
            helperText="The name of the branch where Radix will read the radixconfig.yaml from, e.g. 'main' or 'master'"
            name="configBranch"
            value={applicationRegistration.configBranch}
            onChange={this.handleAppRegistrationChange}
          />
          <TextField
            id="radixconfig_file_field"
            label="Config file"
            helperText="The name and optionally the path of the Radix config file. By default it is radixconfig.yaml, located in the repository root folder of the config branch"
            name="radixConfigFullName"
            value={applicationRegistration.radixConfigFullName}
            onChange={this.handleAppRegistrationChange}
          />
          <AppConfigConfigurationItem
            configurationItemChangeCallback={this.handleConfigurationItemChange}
          />
          <AppConfigAdGroups
            labeling="Administrators"
            adGroups={applicationRegistration.adGroups}
            handleAdGroupsChange={this.handleAdGroupsChange}
          />
          <AppConfigAdGroups
            labeling="Readers"
            adGroups={applicationRegistration.readerAdGroups}
            handleAdGroupsChange={this.handleAdGroupsChange}
          />
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
            {this.props.creationState === RequestState.SUCCESS &&
              this.props.creationResponse.warnings && (
                <div className="grid grid--gap-medium">
                  <List>
                    {this.props.creationResponse.warnings?.map((message, i) => (
                      <List.Item key={i}>
                        <Alert type="warning">{message}</Alert>
                      </List.Item>
                    ))}
                  </List>
                  <Checkbox
                    label="Proceed with warnings"
                    name="acknowledgeWarnings"
                    checked={acknowledgeWarnings}
                    onChange={this.handleAcknowledgeWarnings}
                  />
                </div>
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
    creationResponse: getCreationResult(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): CreateApplicationFormDispatch {
  return { requestCreate: (form) => dispatch(appsActions.addAppRequest(form)) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateApplicationForm);
