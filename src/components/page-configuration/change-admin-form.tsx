import {
  Accordion,
  Button,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FormEvent, useState } from 'react';

import { AppConfigAdGroups } from '../app-config-ad-groups';
import {
  ApplicationRegistration,
  useModifyRegistrationDetailsMutation,
} from '../../store/radix-api';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { difference } from 'lodash';

const isEqual = (a: Array<unknown>, b: Array<unknown>) =>
  a.length == b.length && difference(a, b).length === 0;

interface Props {
  registration: ApplicationRegistration;
  refetch?: Function;
}
export default function ChangeAdminForm({ registration, refetch }: Props) {
  const [adminAdGroup, setAdminAdGroup] = useState<Array<string>>();
  const [readerAdGroup, setReaderAdGroup] = useState<Array<string>>();
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
            readerAdGroups: readerAdGroup || registration.readerAdGroups,
          },
        },
      }).unwrap();
      await refetch?.();
      setAdminAdGroup(undefined);
      setReaderAdGroup(undefined);
    }
  );

  const adminUnchanged =
    adminAdGroup == null || isEqual(adminAdGroup, registration.adGroups ?? []);

  const readerUnchanged =
    readerAdGroup == null ||
    isEqual(readerAdGroup, registration.readerAdGroups ?? []);

  const isUnchanged = adminUnchanged && readerUnchanged;

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
                handleAdGroupsChange={(value) =>
                  setAdminAdGroup(value.map((v) => v.id))
                }
              />
              <AppConfigAdGroups
                labeling={'Readers'}
                adGroups={registration.readerAdGroups}
                handleAdGroupsChange={(value) =>
                  setReaderAdGroup(value.map((v) => v.id))
                }
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

ChangeAdminForm.proptypes = {
  registration: PropTypes.object.isRequired,
  refetch: PropTypes.func,
};
