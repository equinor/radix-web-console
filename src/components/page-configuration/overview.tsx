import { List, Tooltip, Typography } from '@equinor/eds-core-react';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import * as PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Alert } from '../alert';
import { useAppContext } from '../app-context';
import {
  SimpleAsyncResource,
  RequestState,
  AsyncState,
} from '../async-resource/simple-async-resource';
import { adGroupModel } from '../graph/adGroupModel';
import { getGroup } from '../graph/graphService';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';

interface Props {
  adGroups?: Array<string>;
  appName: string;
}

export function Overview({ adGroups, appName }: Props) {
  const { graphAuthProvider } = useAppContext();
  const mountedRef = useRef(true);

  const [result, setResult] = useState<AsyncState<Array<adGroupModel>>>({
    data: [],
    status: RequestState.IN_PROGRESS,
  });

  const getGroupInfo = useCallback(
    (
      authProvider: AuthCodeMSALBrowserAuthenticationProvider,
      groups: Array<string>
    ): void => {
      const data: Array<adGroupModel> = [];
      const groupResult = groups?.map(async (id) => {
        await getGroup(authProvider, id)
          .then((x) => data.push(x))
          .catch(() => setResult({ data: [], status: RequestState.FAILURE }));
      });

      if (groupResult) {
        Promise.all(groupResult)
          .then(() => {
            if (mountedRef.current) {
              setResult({
                data: dataSorter(data, [
                  (x, y) => sortCompareString(x.displayName, y.displayName),
                ]),
                status: RequestState.SUCCESS,
              });
            }
          })
          .catch(() => setResult({ data: [], status: RequestState.FAILURE }));
      }
    },
    []
  );

  useEffect(() => {
    mountedRef.current = true;
    if (adGroups?.length > 0) {
      if (graphAuthProvider) {
        getGroupInfo(graphAuthProvider, adGroups);
      }
    } else {
      setResult({ data: [], status: RequestState.SUCCESS });
    }
    return () => {
      mountedRef.current = false;
    };
  }, [adGroups, graphAuthProvider, getGroupInfo]);

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
          {adGroups?.length > 0 ? (
            <>
              <Typography>
                Radix administrators (
                <Tooltip title="Active Directory" placement="top">
                  <span>AD</span>
                </Tooltip>{' '}
                groups):
              </Typography>
              <SimpleAsyncResource asyncState={result}>
                <List className="grid grid--gap-small">
                  {result.data.map(({ id, displayName }) => (
                    <List.Item key={id}>
                      <Typography
                        link
                        href={`https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {displayName}
                      </Typography>
                    </List.Item>
                  ))}
                </List>
              </SimpleAsyncResource>
            </>
          ) : (
            <Alert type="warning">
              <Typography>Can be administered by all Radix users</Typography>
            </Alert>
          )}
        </div>
      </section>
    </div>
  );
}

Overview.propTypes = {
  adGroups: PropTypes.arrayOf(PropTypes.string),
  appName: PropTypes.string.isRequired,
};
