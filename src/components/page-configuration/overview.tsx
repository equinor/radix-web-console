import { List, Tooltip, Typography } from '@equinor/eds-core-react';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import * as PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

import Alert from '../alert';
import { useAuthentication } from '../graph/authentication';
import { getGroup } from '../graph/graphService';

interface OverviewProps {
  adGroups: string[];
  appName: string;
}

export const Overview = ({ adGroups, appName }: OverviewProps): JSX.Element => {
  const auth = useAuthentication();
  const [groupList, setGroupList] = useState(Array<any>);
  const getGroupInfo = (
    authProvider: AuthCodeMSALBrowserAuthenticationProvider,
    groups: Array<string>
  ) => {
    const data: React.ReactElement[] = [];
    const result = groups.map(async (id) => {
      await getGroup(authProvider, id).then((group) =>
        data.push(
          <List.Item key={group.id}>
            <Typography
              link
              href={`https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/${group.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {group.displayName}
            </Typography>
          </List.Item>
        )
      );
    });
    Promise.all(result).then(() => {
      console.log(result);
      setGroupList(data);
    });
  };

  const renderAdGroups = useCallback(
    (
      authProvider: AuthCodeMSALBrowserAuthenticationProvider,
      groups: Array<string>
    ) => {
      getGroupInfo(authProvider, groups);
    },
    []
  );

  useEffect(() => {
    if (auth.authProvider) {
      renderAdGroups(auth.authProvider, adGroups);
    }
  }, [adGroups, auth?.authProvider, renderAdGroups]);

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
              <List className="grid grid--gap-small">{groupList}</List>
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
