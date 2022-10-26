import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

import { Alert } from '../alert';
import { SecretStatus } from '../secret-status';
import { SecretStatusMessages } from '../secret-status-messages';
import { TLSCertificateList } from '../tls-certificate-list';
import { ExternalDnsAliasHelp } from '../external-dns-alias-help';
import { SecretModel, SecretModelValidationMap } from '../../models/secret';
import { SecretType } from '../../models/secret-type';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

export interface SecretFormProps {
  secret?: SecretModel;
  secretName: string;
  saveError?: string;
  saveState?: RequestState;
  overview?: ReactNode;
  handleSubmit: (value: string) => void;
  resetSaveState: () => void;
  getSecret: () => void;
}

const STATUS_OK = 'Consistent';

const saveStateTemplates: Partial<
  Record<RequestState, ({ error }: { error?: string }) => JSX.Element>
> = {
  [RequestState.FAILURE]: ({ error }) => (
    <div>
      <Alert type="danger">Error while saving. {error}</Alert>
    </div>
  ),
  [RequestState.SUCCESS]: () => (
    <div>
      <Alert type="info">Saved</Alert>
    </div>
  ),
  [RequestState.IN_PROGRESS]: () => (
    <CircularProgress>Saving…</CircularProgress>
  ),
};

function getSecretFieldHelpText({ status }: SecretModel): string | null {
  return status === STATUS_OK ? 'Existing value will be overwritten' : null;
}

function shouldFormBeDisabled(
  saveStatus: RequestState,
  value: string,
  savedValue: string
): boolean {
  return (
    [RequestState.IN_PROGRESS, RequestState.SUCCESS].includes(saveStatus) ||
    value === savedValue ||
    !value
  );
}

export const SecretForm = ({
  secret,
  secretName,
  saveError,
  saveState,
  overview,
  handleSubmit,
  resetSaveState,
  getSecret,
}: SecretFormProps): JSX.Element => {
  const [value, setValue] = useState<string>();
  const [savedValue, setSavedValue] = useState<string>();

  useEffect(() => {
    if (
      [RequestState.FAILURE, RequestState.SUCCESS].includes(saveState) &&
      savedValue !== value
    ) {
      resetSaveState();
    } else if (RequestState.IN_PROGRESS === saveState) {
      setSavedValue(value);
    }
  }, [value, savedValue, saveState, resetSaveState]);

  useEffect(() => {
    if (saveState === RequestState.SUCCESS) {
      getSecret();
    }
  }, [saveState, getSecret]);

  return secret ? (
    <>
      <div className="grid grid--gap-medium">
        <Typography variant="h4">Overview</Typography>
        {overview || (
          <Typography>
            Secret <strong>{secretName}</strong>
          </Typography>
        )}
        {secret.tlsCertificates?.length > 0 && (
          <TLSCertificateList tlsCertificates={secret.tlsCertificates} />
        )}
        <div className="secret-status">
          <Typography>Status</Typography>
          <SecretStatus secret={secret} />
        </div>
        <SecretStatusMessages secret={secret} />
        {secret.type === SecretType.SecretTypeClientCert && (
          <ExternalDnsAliasHelp />
        )}
        <div className="secret-overview-form">
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              handleSubmit(value);
            }}
          >
            <fieldset
              className="grid grid--gap-small"
              disabled={saveState === RequestState.IN_PROGRESS}
            >
              <TextField
                label="Secret value"
                id="secret_value_field"
                helperText={getSecretFieldHelpText(secret)}
                onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                  setValue(target.value)
                }
                value={value}
                multiline
              />

              {saveStateTemplates[saveState] &&
                saveStateTemplates[saveState]({ error: saveError })}

              <div>
                <Button
                  type="submit"
                  disabled={shouldFormBeDisabled(saveState, value, savedValue)}
                >
                  Save
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  ) : (
    <>No secret…</>
  );
};

SecretForm.propTypes = {
  secret: PropTypes.shape(SecretModelValidationMap),
  secretName: PropTypes.string.isRequired,
  saveError: PropTypes.string,
  saveState: PropTypes.oneOf(Object.values(RequestState)),
  overview: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
  resetSaveState: PropTypes.func.isRequired,
  getSecret: PropTypes.func.isRequired,
} as PropTypes.ValidationMap<SecretFormProps>;
