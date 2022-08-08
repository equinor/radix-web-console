import { Radio, Tooltip, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { externalUrls } from '../../externalUrls';
import './style.css';
import { SignedInContext } from '../graph/signedIn';
import { AuthenticatedTemplate } from '@azure/msal-react';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { msalConfig } from '../graph/Config';

// const adModeAutoHelp = (): JSX.Element => {
//   return (
//     <>
//       Please note that everyone who has access to Radix will be able to
//       administer this application
//     </>
//   );
// };

const adGroupsHelp = (): JSX.Element => {
  return (
    <Typography>
      Group IDs (in Azure Active Directory) allowed to administer the
      application in Radix. Create and manage AD groups with{' '}
      <Typography
        link
        href={externalUrls.idweb}
        token={{ fontSize: 'inherit' }}
      >
        idweb
      </Typography>
      .
    </Typography>
  );
};

export type AdGroupsChangeHandler = (event: Event) => void;

export interface AppConfigAdGroupsProps {
  adGroups: string;
  adModeAuto: boolean;
  handleAdGroupsChange: (event: any) => void;
  handleAdModeChange: (event: any) => void;
}

const msalInstance = new PublicClientApplication(msalConfig);

export const AppConfigAdGroups = (
  props: AppConfigAdGroupsProps
): JSX.Element => {
  const { adGroups, adModeAuto, handleAdModeChange } = props;
  const focusAdGroups = (ev) => {
    if (ev.target.checked) {
      // adGroupsInput.current.disabled = false;
      // adGroupsInput.current.focus();
    }
  };

  const accounts = msalInstance.getAllAccounts();

  if (accounts && accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      // Set the active account - this simplifies token acquisition
      const authResult = event.payload as AuthenticationResult;
      msalInstance.setActiveAccount(authResult.account);
    }
  });

  return (
    <div className="ad-groups">
      <Typography className="label">Administrators</Typography>
      <Typography className="label meta">
        User authentication is your application's responsibility; it is not
        related to these groups
      </Typography>
      <div className="radio-input">
        <Radio
          className="radio-button"
          checked={adModeAuto}
          name="adMode"
          onChange={handleAdModeChange}
          type="radio"
          value="true"
        />
        <span>
          <Typography
            className="label"
            group="input"
            variant="text"
            token={{ color: 'currentColor' }}
          >
            All radix users
          </Typography>
          <Typography
            group="navigation"
            variant="label"
            token={{ color: 'currentColor' }}
          >
            {/* {adModeAutoHelp} */}
          </Typography>
        </span>
      </div>
      <div className="radio-input">
        <Radio
          className="radio-button"
          checked={!adModeAuto}
          name="adMode"
          onChange={handleAdModeChange}
          onClick={focusAdGroups}
          type="radio"
          value="false"
        />
        <span>
          <AuthenticatedTemplate>
            <SignedInContext />
          </AuthenticatedTemplate>
        </span>
      </div>
    </div>
  );
};

AppConfigAdGroups.propTypes = {
  adGroups: PropTypes.string,
  adModeAuto: PropTypes.bool.isRequired,
  handleAdGroupsChange: PropTypes.func.isRequired,
  handleAdModeChange: PropTypes.func.isRequired,
};

export default AppConfigAdGroups;
