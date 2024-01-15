import {
  Accordion,
  Button,
  Checkbox,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, FunctionComponent, useMemo, useState } from 'react';

import {
  ExternalDns,
  useGetEnvironmentQuery,
  useUpdateComponentExternalDnsTlsMutation,
} from '../../store/radix-api';
import { ExternalDnsAliasHelp } from '../external-dns-alias-help';
import { ExternalDNSList } from '../external-dns-list';
import { ScrimPopup } from '../scrim-popup';
import { errorToast, successToast } from '../global-top-nav/styled-toaster';
import { getFetchErrorData } from '../../store/utils';
import { Alert } from '../alert';

type TlsData = {
  certificate?: string;
  privateKey?: string;
};

const TlsEditForm: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  fqdn: string;
  onSaveSuccess?: () => void;
}> = ({ appName, envName, componentName, fqdn, onSaveSuccess }) => {
  const [{ certificate, privateKey }, setTlsData] = useState<TlsData>({});
  const [skipValidation, setSkipValidation] = useState(false);
  const tlsDataIsValid = useMemo(
    () => certificate?.length > 0 && privateKey?.length > 0,
    [certificate, privateKey]
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] =
    useState<ReturnType<typeof getFetchErrorData>>();
  const { refetch } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval: 15000 }
  );
  const [mutateTls] = useUpdateComponentExternalDnsTlsMutation();

  async function saveTls() {
    try {
      setIsSaving(true);
      await mutateTls({
        appName,
        envName,
        componentName,
        fqdn: fqdn,
        updateExternalDnsTlsRequest: {
          certificate,
          privateKey,
          skipValidation,
        },
      }).unwrap();
      refetch();
      successToast('Saved');
      onSaveSuccess?.();
    } catch (error) {
      const errData = getFetchErrorData(error);
      setSaveError(errData);
      errorToast(`Error while saving. ${errData.message}`);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        await saveTls();
      }}
    >
      <div className="grid grid--gap-large">
        <fieldset className="grid grid--gap-large" disabled={isSaving}>
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
        <Checkbox
          label="Skip validation"
          disabled={isSaving}
          onChange={(ev) => setSkipValidation(ev.target.checked)}
        ></Checkbox>
        {saveError && (
          <Alert type="danger">
            {saveError.error && <Typography>{saveError.error}</Typography>}
            {saveError.message && <Typography>{saveError.message}</Typography>}
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

export const ExternalDNSAccordion: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  externalDNSList: Array<ExternalDns>;
}> = ({ appName, envName, componentName, externalDNSList }) => {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const [selectedExternalDns, setSelectedExternalDns] = useState<ExternalDns>();

  return (
    <>
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
                onItemClick={(v) => {
                  setSelectedExternalDns(v);
                  setVisibleScrim(true);
                }}
              />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      {selectedExternalDns && (
        <ScrimPopup
          className="secret-item__scrim"
          title={selectedExternalDns.fqdn}
          open={visibleScrim}
          isDismissable
          onClose={() => {
            setVisibleScrim(false);
          }}
        >
          <div className="secret-item__scrim-content grid grid--gap-large">
            <Typography>
              Update TLS certificate and private key for{' '}
              <strong>{selectedExternalDns.fqdn}</strong>
            </Typography>
            <TlsEditForm
              appName={appName}
              envName={envName}
              componentName={componentName}
              fqdn={selectedExternalDns.fqdn}
              onSaveSuccess={() => setVisibleScrim(false)}
            />
          </div>
        </ScrimPopup>
      )}
    </>
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
