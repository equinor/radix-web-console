import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ConfigureApplicationGithub } from '../configure-application-github';
import CreateApplicationForm from '../create-application-form';
import { ScrimPopup } from '../scrim-popup';
import { RootState } from '../../init/store';
import {
  ApplicationRegistrationUpsertResponseModel,
  ApplicationRegistrationUpsertResponseModelValidationMap,
} from '../../models/radix-api/applications/application-registration-upsert-response';
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
  creationResponse?: ApplicationRegistrationUpsertResponseModel;
}

interface PageCreateApplicationDispatch {
  resetCreate: () => void;
}

export interface PageCreateApplicationProps
  extends PageCreateApplicationState,
    PageCreateApplicationDispatch {}

function scrollToPosition(elementRef: Element, x: number, y: number): void {
  elementRef.scrollTo?.(x, y);
}

const PageCreateApplication: FunctionComponent<PageCreateApplicationProps> = ({
  creationState,
  creationResponse,
  resetCreate,
}) => {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visibleScrim) {
      resetCreate();
    }
  }, [resetCreate, visibleScrim]);

  useEffect(() => {
    if (!visibleScrim) return;

    if (creationState === RequestState.FAILURE) {
      scrollToPosition(
        containerRef.current,
        0,
        containerRef.current?.scrollHeight
      );
    } else if (creationState === RequestState.SUCCESS) {
      if (
        creationResponse.applicationRegistration &&
        !creationResponse.warnings
      ) {
        scrollToPosition(containerRef.current, 0, 0);
      }
    }
  }, [creationState, creationResponse, visibleScrim]);

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
        <div className="create-app-content" ref={containerRef}>
          {creationState !== RequestState.SUCCESS ||
          !creationResponse.applicationRegistration ||
          creationResponse.warnings ? (
            <CreateApplicationForm />
          ) : (
            <div className="grid grid--gap-medium">
              <Typography>
                The application{' '}
                <strong>{creationResponse.applicationRegistration.name}</strong>{' '}
                has been set up
              </Typography>
              <ConfigureApplicationGithub
                app={creationResponse.applicationRegistration}
                startVisible
                onDeployKeyChange={() => void 0}
                useOtherCiToolOptionVisible
                initialSecretPollInterval={1500}
              />
              <Typography>
                You can now go to{' '}
                <Typography
                  as={Link}
                  to={routeWithParams(routes.app, {
                    appName: creationResponse.applicationRegistration.name,
                  })}
                  link
                >
                  your application's page
                </Typography>
              </Typography>
            </div>
          )}
        </div>
      </ScrimPopup>
    </>
  );
};

PageCreateApplication.propTypes = {
  creationState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
  resetCreate: PropTypes.func.isRequired,
  creationResponse: PropTypes.shape(
    ApplicationRegistrationUpsertResponseModelValidationMap
  ),
};

function mapStateToProps(state: RootState): PageCreateApplicationState {
  return {
    creationState: getCreationState(state),
    creationResponse: getCreationResult(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PageCreateApplicationDispatch {
  return { resetCreate: () => dispatch(appsActions.addAppReset()) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreateApplication);
