import { connect } from 'react-redux';
import React from 'react';

import appActions from '../../state/application/action-creators';

import { Accordion, Button, Scrim, Input, Icon } from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';

export class DeleteApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleScrim: false,
    };
    this.doDelete = this.doDelete.bind(this);
    this.handleInputDelete = this.handleInputDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  doDelete() {
    this.props.deleteApp(this.props.appName);
  }

  handleInputDelete(ev) {
    this.setState({
      inputDelete: ev.target.value,
    });
  }

  handleClick() {
    if (this.state.visibleScrim) {
      this.setState({
        inputDelete: '',
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
      <Accordion chevronPosition="right" headerLevel="p">
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
                  Delete app
                </Button>
              </div>
            </div>
            {this.state.visibleScrim && (
              <Scrim onClose={this.handleClick} isDismissable className="scrim">
                <div className="delete-app">
                  <div className="header-actions">
                    <h6>Delete application</h6>
                    <Button variant="ghost_icon" onClick={this.handleClick}>
                      <Icon data={clear} />
                    </Button>
                  </div>
                  <div className="container">
                    <p className="body_short">
                      This action can not be undone. You will permanently remove
                      application-name from Radix including all its environment.
                    </p>
                    <p className="body_short">
                      If you still want to delete this application and
                      understand the consequences, type <strong>delete</strong>{' '}
                      in the text field under.
                    </p>
                    <Input
                      type="text"
                      onChange={this.handleInputDelete}
                      value={this.state.inputDelete}
                    />
                    <Button
                      color="danger"
                      disabled={this.state.inputDelete !== 'delete'}
                      onClick={this.doDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Scrim>
            )}
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
