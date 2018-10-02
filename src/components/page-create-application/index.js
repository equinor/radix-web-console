import React from 'react';

import DocumentTitle from '../document-title';
import CreateApplicationForm from '../create-application-form';

const clusterDomain = require('../../config.json').clusterDomain;

export const PageCreateApplication = () => {
  return (
    <React.Fragment>
      <DocumentTitle title="Create application" />
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">Create application</h1>
      </div>
      <main className="o-layout-page-content">
        <p>Alpha alert! This must be quite precise to work.</p>
        <p>
          <strong>Name</strong> must match the project name on GitHub.
        </p>
        <p>
          <strong>Clone URL</strong> is obtained from GitHub's "clone with SSH"
          dialog and looks like "git@github.com:Statoil/my-app.git".
        </p>
        <p>
          <strong>Shared secret</strong> is a custom string, to be entered both
          here and on a GitHub webhook for the project. And "Private deploy key"
          is the private part of a key to be used in the GitHub project's deploy
          keys.
        </p>
        <p>
          <strong>AD Group</strong> is the Object Id found in Azure AD.
          It grant access to resources related to hosting and building
          this application in kubernetes, e.g. pods and secrets.
          If no group is provided, the app resources will be open for all developers
          hosting in radix platform. To create and manage AD groups,
          use <a href="https://idweb.statoil.net/IdentityManagement/default.aspx">idweb</a>.
          End users access needs to be controlled in the app itself, and is not
          related to this AD group.
        </p>
        <p>
          <strong>Webhook</strong>: In the GitHub project, go to Settings,
          Webhooks, Add webhook, on Payload URL enter "http://webhook.{
            clusterDomain
          }/events/github", set Content type to "application/json", enter the
          shared secret that you will input into this form (anything works, it
          just has to match), and set the hook to trigger on push.
        </p>
        <p>
          <strong>Private deploy key</strong>: Generate a private/public key
          pair using this command:{' '}
          <code>ssh-keygen -t rsa -b 4096 -C "Radix deploy key"</code>. Keep the
          passphrase empty, since it needs to be used programmatically. Paste
          the public part ("ssh-rsa …") on GitHub (Project, Settings, Deploy
          keys, Add) and the private part ("-----BEGIN RSA PRIVATE KEY …") on
          here.
        </p>
        <p>Yes, this will be made a lot simpler in the future.</p>
        <CreateApplicationForm />
      </main>
    </React.Fragment>
  );
};

export default PageCreateApplication;
