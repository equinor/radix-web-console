import { List, Tooltip, Typography } from '@equinor/eds-core-react';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import * as PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Alert } from '../alert';
import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { useAuthentication } from '../graph/authentication';
import { getGroup } from '../graph/graphService';
import { AsyncState } from '../../effects/effect-types';
import { RequestState } from '../../state/state-utils/request-states';

export interface OverviewProps {
  adGroups?: Array<string>;
  appName: string;
}

export const Overview = ({ adGroups, appName }: OverviewProps): JSX.Element => {
  const auth = useAuthentication();
  const mountedRef = useRef(true);

  const [result, setResult] = useState<AsyncState<Array<React.ReactElement>>>({
    data: undefined,
    status: RequestState.IN_PROGRESS,
  });

  const getGroupInfo = (
    authProvider: AuthCodeMSALBrowserAuthenticationProvider,
    groups: Array<string>
  ) => {
    try {
      const data: React.ReactElement[] = [];
      const groupResult = groups.map(async (id) => {
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
      Promise.all(groupResult).then(() => {
        if (!mountedRef.current) return null;
        setResult({ data: data, status: RequestState.SUCCESS });
      });
    } catch (err) {
      setResult({ data: undefined, status: RequestState.FAILURE });
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    if (adGroups?.length > 0) {
      if (auth.authProvider) {
        getGroupInfo(auth.authProvider, adGroups);
      }
    } else {
      setResult({
        data: undefined,
        status: RequestState.SUCCESS,
      });
    }
    return () => {
      mountedRef.current = false;
    };
  }, [adGroups, auth?.authProvider]);

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
              <SimpleAsyncResource asyncState={result}>
                <List className="grid grid--gap-small">{result.data}</List>
              </SimpleAsyncResource>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

Overview.propTypes = {
  adGroups: PropTypes.arrayOf(PropTypes.string),
  appName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<OverviewProps>;
