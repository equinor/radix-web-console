import React from 'react';
import PropTypes from 'prop-types';
import { Input, Radio, Tooltip, Typography } from '@equinor/eds-core-react';
// TODO: CHECK OUT FORMFIELD, IS IT NECESSARY?
import FormField, { FormGroup } from '../form-field';

import externalUrls from '../../externalUrls';

import './style.css';

const adModeAutoHelp = (
  <span>
    Please note that everyone who has access to Radix will be able to administer
    this application
  </span>
);

const adGroupsHelp = (
  <span>
    Group IDs (in Azure Active Directory) allowed to administer the application
    in Radix. Create and manage AD groups with{' '}
    <Typography link href={externalUrls.idweb} token={{ fontSize: 'inherit' }}>
      idweb
    </Typography>
    .
  </span>
);

const AppConfigAdGroups = ({
  adGroups,
  adModeAuto,
  handleAdGroupsChange,
  handleAdModeChange,
  handleDisabled,
}) => {
  const adGroupsInput = React.createRef();
  const focusAdGroups = (ev) => {
    if (ev.target.checked) {
      adGroupsInput.current.disabled = false;
      adGroupsInput.current.focus();
    }
  };

  return (
    <>
      <FormField label="Administrators">
        <Typography
          group="navigation"
          variant="label"
          token={{ color: 'eds_text_static_icons__default' }}
        >
          User authentication is your application's responsibility; it is not
          related to these groups
        </Typography>
      </FormField>
      <FormField>
        <Radio
          checked={adModeAuto}
          name="adMode"
          onChange={handleAdModeChange}
          type="radio"
          value="true"
          className="radio-button"
          disabled={handleDisabled}
        />{' '}
        <span className="radio-button-span">
          <Typography group="input" variant="text">
            All radix users
          </Typography>
          <Typography group="navigation" variant="label">
            {adModeAutoHelp}
          </Typography>
        </span>
      </FormField>
      <FormField>
        <Radio
          checked={!adModeAuto}
          name="adMode"
          onChange={handleAdModeChange}
          onClick={focusAdGroups}
          type="radio"
          value="false"
          className="radio-button"
          disabled={handleDisabled}
        />{' '}
        <span className="radio-button-span">
          <Typography group="input" variant="text">
            Custom{' '}
            <Tooltip title="Active Directory" placement="top">
              <span>AD</span>
            </Tooltip>{' '}
            groups (comma-separated)
          </Typography>
        </span>
        <FormField help={adGroupsHelp}>
          <Input
            type="text"
            variant="default"
            name="adGroups"
            disabled={adModeAuto || handleDisabled}
            value={adGroups}
            onChange={handleAdGroupsChange}
            ref={adGroupsInput}
          />
        </FormField>
      </FormField>
    </>
  );
};
AppConfigAdGroups.propTypes = {
  adGroups: PropTypes.string,
  adModeAuto: PropTypes.bool.isRequired,
  handleAdGroupsChange: PropTypes.func.isRequired,
  handleAdModeChange: PropTypes.func.isRequired,
};

export default AppConfigAdGroups;
