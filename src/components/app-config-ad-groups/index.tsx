import { AuthenticatedTemplate } from '@azure/msal-react';
import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { ADGroups, type HandleAdGroupsChangeCB } from '../graph/adGroups';

import './style.css';

interface Props {
  labeling: string;
  adGroups?: Array<string>;
  adUsers?: Array<string>;
  isDisabled?: boolean;
  onChange: HandleAdGroupsChangeCB;
}
export const AppConfigAdGroups = ({
  labeling,
  adGroups,
  adUsers,
  isDisabled,
  onChange,
}: Props) => (
  <div className="ad-groups">
    <Typography className="label">{labeling}</Typography>
    <Typography className="label meta">
      User authentication is your application's responsibility; it is not
      related to these groups
    </Typography>
    <AuthenticatedTemplate>
      <ADGroups
        onChange={onChange}
        adGroups={adGroups ?? []}
        adUsers={adUsers ?? []}
        isDisabled={isDisabled}
      />
    </AuthenticatedTemplate>
  </div>
);

AppConfigAdGroups.propTypes = {
  labeling: PropTypes.string.isRequired,
  adGroups: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
