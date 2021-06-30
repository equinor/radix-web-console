import React from 'react';
import PropTypes from 'prop-types';
import { Input, Radio } from '@equinor/eds-core-react';

import FormField, { FormGroup } from '../form-field';

import externalUrls from '../../externalUrls';

import './style.css';

const adModeAutoHelp = (
  <span>
    Please note that <strong>everyone who has access to Radix</strong> will be
    able to administer this application
  </span>
);

const adGroupsHelp = (
  <span>
    Group IDs (in Azure Active Directory) allowed to administer the application
    in Radix. Create and manage AD groups with{' '}
    <a href={externalUrls.idweb}>idweb</a>.
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
    <FormGroup label="Administrators">
      <p>
        User authentication is your application's responsibility; it is not
        related to these groups
      </p>
      <FormField help={adModeAutoHelp}>
        <Radio
          checked={adModeAuto}
          name="adMode"
          onChange={handleAdModeChange}
          type="radio"
          value="true"
          className="radio-button"
          disabled={handleDisabled}
        />{' '}
        <span className="radio-button-span">All Radix users</span>
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
          Custom <abbr title="Active Directory">AD</abbr> groups
          (comma-separated)
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
    </FormGroup>
  );
};
AppConfigAdGroups.propTypes = {
  adGroups: PropTypes.string,
  adModeAuto: PropTypes.bool.isRequired,
  handleAdGroupsChange: PropTypes.func.isRequired,
  handleAdModeChange: PropTypes.func.isRequired,
};

export default AppConfigAdGroups;
