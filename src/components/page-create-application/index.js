import {
  Button,
  Divider,
  Icon,
  Scrim,
  Typography,
} from '@equinor/eds-core-react';
import { add, clear } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CreateApplicationForm from '../create-application-form';
import { ConfigureApplicationGithub } from '../configure-application-github';
import { routes } from '../../routes';
import {
  getCreationResult,
  getCreationState,
} from '../../state/application-creation';
import { actions as appsActions } from '../../state/application-creation/action-creators';
import { addLastKnownApp } from '../../state/applications-lastknown';
import { RequestState } from '../../state/state-utils/request-states';
import { routeWithParams } from '../../utils/string';

import './style.css';

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
      case RequestState.FAILURE:
        scollToBottom(formScrollContainer.current);
        break;
      case RequestState.SUCCESS:
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
        className="o-heading-page-button"
        variant="ghost"
        color="primary"
        onClick={() => setVisibleScrim(true)}
      >
        <Icon data={add} />
        Create new app
      </Button>
      <Scrim open={visibleScrim}>
        <div className="dialog-container">
          <div className="dialog-header">
            <Typography variant="h5">Create new app</Typography>
            <Button variant="ghost" onClick={() => setVisibleScrim(false)}>
              <Icon data={clear} />
            </Button>
          </div>
          <div>
            <Divider />
          </div>
          <div className="dialog-content" ref={formScrollContainer}>
            {creationState !== RequestState.SUCCESS ? (
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
        </div>
      </Scrim>
    </>
  );
}

PageCreateApplication.propTypes = {
  creationState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
  resetCreate: PropTypes.func.isRequired,
  addLastKnownAppName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  creationState: getCreationState(state),
  creationResult: getCreationResult(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetCreate: () => dispatch(appsActions.addAppReset()),
  addLastKnownAppName: (name) => dispatch(addLastKnownApp(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreateApplication);
