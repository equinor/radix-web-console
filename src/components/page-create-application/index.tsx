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
import { routes } from '../../routes';
import {
  getCreationResult,
  getCreationState,
} from '../../state/application-creation';
import { actions as appsActions } from '../../state/application-creation/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import { routeWithParams } from '../../utils/string';

import './style.css';
import {
  ApplicationRegistrationUpsertRespondModelValidationMap,
  ApplicationRegistrationUpsertRespondModel,
} from '../../models/application-registration-upsert-respond';

interface PageCreateApplicationState {
  creationState: RequestState;
  creationRespond?: ApplicationRegistrationUpsertRespondModel;
}

interface PageCreateApplicationDispatch {
  resetCreate: () => void;
}

export interface PageCreateApplicationProps
  extends PageCreateApplicationState,
    PageCreateApplicationDispatch {}

function scrollToPosition(elementRef: HTMLElement, x: number, y: number): void {
  if (elementRef?.scrollTo) {
    elementRef.scrollTo(x, y);
  }
}

function PageCreateApplication({
  creationState,
  creationRespond,
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
        scrollToPosition(
          formScrollContainer.current,
          0,
          formScrollContainer.current?.scrollHeight
        );
        break;
      case RequestState.SUCCESS:
        if (
          creationRespond.applicationRegistration &&
          !creationRespond.warnings
        ) {
          scrollToPosition(formScrollContainer.current, 0, 0);
        }
        break;
      default:
        break;
    }
  }, [creationState, creationRespond, visibleScrim]);

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
          {creationState !== RequestState.SUCCESS ||
          !creationRespond.applicationRegistration ||
          creationRespond.warnings ? (
            <CreateApplicationForm />
          ) : (
            <div className="grid grid--gap-medium">
              <Typography>
                The application{' '}
                <strong>{creationRespond.applicationRegistration.name}</strong>{' '}
                has been set up
              </Typography>
              <ConfigureApplicationGithub
                app={creationRespond.applicationRegistration}
                startVisible
                onDeployKeyChange={() => {}}
                useOtherCiToolOptionVisible
              />
              <Typography>
                You can now go to{' '}
                <Link
                  to={routeWithParams(routes.app, {
                    appName: creationRespond.applicationRegistration.name,
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
  creationRespond: PropTypes.shape(
    ApplicationRegistrationUpsertRespondModelValidationMap
  ),
} as PropTypes.ValidationMap<PageCreateApplicationProps>;

function mapStateToProps(state: RootState): PageCreateApplicationState {
  return {
    creationState: getCreationState(state),
    creationRespond: getCreationResult(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PageCreateApplicationDispatch {
  return { resetCreate: () => dispatch(appsActions.addAppReset()) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreateApplication);
