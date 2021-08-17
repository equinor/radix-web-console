import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ConfigureApplicationGithub from '../configure-application-github';
import CreateApplicationForm from '../create-application-form';
import routes from '../../routes';
import {
  getCreationResult,
  getCreationState,
} from '../../state/application-creation';
import appsActions from '../../state/application-creation/action-creators';
import requestStates from '../../state/state-utils/request-states';
import { routeWithParams } from '../../utils/string';

import './style.css';

import {
  Button,
  Dialog,
  Divider,
  Icon,
  Scrim,
  Typography,
} from '@equinor/eds-core-react';

import { add, clear } from '@equinor/eds-icons';

function PageCreateApplication(state) {
  const { creationState, creationResult } = state;

  const [visibleScrim, setVisibleScrim] = useState(false);

  creationState === requestStates.SUCCESS &&
    !visibleScrim &&
    state.resetCreate();

  return (
    <>
      <Button
        variant="ghost"
        color="primary"
        className="o-heading-page-button"
        onClick={setVisibleScrim}
      >
        <Icon data={add} />
        Create new app
      </Button>
      {visibleScrim && (
        <Scrim
          onClose={() => setVisibleScrim(false)}
          isDismissable
          className="scrim"
        >
          <Dialog className="dialog-container">
            <div className="dialog__header">
              <Typography variant="h5">Create new app</Typography>
              <Button
                variant="ghost"
                className="o-heading-page-button"
                onClick={() => setVisibleScrim(false)}
              >
                <Icon data={clear} />
              </Button>
            </div>
            <div>
              <Divider />
            </div>
            <Dialog.CustomContent scrollable="true" className="dialog-content">
              {creationState !== requestStates.SUCCESS && (
                <CreateApplicationForm />
              )}
              {creationState === requestStates.SUCCESS && (
                <div className="grid grid--gap-medium">
                  <Typography>
                    The application "{creationResult.name}" has been set up
                  </Typography>
                  <ConfigureApplicationGithub
                    app={creationResult}
                    startVisible
                    useOtherCiToolOptionVisible
                  />
                  <Typography>
                    You can now go to{' '}
                    <Link
                      to={routeWithParams(routes.app, {
                        appName: creationResult.name,
                      })}
                    >
                      <Typography link as="span">
                        your application's page
                      </Typography>
                    </Link>
                  </Typography>
                </div>
              )}
            </Dialog.CustomContent>
          </Dialog>
        </Scrim>
      )}
    </>
  );
}

PageCreateApplication.propTypes = {
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  resetCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  creationState: getCreationState(state),
  creationResult: getCreationResult(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestCreate: (app) => dispatch(appsActions.addAppRequest(app)),
  resetCreate: () => dispatch(appsActions.addAppReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreateApplication);
