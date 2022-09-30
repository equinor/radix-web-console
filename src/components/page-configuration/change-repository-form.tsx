import {
  Accordion,
  Button,
  Checkbox,
  CircularProgress,
  List,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, Component, FormEvent } from 'react';

import { actions as appActions } from '../../state/application/action-creators';
import {
  getModifyRequestError,
  getModifyRequestState,
  getModifyRequestResult,
} from '../../state/application';

import { Alert } from '../alert';
import {
  ApplicationRegistrationPatchModel,
  ApplicationRegistrationPatchModelValidationMap,
} from '../../models/application-registration-patch';
import { RequestState } from '../../state/state-utils/request-states';
import { AppModifyProps } from '../../api/apps';
import { RootState } from '../../init/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  ApplicationRegistrationUpsertRespondModel,
  ApplicationRegistrationUpsertRespondModelValidationMap,
} from '../../models/application-registration-upsert-respond';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;

interface ChangeRepositoryFormState {
  modifyState: RequestState;
  modifyError?: string;
  modifyRespond?: ApplicationRegistrationUpsertRespondModel;
}

interface ChangeRepositoryFormDispatch {
  changeRepository: (appName: string, form: AppModifyProps) => void;
  modifyAppReset: (appName: string) => void;
}

export interface ChangeRepositoryFormProps
  extends ChangeRepositoryFormState,
    ChangeRepositoryFormDispatch {
  appName: string;
  repository: string;
  acknowledgeWarnings?: boolean;
  app: ApplicationRegistrationPatchModel;
}

function deriveStateFromProps(
  props: ChangeRepositoryFormProps
): AppModifyProps {
  return {
    adModeAuto: false,
    appRegistrationPatchRequest: {
      applicationRegistrationPatch: {
        repository: props.repository,
      },
      acknowledgeWarnings: props.acknowledgeWarnings,
    },
  };
}
export class ChangeRepositoryForm extends Component<
  ChangeRepositoryFormProps,
  AppModifyProps
> {
  static readonly propTypes: PropTypes.ValidationMap<ChangeRepositoryFormProps> =
    {
      appName: PropTypes.string.isRequired,
      repository: PropTypes.string.isRequired,
      acknowledgeWarnings: PropTypes.bool,
      app: PropTypes.shape(ApplicationRegistrationPatchModelValidationMap)
        .isRequired,
      modifyError: PropTypes.string,
      modifyState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
      modifyRespond: PropTypes.shape(
        ApplicationRegistrationUpsertRespondModelValidationMap
      ),
      changeRepository: PropTypes.func.isRequired,
      modifyAppReset: PropTypes.func.isRequired,
    };

  constructor(props: ChangeRepositoryFormProps) {
    super(props);
    this.state = deriveStateFromProps(props);

    this.handleAcknowledgeWarningsChange =
      this.handleAcknowledgeWarningsChange.bind(this);
    this.handleRepositoryChange = this.handleRepositoryChange.bind(this);
    this.handleFormChanged = this.handleFormChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*
  const app = props.app;
  const [currentRepository, setCurrentRepository] = useState(props.repository);
  const [editedRepository, setEditedRepository] = useState(props.repository);
  const [useAcknowledgeWarnings, setAcknowledgeWarnings] = useState(false);
  const [this.props.modifyState, saveFunc, resetState] = useSaveRepository(
    props.appName,
    useAcknowledgeWarnings
  );
   */
  // const applicationRegistration =
  //   this.props.modifyState.data?.applicationRegistration ?? undefined;
  // const operationWarnings = this.props.modifyState.data?.warnings ?? undefined;
  // const [updateRepositoryProgress, setUpdateRepositoryProgress] =
  //   useState(false);
  // const webhookURL = `https://webhook.${radixZoneDNS}/events/github?appName=${props.appName}`;
  //
  // useEffect(() => {
  //   setEditedRepository(currentRepository);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentRepository]);

  // const handleSubmit = (ev) => {
  //     ev.preventDefault();
  //     setUpdateRepositoryProgress(true);
  //     saveFunc(editedRepository);
  //   };
  //
  //   const setEditedRepositoryAndResetSaveState = (repository) => {
  //     if (this.props.modifyState !== RequestState.IDLE) {
  //       resetState();
  //     }
  //     setEditedRepository(repository);
  //   };
  //
  //   useEffect(() => {
  //     if (this.props.modifyState !== RequestState.IN_PROGRESS) {
  //       setUpdateRepositoryProgress(false);
  //       setAcknowledgeWarnings(false);
  //     }
  //     if (
  //       this.props.modifyState === RequestState.SUCCESS &&
  //       applicationRegistration &&
  //       !operationWarnings
  //     ) {
  //       setCurrentRepository(applicationRegistration.repository);
  //     }
  //   }, [this.props.modifyState, applicationRegistration, operationWarnings]);

  private handleRepositoryChange({
    target,
  }: ChangeEvent<HTMLInputElement>): void {
    this.handleFormChanged();
    this.setState(({ appRegistrationPatchRequest }) => ({
      appRegistrationPatchRequest: {
        ...appRegistrationPatchRequest,
        ...{
          applicationRegistrationPatch: {
            ...appRegistrationPatchRequest.applicationRegistrationPatch,
            ...{
              repository: target.value,
            },
          },
        },
      },
    }));
  }

  private handleSubmit(ev: FormEvent<HTMLFormElement>): void {
    ev.preventDefault();
    const { appRegistrationPatchRequest } = this.state;
    this.props.changeRepository(this.props.appName, {
      adModeAuto: false,
      appRegistrationPatchRequest: appRegistrationPatchRequest,
    });
  }

  private handleAcknowledgeWarningsChange(): void {
    this.handleFormChanged();
    this.setState(({ appRegistrationPatchRequest }) => ({
      appRegistrationPatchRequest: {
        ...appRegistrationPatchRequest,
        ...{
          acknowledgeWarnings: !appRegistrationPatchRequest.acknowledgeWarnings,
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

  override componentDidUpdate(prevProps: Readonly<ChangeRepositoryFormProps>) {
    // Reset the form if the app data changes (e.g. after the refresh once the update is successful)
    if (this.props.repository !== prevProps.repository) {
      this.setState(deriveStateFromProps(this.props));
    }
  }
  override render() {
    return (
      <Accordion className="accordion" chevronPosition="right">
        <Accordion.Item>
          <Accordion.Header>
            <Typography>Change GitHub repository</Typography>
          </Accordion.Header>
          <Accordion.Panel>
            <div className="grid grid--gap-medium">
              <form
                className="grid grid--gap-medium"
                onSubmit={this.handleSubmit}
              >
                {this.props.modifyState === RequestState.FAILURE && (
                  <div>
                    <Alert type="danger">
                      Failed to change repository. {this.props.modifyError}
                    </Alert>
                  </div>
                )}
                <TextField
                  id="githubUrlField"
                  disabled={this.props.modifyState === RequestState.IN_PROGRESS}
                  type="url"
                  value={
                    this.state.appRegistrationPatchRequest
                      .applicationRegistrationPatch.repository
                  }
                  onChange={this.handleRepositoryChange}
                  label="URL"
                  helperText="e.g. 'https://github.com/equinor/my-app'"
                />
                {this.props.modifyState === RequestState.IN_PROGRESS && (
                  <div>
                    <CircularProgress size={24} /> Updating…
                  </div>
                )}
                {this.props.modifyState === RequestState.SUCCESS && (
                  /*this.props.modifyState. operationWarnings && */ <div className="grid grid--gap-medium">
                    <List>
                      <List.Item key={1}>warning</List.Item>

                      {/*{operationWarnings?.map((message, i) => {*/}
                      {/*  return (*/}
                      {/*    <List.Item key={i}>*/}
                      {/*      <Alert type="warning">{message}</Alert>*/}
                      {/*    </List.Item>*/}
                      {/*  );*/}
                      {/*})}*/}
                    </List>
                    <Checkbox
                      label="Proceed with warnings"
                      name="acknowledgeWarnings"
                      // checked={useAcknowledgeWarnings}
                      onChange={this.handleAcknowledgeWarningsChange}
                    />
                  </div>
                )}
                {this.props.modifyState !== RequestState.IN_PROGRESS && (
                  <div>
                    <Button
                      color="danger"
                      type="submit"
                      // disabled={
                      // currentRepository === editedRepository ||
                      // editedRepository.length < 5 ||
                      // (operationWarnings && !useAcknowledgeWarnings)
                      //}
                    >
                      Change repository
                    </Button>
                  </div>
                )}
              </form>
              {/*              {applicationRegistration &&
                !operationWarnings &&
                !(
                  updateRepositoryProgress ||
                  this.props.modifyState === RequestState.IN_PROGRESS
                ) && (
                  <>
                    <Typography variant="body_short_bold">
                      Move the Deploy Key to the new repository
                    </Typography>
                    <div className="o-body-text grid grid--gap-medium">
                      <List variant="numbered">
                        <List.Item>
                          Open the{' '}
                          <Typography
                            link
                            href={`${currentRepository}/settings/keys`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Deploy Key page
                          </Typography>{' '}
                          to delete the Deploy Key from the previous repository
                        </List.Item>
                        <List.Item>
                          Open the{' '}
                          <Typography
                            link
                            href={`${currentRepository}/settings/keys/new`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Add New Deploy Key
                          </Typography>{' '}
                          and follow the steps below
                        </List.Item>
                      </List>
                      <img
                        alt="'Add deploy key' steps on GitHub"
                        src={imageDeployKey}
                        srcSet={`${imageDeployKey} 2x`}
                      />
                      <List variant="numbered" start="3">
                        <List.Item>
                          Give the key a name, e.g. "Radix deploy key"
                        </List.Item>
                        <List.Item>Copy and paste this key:</List.Item>
                      </List>
                      <Code copy>{app.publicKey}</Code>
                      <List variant="numbered" start="5">
                        <List.Item>Press "Add key"</List.Item>
                      </List>
                    </div>
                    <Typography variant="body_short_bold">
                      Move the Webhook to the new repository
                    </Typography>
                    <div className="o-body-text">
                      <List variant="numbered" start="6">
                        <List.Item>
                          Open the{' '}
                          <Typography
                            link
                            href={`${currentRepository}/settings/hooks`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Webhook page
                          </Typography>{' '}
                          of the previous repository and delete the existing
                          Webhook
                        </List.Item>
                        <List.Item>
                          Open the{' '}
                          <Typography
                            link
                            href={`${app.repository}/settings/hooks/new`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Add Webhook page
                          </Typography>{' '}
                          and follow the steps below
                        </List.Item>
                      </List>
                      <img
                        alt="'Add webhook' steps on GitHub"
                        src={imageWebhook}
                        srcSet={`${imageWebhook} 2x`}
                      />
                      <List variant="numbered" start="8">
                        <List.Item>
                          As Payload URL, use <code>{webhookURL}</code>{' '}
                          <Button
                            variant="ghost"
                            onClick={() => copyToClipboard(webhookURL)}
                          >
                            <Icon data={copy} size={24} /> Copy
                          </Button>
                        </List.Item>
                        <List.Item>
                          Choose <code>application/json</code> as Content type
                        </List.Item>
                        <List.Item>
                          The Shared Secret for this application is{' '}
                          <code>{app.sharedSecret}</code>{' '}
                          <Button
                            variant="ghost"
                            onClick={() => copyToClipboard(app.sharedSecret)}
                          >
                            <Icon data={copy} size={24} /> Copy
                          </Button>
                        </List.Item>
                        <List.Item>Press "Add webhook"</List.Item>
                      </List>
                    </div>
                  </>
                )}*/}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  }
}

function mapStateToProps(state: RootState): ChangeRepositoryFormState {
  return {
    modifyError: getModifyRequestError(state),
    modifyState: getModifyRequestState(state),
    modifyRespond: getModifyRequestResult(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): ChangeRepositoryFormDispatch {
  return {
    changeRepository: (appName, form) => {
      dispatch(appActions.changeRepository(appName, form));
    },
    modifyAppReset: (appName) => dispatch(appActions.modifyAppReset(appName)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeRepositoryForm);
