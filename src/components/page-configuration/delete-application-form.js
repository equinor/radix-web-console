import { connect } from 'react-redux';
import React from 'react';

import appActions from '../../state/application/action-creators';
import Alert from '../alert';

import {
  Accordion,
  Button,
  Scrim,
  Icon,
  Typography,
  TextField,
} from '@equinor/eds-core-react';
import { clear, warning_outlined } from '@equinor/eds-icons';

export class DeleteApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleScrim: false,
      inputValue: '',
    };
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
    if (this.state.visibleScrim) {
      this.setState({
        inputValue: '',
        visibleScrim: false,
      });
    } else {
      this.setState({
        visibleScrim: true,
      });
    }
  }

  render() {
    return (
      <Accordion.Item className="accordion__item">
        <Accordion.Header className="accordion__header body_short">
          Delete application
        </Accordion.Header>
        <Accordion.Panel className="accordion__panel">
          <div className="accordion__content">
            <p className="body_short">
              Once you delete an application there is no going back
            </p>
            <div className="o-action-bar">
              <Button color="danger" onClick={this.handleClick}>
                Delete application
              </Button>
            </div>
          </div>
          {this.state.visibleScrim && (
            <Scrim onClose={this.handleClick} isDismissable className="scrim">
              <div className="delete-app">
                <div className="header-actions">
                  <Typography group="ui" variant="accordion_header">
                    Delete {this.props.appName}
                  </Typography>
                  <Button variant="ghost_icon" onClick={this.handleClick}>
                    <Icon data={clear} />
                  </Button>
                </div>
                <div className="accordion__content">
                  <Alert type="warning" className="icon">
                    <Icon data={warning_outlined} />
                    <Typography>This action can not be undone.</Typography>
                  </Alert>
                  <Typography>
                    You will permanently remove{' '}
                    <strong>{this.props.appName}</strong> from Radix including
                    all its environments.
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
              </div>
            </Scrim>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteApp: (appName) => dispatch(appActions.deleteAppRequest(appName)),
});

export default connect(null, mapDispatchToProps)(DeleteApplicationForm);
