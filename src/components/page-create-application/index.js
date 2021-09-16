import PropTypes from 'prop-types';
import { React, useEffect, useRef, useState } from 'react';
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
import lastKnowAppsActions from '../../state/applications-lastknown/action-creators';
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

const scollToTop = (elementRef) => {
  if (elementRef && elementRef.scrollTo) {
    elementRef.scrollTo(0, 0);
  }
};

const scollToBottom = (elementRef) => {
  // HACK elementRef.scrollHeight is incorrect when called directly
  // the callback in setTimeout is scheduled as a task to run after
  // PageCreateApplication has rendered DOM... it seems
  setTimeout(() => {
    if (elementRef && elementRef.scrollTo) {
      elementRef.scrollTo(0, elementRef.scrollHeight);
    }
  }, 0);
};

function PageCreateApplication({
  creationState,
  creationResult,
  resetCreate,
  addLastKnownAppName,
}) {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const formScrollContainer = useRef();

  useEffect(() => {
    if (!visibleScrim) {
      resetCreate();
    }
  }, [resetCreate, visibleScrim]);

  useEffect(() => {
    if (!visibleScrim) {
      return;
    }

    switch (creationState) {
      case requestStates.FAILURE:
        scollToBottom(formScrollContainer.current);
        break;
      case requestStates.SUCCESS:
        addLastKnownAppName(creationResult.name);
        scollToTop(formScrollContainer.current);
        break;
      default:
        break;
    }
  }, [creationState, creationResult, addLastKnownAppName, visibleScrim]);

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
            <div className="dialog-content" ref={formScrollContainer}>
              {creationState !== requestStates.SUCCESS ? (
                <CreateApplicationForm />
              ) : (
                <div className="grid grid--gap-medium">
                  <Typography>
                    The application <strong>{creationResult.name}</strong> has
                    been set up
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
            </div>
          </Dialog>
        </Scrim>
      )}
    </>
  );
}

PageCreateApplication.propTypes = {
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  resetCreate: PropTypes.func.isRequired,
  addLastKnownAppName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  creationState: getCreationState(state),
  creationResult: getCreationResult(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetCreate: () => dispatch(appsActions.addAppReset()),
  addLastKnownAppName: (name) =>
    dispatch(lastKnowAppsActions.addLastKnownApplicationName(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreateApplication);
