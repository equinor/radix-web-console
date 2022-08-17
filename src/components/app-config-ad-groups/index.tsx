import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { Radio, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent } from 'react';

import { ADGroups, HandleAdGroupsChangeCB } from '../graph/adGroups';
import { msalConfig } from '../graph/Config';

import './style.css';

export interface AppConfigAdGroupsProps {
  adGroups?: string;
  adModeAuto: boolean;
  isDisabled?: boolean;
  handleAdGroupsChange: HandleAdGroupsChangeCB;
  handleAdModeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const msalInstance = new PublicClientApplication(msalConfig);

export const AppConfigAdGroups = ({
  adGroups,
  adModeAuto,
  isDisabled,
  handleAdGroupsChange,
  handleAdModeChange,
}: AppConfigAdGroupsProps): JSX.Element => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts?.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
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
          disabled={isDisabled}
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
            Please note that everyone who has access to Radix will be able to
            administer this application
          </Typography>
        </span>
      </div>
      <div className="radio-input">
        <Radio
          className="radio-button"
          checked={!adModeAuto}
          name="adMode"
          onChange={handleAdModeChange}
          type="radio"
          value="false"
          disabled={isDisabled}
        />
        <span>
          <AuthenticatedTemplate>
            <ADGroups
              handleAdGroupsChange={handleAdGroupsChange}
              adGroups={adGroups}
              isDisabled={isDisabled}
              adModeAuto={adModeAuto}
            />
          </AuthenticatedTemplate>
        </span>
      </div>
    </div>
  );
};

AppConfigAdGroups.propTypes = {
  adGroups: PropTypes.string,
  adModeAuto: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  handleAdGroupsChange: PropTypes.func.isRequired,
  handleAdModeChange: PropTypes.func.isRequired,
} as PropTypes.ValidationMap<AppConfigAdGroupsProps>;
