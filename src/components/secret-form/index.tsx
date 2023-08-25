import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import {
  ChangeEvent,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { Alert } from '../alert';
import { SecretStatus } from '../secret-status';
import { SecretStatusMessages } from '../secret-status-messages';
import { TLSCertificateList } from '../tls-certificate-list';
import { ExternalDnsAliasHelp } from '../external-dns-alias-help';
import {
  BuildSecretModel,
  BuildSecretModelValidationMap,
} from '../../models/radix-api/buildsecrets/build-secret';
import {
  ImageHubSecretModel,
  ImageHubSecretModelValidationMap,
} from '../../models/radix-api/privateimagehubs/image-hub-secret';
import {
  SecretModel,
  SecretModelValidationMap,
} from '../../models/radix-api/secrets/secret';
import { SecretStatus as Status } from '../../models/radix-api/secrets/secret-status';
import { SecretType } from '../../models/radix-api/secrets/secret-type';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

export interface SecretFormProps {
  secret?: SecretModel | BuildSecretModel | ImageHubSecretModel;
  secretName: string;
  saveError?: string;
  saveState?: RequestState;
  overview?: ReactNode;
  handleSubmit: (value: string) => void;
  resetSaveState: () => void;
  getSecret: () => void;
}

const STATUS_OK = Status.Consistent;

const saveStateTemplates: Partial<
  Record<RequestState, FunctionComponent<{ error?: string }>>
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

function getSecretFieldHelpText(status: Status): string | null {
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

export const SecretForm: FunctionComponent<SecretFormProps> = ({
  secret,
  secretName,
  saveError,
  saveState,
  overview,
  handleSubmit,
  resetSaveState,
  getSecret,
}) => {
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

  const status = secret?.status as Status;
  const { statusMessages, tlsCertificates, type } =
    ((secret as SecretModel)?.tlsCertificates && (secret as SecretModel)) || {};

  return secret ? (
    <>
      <div className="grid grid--gap-medium">
        <Typography variant="h4">Overview</Typography>
        {overview || (
          <Typography>
            Secret <strong>{secretName}</strong>
          </Typography>
        )}

        {tlsCertificates?.length > 0 && (
          <TLSCertificateList tlsCertificates={tlsCertificates} />
        )}

        <div className="secret-status">
          <Typography>Status</Typography>
          <SecretStatus status={status} />
        </div>

        {statusMessages?.length > 0 && (
          <SecretStatusMessages status={status} messages={statusMessages} />
        )}

        {type === SecretType.SecretTypeClientCert && <ExternalDnsAliasHelp />}

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
                helperText={getSecretFieldHelpText(status)}
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
  secret: PropTypes.oneOfType([
    PropTypes.shape(
      SecretModelValidationMap
    ) as PropTypes.Validator<SecretModel>,
    PropTypes.shape(
      BuildSecretModelValidationMap
    ) as PropTypes.Validator<BuildSecretModel>,
    PropTypes.shape(
      ImageHubSecretModelValidationMap
    ) as PropTypes.Validator<ImageHubSecretModel>,
  ]),
  secretName: PropTypes.string.isRequired,
  saveError: PropTypes.string,
  saveState: PropTypes.oneOf(Object.values(RequestState)),
  overview: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
  resetSaveState: PropTypes.func.isRequired,
  getSecret: PropTypes.func.isRequired,
};
