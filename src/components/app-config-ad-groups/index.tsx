import { AuthenticatedTemplate } from '@azure/msal-react';
import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { ADGroups, HandleAdGroupsChangeCB } from '../graph/adGroups';
import './style.css';

export interface AppConfigAdGroupsProps {
  adGroups?: Array<string>;
  isDisabled?: boolean;
  handleAdGroupsChange: HandleAdGroupsChangeCB;
}

export const AppConfigAdGroups = ({
  adGroups,
  isDisabled,
  handleAdGroupsChange,
}: AppConfigAdGroupsProps): JSX.Element => {
  return (
    <div className="ad-groups">
      <Typography className="label">Administrators</Typography>
      <Typography className="label meta">
        User authentication is your application's responsibility; it is not
        related to these groups
      </Typography>
      <AuthenticatedTemplate>
        <ADGroups
          handleAdGroupsChange={handleAdGroupsChange}
          adGroups={adGroups}
          isDisabled={isDisabled}
        />
      </AuthenticatedTemplate>
    </div>
  );
};

AppConfigAdGroups.propTypes = {
  adGroups: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
  handleAdGroupsChange: PropTypes.func.isRequired,
} as PropTypes.ValidationMap<AppConfigAdGroupsProps>;
