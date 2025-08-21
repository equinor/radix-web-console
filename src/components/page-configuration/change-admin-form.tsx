import {
  Accordion,
  Button,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import { difference } from 'lodash-es';
import { type FormEvent, useState } from 'react';
import {
  type ApplicationRegistration,
  useModifyRegistrationDetailsMutation,
} from '../../store/radix-api';
import { AppConfigAdGroups } from '../app-config-ad-groups';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import type { AdGroupItem } from '../graph/adGroups';

const isEqual = (a: Array<unknown>, b: Array<unknown>) =>
  a.length == b.length && difference(a, b).length === 0;

interface Props {
  registration: ApplicationRegistration;
  refetch: () => unknown;
}
export default function ChangeAdminForm({ registration, refetch }: Props) {
  const [adminAdGroup, setAdminAdGroup] = useState<Array<string>>();
  const [adminAdUser, setAdminAdUser] = useState<Array<string>>();
  const [readerAdGroup, setReaderAdGroup] = useState<Array<string>>();
  const [readerAdUser, setReaderAdUser] = useState<Array<string>>();
  const [mutate, { isLoading }] = useModifyRegistrationDetailsMutation();

  const handleSubmit = handlePromiseWithToast(
    async (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();

      await mutate({
        appName: registration.name,
        applicationRegistrationPatchRequest: {
          acknowledgeWarnings: true,
          applicationRegistrationPatch: {
            adGroups: adminAdGroup || registration.adGroups,
            adUsers: adminAdUser || registration.adUsers,
            readerAdGroups: readerAdGroup || registration.readerAdGroups,
            readerAdUsers: readerAdUser || registration.readerAdUsers,
          },
        },
      }).unwrap();
      await refetch();
      setAdminAdGroup(undefined);
      setReaderAdGroup(undefined);
    }
  );

  const adminUnchanged =
    (adminAdGroup == null ||
      isEqual(adminAdGroup, registration.adGroups ?? [])) &&
    (adminAdUser == null || isEqual(adminAdUser, registration.adUsers ?? []));

  const readerUnchanged =
    (readerAdGroup == null ||
      isEqual(readerAdGroup, registration.readerAdGroups ?? [])) &&
    (readerAdUser == null ||
      isEqual(readerAdUser, registration.readerAdUsers ?? []));

  const isUnchanged = adminUnchanged && readerUnchanged;

  const handleReaderAdGroupsChange = (value: Readonly<AdGroupItem[]>) => {
    setReaderAdGroup(value.filter((x) => x.type === 'Group').map((v) => v.id));
    setReaderAdUser(value.filter((x) => x.type !== 'Group').map((x) => x.id));
  };
  const handleAdGroupsChange = (value: Readonly<AdGroupItem[]>) => {
    setAdminAdGroup(value.filter((x) => x.type === 'Group').map((v) => v.id));
    setAdminAdUser(value.filter((x) => x.type !== 'Group').map((x) => x.id));
  };
  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item style={{ overflow: 'visible' }} isExpanded={true}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Access control</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
            <div className="grid grid--gap-medium">
              <AppConfigAdGroups
                labeling={'Administrators'}
                adGroups={registration.adGroups}
                adUsers={registration.adUsers}
                onChange={handleAdGroupsChange}
              />
              <AppConfigAdGroups
                labeling={'Readers'}
                adGroups={registration.readerAdGroups}
                adUsers={registration.readerAdUsers}
                onChange={handleReaderAdGroupsChange}
              />
            </div>
            {isLoading ? (
              <div>
                <CircularProgress size={24} /> Updating…
              </div>
            ) : (
              <div>
                <Button color="danger" type="submit" disabled={isUnchanged}>
                  Change access control
                </Button>
              </div>
            )}
          </form>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
