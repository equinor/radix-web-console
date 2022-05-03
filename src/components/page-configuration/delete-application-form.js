import {
  Accordion,
  Button,
  Icon,
  Typography,
  TextField,
} from '@equinor/eds-core-react';
import { warning_outlined } from '@equinor/eds-icons';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Alert } from '../alert';
import { ScrimPopup } from '../scrim-popup';
import { actions as appActions } from '../../state/application/action-creators';

import './style.css';

export class DeleteApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleScrim: false, inputValue: '' };
    this.doDelete = this.doDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  doDelete() {
    this.props.deleteApp(this.props.appName);
  }

  handleChange(ev) {
    this.setState({
      inputValue: ev.target.value,
    });
  }

  handleClick() {
    this.setState(
      this.state.visibleScrim
        ? { visibleScrim: false, inputValue: '' }
        : { visibleScrim: true }
    );
  }

  render() {
    return (
      <Accordion className="accordion" chevronPosition="right">
        <Accordion.Item>
          <Accordion.Header>
            <Typography>Delete application</Typography>
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
                  Delete <strong>{this.props.appName}</strong>?
                </Typography>
              }
              open={this.state.visibleScrim}
              isDismissable
              onClose={this.handleClick}
            >
              <div className="delete-app-content grid grid--gap-medium">
                <Alert className="icon" type="warning">
                  <Icon data={warning_outlined} />
                  <Typography>This action can not be undone.</Typography>
                </Alert>
                <Typography>
                  You will permanently remove{' '}
                  <strong>{this.props.appName}</strong> from Radix including all
                  its environments.
                </Typography>
                <Typography>
                  If you still want to delete this application and understand
                  the consequences, type <strong>delete</strong> in the text
                  field below.
                </Typography>
                <TextField
                  onChange={this.handleChange}
                  value={this.state.inputValue}
                />
                <div>
                  <Button
                    color="danger"
                    disabled={this.state.inputValue !== 'delete'}
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

const mapDispatchToProps = (dispatch) => ({
  deleteApp: (appName) => dispatch(appActions.deleteAppRequest(appName)),
});

export default connect(null, mapDispatchToProps)(DeleteApplicationForm);
