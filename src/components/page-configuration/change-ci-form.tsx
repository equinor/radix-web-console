import {
  Accordion,
  Button,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { type FormEvent, useState } from 'react';

import { Alert } from '../alert';
import { AppConfigConfigurationItem } from '../app-config-ci';
import { useModifyRegistrationDetailsMutation } from '../../store/radix-api';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { getFetchErrorMessage } from '../../store/utils';
import type { Application } from '../../store/service-now-api';

interface Props {
  appName: string;
  configurationItem?: string;
  refetch?: Function;
}

export const ChangeConfigurationItemForm = ({
  appName,
  configurationItem,
  refetch,
}: Props) => {
  const [newCI, setNewCI] = useState<Application>();
  const [mutate, { isLoading, error }] = useModifyRegistrationDetailsMutation();

  const handleSubmit = handlePromiseWithToast(async (ev: FormEvent) => {
    ev.preventDefault();

    await mutate({
      appName,
      applicationRegistrationPatchRequest: {
        applicationRegistrationPatch: {
          configurationItem: newCI.id,
        },
      },
    }).unwrap();

    await refetch?.();
  });

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item style={{ overflow: 'visible' }}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change configuration item</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
            {error && (
              <div>
                <Alert type="danger">
                  <Typography>
                    Failed to change Configuration Item.{' '}
                    {getFetchErrorMessage(error)}
                  </Typography>
                </Alert>
              </div>
            )}
            <AppConfigConfigurationItem
              configurationItem={configurationItem}
              configurationItemChangeCallback={setNewCI}
              disabled={isLoading}
            />
            <div>
              {isLoading ? (
                <>
                  <CircularProgress size={24} /> Updating…
                </>
              ) : (
                <Button
                  color="danger"
                  type="submit"
                  disabled={!newCI || newCI?.id === configurationItem}
                >
                  Change configuration item
                </Button>
              )}
            </div>
          </form>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ChangeConfigurationItemForm.propTypes = {
  appName: PropTypes.string.isRequired,
  configurationItem: PropTypes.string,
  refetch: PropTypes.func,
};
