import { Radio, TextField, Tooltip, Typography } from '@equinor/eds-core-react';
import { createRef } from 'react';
import * as PropTypes from 'prop-types';

import { externalUrls } from '../../externalUrls';

import './style.css';

export const AppConfigAdGroups = ({
  adGroups,
  adModeAuto,
  isDisabled,
  handleAdGroupsChange,
  handleAdModeChange,
}) => {
  const adGroupsInput = createRef();
  const focusAdGroups = (ev) => {
    if (ev.target.checked) {
      adGroupsInput.current.disabled = false;
      adGroupsInput.current.focus();
    }
  };

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
          onClick={focusAdGroups}
          type="radio"
          value="false"
          disabled={isDisabled}
        />
        <span>
          <Typography
            className="label"
            group="input"
            variant="text"
            token={{ color: 'currentColor' }}
          >
            Custom{' '}
            <Tooltip title="Active Directory" placement="top">
              <span>AD</span>
            </Tooltip>{' '}
            groups (comma-separated)
          </Typography>
          <TextField
            id="adgroups_field"
            name="adGroups"
            disabled={adModeAuto || isDisabled}
            value={adGroups}
            onChange={handleAdGroupsChange}
            ref={adGroupsInput}
            helperText={
              <>
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
              </>
            }
          />
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
};
