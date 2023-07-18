import {
  Accordion,
  Button,
  Icon,
  Typography,
  TextField,
} from '@equinor/eds-core-react';
import { warning_outlined } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Alert } from '../alert';
import { ScrimPopup } from '../scrim-popup';
import { errorToast } from '../global-top-nav/styled-toaster';
import { actions as appActions } from '../../state/application/action-creators';

import './style.css';
import { RootState } from '../../init/store';
import {
  getMemoizedApplication,
  getMemoizedApplicationMeta,
} from '../../state/application';

interface DeleteApplicationFormDispatch {
  deleteApp: (appName: string) => void;
}

interface DeleteApplicationFormState {
  deleteApplicationMeta?: {
    isDeleted?: boolean;
    error?: string;
  };
}
export interface DeleteApplicationFormProps
  extends DeleteApplicationFormDispatch,
    DeleteApplicationFormState {
  appName: string;
  readerAdGroups?: Array<string>;
}

export class DeleteApplicationForm extends Component<
  DeleteApplicationFormProps,
  { visibleScrim: boolean; inputValue: string }
> {
  static readonly propTypes: PropTypes.ValidationMap<DeleteApplicationFormProps> =
    {
      appName: PropTypes.string.isRequired,
      deleteApplicationMeta: PropTypes.shape({
        isDeleted: PropTypes.bool,
        error: PropTypes.string,
      }),
      deleteApp: PropTypes.func.isRequired,
    };

  constructor(props: DeleteApplicationFormProps) {
    super(props);
    this.state = { visibleScrim: false, inputValue: '' };

    this.doDelete = this.doDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  private doDelete(): void {
    const { appName, deleteApp } = this.props;
    deleteApp(appName);
  }

  private handleChange({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void {
    this.setState({ inputValue: value });
  }

  private handleClick(): void {
    this.setState((prevState) => ({
      visibleScrim: !prevState.visibleScrim,
      ...(prevState.visibleScrim && { inputValue: '' }),
    }));
  }
  override componentDidUpdate(prevProps: DeleteApplicationFormProps) {
    const { appName, deleteApplicationMeta } = this.props;

    if (
      prevProps.deleteApplicationMeta?.error !== deleteApplicationMeta?.error &&
      deleteApplicationMeta?.error
    ) {
      errorToast(
        `Failed to delete app ${appName}: ${deleteApplicationMeta.error}`
      );
    }
  }
  override render() {
    const { appName } = this.props;
    const { inputValue, visibleScrim } = this.state;

    return (
      <Accordion className="accordion" chevronPosition="right">
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.HeaderTitle>
              <Typography>Delete application</Typography>
            </Accordion.HeaderTitle>
          </Accordion.Header>
          <Accordion.Panel>
            <div className="grid grid--gap-medium">
              <Typography>
                Once you delete an application there is no going back
              </Typography>
              <div>
                <Button color="danger" onClick={this.handleClick}>
                  Delete application
                </Button>
              </div>
            </div>
            <ScrimPopup
              title={
                <Typography variant="h5">
                  Delete <strong>{appName}</strong>?
                </Typography>
              }
              open={visibleScrim}
              isDismissable
              onClose={this.handleClick}
            >
              <div className="delete-app-content grid grid--gap-medium">
                <Alert className="icon" type="warning">
                  <Icon data={warning_outlined} />
                  <Typography>This action can not be undone.</Typography>
                </Alert>
                <Typography>
                  You will permanently remove <strong>{appName}</strong> from
                  Radix including all its environments.
                </Typography>
                <Typography>
                  If you still want to delete this application and understand
                  the consequences, type <strong>delete</strong> in the text
                  field below.
                </Typography>
                <TextField
                  id="deleteConfirmField"
                  onChange={this.handleChange}
                  value={inputValue}
                />
                <div>
                  <Button
                    color="danger"
                    disabled={inputValue !== 'delete'}
                    onClick={this.doDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </ScrimPopup>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  }
}

function mapStateToProps(state: RootState): DeleteApplicationFormState {
  return {
    deleteApplicationMeta: { ...getMemoizedApplicationMeta(state) },
  };
}

function mapDispatchToProps(dispatch: Dispatch): DeleteApplicationFormDispatch {
  return {
    deleteApp: (appName) => dispatch(appActions.deleteAppRequest(appName)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteApplicationForm);
