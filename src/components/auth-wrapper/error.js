import React from 'react';

import DocumentTitle from '../document-title';
import LinkButton from '../link-button';
import Panel from '../panel';
import Toggler from '../toggler';

import routes from '../../routes';

export const AuthError = ({ callbackMessage }) => {
  const { error, state } = callbackMessage;
  const description = callbackMessage.error_description;

  const errorType =
    error === 'access_denied' ? 'Authorisation' : 'Authentication';

  return (
    <main className="auth-wrapper auth-wrapper--error">
      <DocumentTitle title={`${errorType} problem`} />
      <Panel type="danger">
        <div className="auth-wrapper_content">
          <h1 className="o-heading-page">Oops</h1>
          <p>
            It looks like there was an {errorType.toLowerCase()} problem. Have
            you followed the{' '}
            <a href="https://www.radix.equinor.com/guides/getting-started/#getting-access">
              Getting access
            </a>{' '}
            procedure correctly?
          </p>
          <div className="o-toolbar">
            <LinkButton btnType="primary" to={routes.authLogout}>
              Log out
            </LinkButton>
          </div>
        </div>
      </Panel>
      <Panel type="danger">
        <div className="auth-wrapper_content">
          <Toggler summary="Error details">
            <dl className="o-key-values">
              <dt>Error</dt>
              <dd>{decodeURIComponent(error).replace(/\+/g, ' ')}</dd>
              <dt>Description</dt>
              <dd>{decodeURIComponent(description).replace(/\+/g, ' ')}</dd>
              <dt>State</dt>
              <dd>{decodeURIComponent(state).replace(/\+/g, ' ')}</dd>
            </dl>
          </Toggler>
        </div>
      </Panel>
    </main>
  );
};

export default AuthError;
