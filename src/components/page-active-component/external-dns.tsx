import {
  Accordion,
  Button,
  Checkbox,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ExternalDns,
  useGetEnvironmentQuery,
  useUpdateComponentExternalDnsTlsMutation,
} from '../../store/radix-api';
import { ExternalDnsAliasHelp } from '../external-dns-alias-help';
import { Alert } from '../alert';
import { ScrimPopup } from '../scrim-popup';
import { errorToast, successToast } from '../global-top-nav/styled-toaster';
import { getFetchErrorData, getFetchErrorMessage } from '../../store/utils';
import { ExternalDNSList } from '../external-dns';

type TlsFormData = {
  certificate?: string;
  privateKey?: string;
};

const TLSFieldsForm: FunctionComponent<{
  disabled?: boolean;
  onChange?: (tlsData: TlsFormData) => void;
}> = ({ disabled, onChange }) => {
  const [tlsData, setTlsData] = useState<TlsFormData>({});
  useEffect(() => onChange?.(tlsData), [onChange, tlsData]);

  return (
    <fieldset className="grid grid--gap-large" disabled={disabled}>
      <TextField
        id="certString"
        label="Certificate"
        multiline
        rows={5}
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setTlsData((v) => ({ ...v, certificate: ev.target.value }))
        }
      />
      <TextField
        id="privateKeyString"
        label="Private Key"
        multiline
        rows={5}
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setTlsData((v) => ({ ...v, privateKey: ev.target.value }))
        }
      />
    </fieldset>
  );
};

const EditTLSForm: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  fqdn: string;
  onSaveSuccess?: () => void;
  onSaveError?: (error) => void;
}> = ({
  appName,
  envName,
  componentName,
  fqdn,
  onSaveSuccess,
  onSaveError,
}) => {
  const [{ certificate, privateKey }, setTlsData] = useState<TlsFormData>({});
  const tlsDataIsValid = useMemo(
    () => certificate?.length > 0 && privateKey?.length > 0,
    [certificate, privateKey]
  );
  const [skipValidation, setSkipValidation] = useState(false);
  const [
    saveFunc,
    { isLoading: isSaving, isError: isSaveError, error: saveError },
  ] = useUpdateComponentExternalDnsTlsMutation();
  const saveApiError = useMemo(
    () => (isSaveError ? getFetchErrorData(saveError) : null),
    [isSaveError, saveError]
  );

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        try {
          await saveFunc({
            appName,
            envName,
            componentName,
            fqdn,
            updateExternalDnsTlsRequest: {
              certificate,
              privateKey,
              skipValidation: skipValidation,
            },
          }).unwrap();
          onSaveSuccess?.();
        } catch (error) {
          onSaveError?.(error);
        }
      }}
    >
      <div className="grid grid--gap-large">
        <TLSFieldsForm disabled={isSaving} onChange={setTlsData} />
        <Checkbox
          label="Skip validation"
          disabled={isSaving}
          onChange={(ev) => setSkipValidation(ev.target.checked)}
        ></Checkbox>
        {saveApiError && (
          <Alert type="danger">
            {saveApiError.error && (
              <Typography>{saveApiError.error}</Typography>
            )}
            {saveApiError.message && (
              <Typography>{saveApiError.message}</Typography>
            )}
          </Alert>
        )}
        <div>
          <Button type="submit" disabled={!tlsDataIsValid || isSaving}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

const ExternalDNSFQDNField: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  externalDns: ExternalDns;
}> = ({ appName, envName, componentName, externalDns }) => {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const { refetch } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval: 15000 }
  );

  return (
    <div>
      <Typography
        link={!externalDns.tls.useAutomation}
        onClick={() =>
          !externalDns.tls.useAutomation && setVisibleScrim(!visibleScrim)
        }
        token={{ textDecoration: 'none' }}
      >
        {externalDns.fqdn}
      </Typography>

      <ScrimPopup
        className="secret-item__scrim"
        title={externalDns.fqdn}
        open={visibleScrim}
        isDismissable
        onClose={() => {
          setVisibleScrim(false);
        }}
      >
        <div className="secret-item__scrim-content grid grid--gap-large">
          <Typography>
            Update TLS certificate and private key for{' '}
            <strong>{externalDns.fqdn}</strong>
          </Typography>
          <EditTLSForm
            appName={appName}
            envName={envName}
            componentName={componentName}
            fqdn={externalDns.fqdn}
            onSaveSuccess={() => {
              setVisibleScrim(false);
              successToast('Saved');
              refetch();
            }}
            onSaveError={(error) => {
              errorToast(`Error while saving. ${getFetchErrorMessage(error)}`);
            }}
          />
        </div>
      </ScrimPopup>
    </div>
  );
};

export const ExternalDNSAccordion: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  externalDNSList: Array<ExternalDns>;
}> = ({ appName, envName, componentName, externalDNSList }) => {
  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              External DNS ({externalDNSList?.length})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-large">
            <ExternalDnsAliasHelp />
            <ExternalDNSList
              externalDnsList={externalDNSList}
              fqdnElem={(externalDns) => (
                <ExternalDNSFQDNField
                  {...{
                    appName,
                    envName,
                    componentName,
                    externalDns,
                  }}
                />
              )}
            />
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ExternalDNSAccordion.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  externalDNSList: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ExternalDns>
  ),
};
