import { List, Tooltip, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import Alert from '../alert';

interface OverviewProps {
  adGroups: string[];
  appName: string;
}

const renderAdGroups = (groups: string[]) =>
  groups.map((group: string) => (
    <List.Item key={group}>
      <Typography
        link
        href={`https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/${group}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {group}
      </Typography>
    </List.Item>
  ));

export const Overview = ({ adGroups, appName }: OverviewProps): JSX.Element => {
  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h4">Overview</Typography>
      <section className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-small">
          <Typography>
            Application <strong>{appName}</strong>
          </Typography>
        </div>
        <div className="grid grid--gap-small">
          {!adGroups?.length ? (
            <Alert type="warning">
              <Typography>Can be administered by all Radix users</Typography>
            </Alert>
          ) : (
            <>
              <Typography>
                Radix administrators (
                <Tooltip title="Active Directory" placement="top">
                  <span>AD</span>
                </Tooltip>{' '}
                groups):
              </Typography>
              <List className="grid grid--gap-small">
                {renderAdGroups(adGroups)}
              </List>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

Overview.propTypes = {
  adGroups: PropTypes.array.isRequired,
  appName: PropTypes.string.isRequired,
};
