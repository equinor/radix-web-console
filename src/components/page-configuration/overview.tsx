import { List, Tooltip, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { Alert } from '../alert';
import AsyncResource from '../async-resource/async-resource';
import { useGetAdGroupsQuery } from '../../store/ms-graph-api';

interface Props {
  adGroups?: Array<string>;
  appName: string;
}

export function Overview({ adGroups, appName }: Props) {
  const { data, ...state } = useGetAdGroupsQuery({ ids: adGroups });

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
              <AsyncResource asyncState={state}>
                <List className="grid grid--gap-small">
                  {data?.map(({ id, displayName }) => (
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
              </AsyncResource>
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
