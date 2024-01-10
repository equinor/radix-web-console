import {
  Accordion,
  Button,
  Checkbox,
  Icon,
  Table,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ExternalDns,
  Tls,
  useGetEnvironmentQuery,
  useUpdateComponentExternalDnsTlsMutation,
} from '../../store/radix-api';
import { ExternalDnsAliasHelp } from '../external-dns-alias-help';
import { ExternalDNSStatusBadge } from '../status-badges/external-dns-status-badge';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import clsx from 'clsx';
import { TLSCertificateList } from '../tls-certificate-list';
import { Alert, AlertProps } from '../alert';
import { differenceInDays } from 'date-fns';
import { pluraliser } from '../../utils/string';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';
import { ScrimPopup } from '../scrim-popup';
import { errorToast, successToast } from '../global-top-nav/styled-toaster';
import { getFetchErrorData, getFetchErrorMessage } from '../../store/utils';

const dayPluraliser = pluraliser('day', 'days');

function useGetSortedExternalDNS(
  externalDNSList: Array<ExternalDns>
): Array<ExternalDns> {
  const [sortedData, setSortedData] = useState(externalDNSList);

  useEffect(() => {
    setSortedData(
      dataSorter(externalDNSList, [(x, y) => sortCompareString(x.fqdn, y.fqdn)])
    );
  }, [externalDNSList]);

  return sortedData;
}

const AlertTemplates: Record<Tls['status'], AlertProps> = {
  Pending: { type: 'info' },
  Consistent: { type: 'info' },
  Invalid: { type: 'danger' },
};

const StatusMessages: FunctionComponent<{
  status: Tls['status'];
  messages: Array<string>;
}> = ({ status, messages }) => (
  <Alert {...AlertTemplates[status]}>
    <div className="grid grid--gap-medium">
      {messages.map((msg, i) => (
        <Typography key={i}>{msg}</Typography>
      ))}
    </div>
  </Alert>
);

const CertificateExpiry: FunctionComponent<{ expires: string }> = ({
  expires,
}) => {
  const expiresIn = differenceInDays(new Date(expires), new Date());
  return <>{dayPluraliser(expiresIn)}</>;
};

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
  const [tlsData, setTlsData] = useState<TlsFormData>({});
  const [skipValidation, setSkipValidation] = useState(false);
  const tlsDataIsValid = useMemo(
    () => tlsData.certificate?.length > 0 && tlsData.privateKey?.length > 0,
    [tlsData]
  );
  const [saveFunc, saveState] = useUpdateComponentExternalDnsTlsMutation();
  const isSaving = useMemo(() => saveState?.isLoading, [saveState]);
  const saveError = useMemo(
    () => (saveState.isError ? getFetchErrorData(saveState.error) : null),
    [saveState]
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
              certificate: tlsData.certificate,
              privateKey: tlsData.privateKey,
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

const ExternalDNSLink: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  externalDNS: ExternalDns;
}> = ({ appName, envName, componentName, externalDNS }) => {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const { refetch } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval: 15000 }
  );

  return (
    <div>
      <Typography
        link={!externalDNS.tls.useAutomation}
        onClick={() =>
          !externalDNS.tls.useAutomation && setVisibleScrim(!visibleScrim)
        }
        token={{ textDecoration: 'none' }}
      >
        {externalDNS.fqdn}
      </Typography>

      <ScrimPopup
        className="secret-item__scrim"
        title={externalDNS.fqdn}
        open={visibleScrim}
        isDismissable
        onClose={() => {
          setVisibleScrim(false);
        }}
      >
        <div className="secret-item__scrim-content grid grid--gap-large">
          <Typography>
            Update TLS certificate and private key for{' '}
            <strong>{externalDNS.fqdn}</strong>
          </Typography>
          <EditTLSForm
            appName={appName}
            envName={envName}
            componentName={componentName}
            fqdn={externalDNS.fqdn}
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

const ExternalDNSList: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  externalDNSList: Array<ExternalDns>;
}> = ({ appName, envName, componentName, externalDNSList }) => {
  const sortedExternalDNSList = useGetSortedExternalDNS(externalDNSList);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const expandRow = useCallback<(name: string) => void>(
    (name) => setExpandedRows((x) => ({ ...x, [name]: !x[name] })),
    []
  );

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell width={40} />
          <Table.Cell>FQDN</Table.Cell>
          <Table.Cell>Expires</Table.Cell>
          <Table.Cell>Status</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedExternalDNSList
          ?.map((v) => ({
            externalDNS: v,
            hasCertificates: v.tls.certificates?.length > 0,
            certificateExpiry:
              v.tls.certificates?.length > 0
                ? v.tls.certificates[0].notAfter
                : null,
            hasMessages: v.tls.statusMessages?.length > 0,
            expanded: !!expandedRows[v.fqdn],
          }))
          .map(
            ({
              externalDNS,
              hasCertificates,
              certificateExpiry,
              hasMessages,
              expanded,
            }) => (
              <Fragment key={externalDNS.fqdn}>
                <Table.Row
                  className={clsx({
                    'border-bottom-transparent': expanded,
                  })}
                >
                  <Table.Cell className="fitwidth padding-right-0">
                    {(hasCertificates || hasMessages) && (
                      <Typography
                        link
                        as="span"
                        onClick={() => expandRow(externalDNS.fqdn)}
                      >
                        <Icon
                          data={expanded ? chevron_up : chevron_down}
                          role="button"
                          title="Toggle more information"
                        />
                      </Typography>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <ExternalDNSLink
                      {...{
                        appName,
                        envName,
                        componentName,
                        externalDNS,
                      }}
                    />
                    {externalDNS.tls.useAutomation && (
                      <> (automated order/renewal)</>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {certificateExpiry && (
                      <CertificateExpiry expires={certificateExpiry} />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <ExternalDNSStatusBadge status={externalDNS.tls.status} />
                  </Table.Cell>
                </Table.Row>
                {expanded && (
                  <Table.Row>
                    <Table.Cell />
                    <Table.Cell colSpan={3}>
                      <div
                        className="grid grid--gap-medium"
                        style={{ margin: '16px 0' }}
                      >
                        {hasMessages && (
                          <StatusMessages
                            status={externalDNS.tls.status}
                            messages={externalDNS.tls.statusMessages}
                          />
                        )}
                        {hasCertificates && (
                          <TLSCertificateList
                            tlsCertificates={externalDNS.tls.certificates}
                          />
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Fragment>
            )
          )}
      </Table.Body>
    </Table>
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
              appName={appName}
              envName={envName}
              componentName={componentName}
              externalDNSList={externalDNSList}
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
