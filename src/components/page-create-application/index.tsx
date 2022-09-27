import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import CreateApplicationForm from '../create-application-form';
import { ConfigureApplicationGithub } from '../configure-application-github';
import { ScrimPopup } from '../scrim-popup';
import { RootState } from '../../init/store';
import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../../models/application-registration';
import { routes } from '../../routes';
import {
  getCreationResult,
  getCreationState,
} from '../../state/application-creation';
import { actions as appsActions } from '../../state/application-creation/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import { routeWithParams } from '../../utils/string';

import './style.css';

interface PageCreateApplicationState {
  creationState: RequestState;
  creationResult?: ApplicationRegistrationModel;
}

interface PageCreateApplicationDispatch {
  resetCreate: () => void;
}

export interface PageCreateApplicationProps
  extends PageCreateApplicationState,
    PageCreateApplicationDispatch {}

function scollToPosition(elementRef: HTMLElement, x: number, y: number): void {
  if (elementRef?.scrollTo) {
    elementRef.scrollTo(x, y);
  }
}

function PageCreateApplication({
  creationState,
  creationResult,
  resetCreate,
}: PageCreateApplicationProps): JSX.Element {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const formScrollContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!visibleScrim) {
      resetCreate();
    }
  }, [resetCreate, visibleScrim]);

  useEffect(() => {
    if (!visibleScrim) return;

    switch (creationState) {
      case RequestState.FAILURE:
        scollToPosition(
          formScrollContainer.current,
          0,
          formScrollContainer.current?.scrollHeight
        );
        break;
      case RequestState.SUCCESS:
        scollToPosition(formScrollContainer.current, 0, 0);
        break;
      default:
        break;
    }
  }, [creationState, creationResult, visibleScrim]);

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
      <ScrimPopup
        title="Create new app"
        open={visibleScrim}
        onClose={() => setVisibleScrim(false)}
      >
        <div className="create-app-content" ref={formScrollContainer}>
          {creationState !== RequestState.SUCCESS ? (
            <CreateApplicationForm />
          ) : (
            <div className="grid grid--gap-medium">
              <Typography>
                The application <strong>{creationResult.name}</strong> has been
                set up
              </Typography>
              <ConfigureApplicationGithub
                app={creationResult}
                startVisible
                onDeployKeyChange={() => {}}
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
      </ScrimPopup>
    </>
  );
}

PageCreateApplication.propTypes = {
  creationState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
  resetCreate: PropTypes.func.isRequired,
  creationResult: PropTypes.shape(ApplicationRegistrationModelValidationMap),
} as PropTypes.ValidationMap<PageCreateApplicationProps>;

function mapStateToProps(state: RootState): PageCreateApplicationState {
  return {
    creationState: getCreationState(state),
    creationResult: getCreationResult(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PageCreateApplicationDispatch {
  return { resetCreate: () => dispatch(appsActions.addAppReset()) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreateApplication);
