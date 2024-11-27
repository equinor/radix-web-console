import {
  CircularProgress,
  Icon,
  List,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { computer, group } from '@equinor/eds-icons';
import {
  useGetAdGroupsQuery,
  useGetAdServicePrincipalQuery,
} from '../../store/ms-graph-api';
import { Alert } from '../alert';
import AsyncResource from '../async-resource/async-resource';
import { UnknownADGroupsAlert } from '../component/unknown-ad-groups-alert';
import { ExternalLink } from '../link/external-link';

interface Props {
  adGroups: Array<string>;
  adUsers: Array<string>;
  appName: string;
}

export function Overview({ adGroups, adUsers, appName }: Props) {
  const { data: groups, ...groupState } = useGetAdGroupsQuery({
    ids: adGroups,
  });
  const { data: SPs, ...spState } = useGetAdServicePrincipalQuery({
    ids: adUsers,
  });
  const unknownADGroups = adGroups.filter(
    (adGroupId) => !groups?.some((x) => x.id === adGroupId)
  );
  const unknownADUsers = adUsers.filter(
    (adUserId) => !SPs?.some((x) => x.id === adUserId)
  );

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
              <Typography>Radix administrators:</Typography>
              {groupState.isLoading || spState.isLoading ? (
                <>
                  <CircularProgress size={24} /> Updating…
                </>
              ) : (
                <AsyncResource
                  asyncState={groupState}
                  nonFailureErrorCodes={[404]}
                >
                  <AsyncResource
                    asyncState={spState}
                    nonFailureErrorCodes={[404]}
                  >
                    <List className="grid grid--gap-small">
                      {groups?.map(({ id, displayName }) => (
                        <List.Item key={id}>
                          <ExternalLink
                            href={`https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/${id}`}
                          >
                            <Icon data={group} size={16} /> {displayName}
                          </ExternalLink>
                        </List.Item>
                      ))}
                      {SPs?.map(({ id, displayName, appId }) => (
                        <List.Item key={id}>
                          <ExternalLink
                            href={`https://portal.azure.com/#view/Microsoft_AAD_IAM/ManagedAppMenuBlade/~/Overview/objectId/${id}/appId/${appId}`}
                          >
                            <Icon data={computer} size={16} /> {displayName}
                          </ExternalLink>
                        </List.Item>
                      ))}
                    </List>
                  </AsyncResource>
                  {(!groupState.isFetching && unknownADGroups.length > 0) ||
                    (!spState.isFetching && unknownADUsers.length > 0 && (
                      <UnknownADGroupsAlert
                        unknownADGroups={unknownADGroups}
                        unknownADUsers={unknownADUsers}
                      />
                    ))}
                </AsyncResource>
              )}
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
