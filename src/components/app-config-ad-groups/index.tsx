import { AuthenticatedTemplate } from '@azure/msal-react';
import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { ADGroups, HandleAdGroupsChangeCB } from '../graph/adGroups';

import './style.css';

export interface AppConfigAdGroupsProps {
  labeling: string;
  adGroups?: Array<string>;
  isDisabled?: boolean;
  handleAdGroupsChange: HandleAdGroupsChangeCB;
}

export const AppConfigAdGroups: FunctionComponent<AppConfigAdGroupsProps> = ({
  labeling,
  adGroups,
  isDisabled,
  handleAdGroupsChange,
}) => (
  <div className="ad-groups">
    <Typography className="label">{labeling}</Typography>
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

AppConfigAdGroups.propTypes = {
  labeling: PropTypes.string.isRequired,
  adGroups: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
  handleAdGroupsChange: PropTypes.func.isRequired,
};
