import {
  Accordion,
  Button,
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
  radixApi,
  useGetEnvironmentQuery,
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
import AnotherAsyncResource from '../async-resource/another-async-resource';
import { errorToast, successToast } from '../global-top-nav/styled-toaster';
import { getFetchErrorMessage } from '../../store/utils';

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

const UpdateExternalDNSTLSForm: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  fqdn: string;
}> = ({ appName, envName, componentName, fqdn }) => {
  const [requestData, setRequestData] = useState<{
    certificate?: string;
    privateKey?: string;
  }>({});
  const requestDataIsValid = useMemo(
    () =>
      requestData.certificate?.length > 0 && requestData.privateKey?.length > 0,
    [requestData]
  );

  const [saveFunc, saveState] =
    radixApi.endpoints.updateComponentExternalDnsTls.useMutation();

  const { refetch, ...envState } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval: 15000 }
  );

  return (
    <AnotherAsyncResource asyncState={envState}>
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
                certificate: requestData.certificate,
                privateKey: requestData.privateKey,
              },
            }).unwrap();
            refetch();
            successToast('Saved');
          } catch (error) {
            errorToast(`Error while saving. ${getFetchErrorMessage(error)}`);
          }
        }}
      >
        <fieldset
          className="grid grid--gap-large"
          disabled={saveState.isLoading}
        >
          <TextField
            id="certString"
            label="X509 Certificate in PEM format"
            multiline
            rows={5}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setRequestData((v) => ({ ...v, certificate: ev.target.value }))
            }
          />
          <TextField
            id="privateKeyString"
            label="Private Key in PEM format"
            multiline
            rows={5}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setRequestData((v) => ({ ...v, privateKey: ev.target.value }))
            }
          />
          <div>
            <Button
              type="submit"
              disabled={saveState.isLoading || !requestDataIsValid}
            >
              Save
            </Button>
          </div>
        </fieldset>
      </form>
    </AnotherAsyncResource>
  );
};

const ExternalDNSLink: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  externalDNS: ExternalDns;
}> = ({ appName, envName, componentName, externalDNS }) => {
  const [visibleScrim, setVisibleScrim] = useState(false);

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
        onClose={() => setVisibleScrim(false)}
      >
        <div className="secret-item__scrim-content grid grid--gap-large">
          <Typography>
            Update TLS certificate and private key for {externalDNS.fqdn}
          </Typography>
          <UpdateExternalDNSTLSForm
            appName={appName}
            envName={envName}
            componentName={componentName}
            fqdn={externalDNS.fqdn}
          />
        </div>
      </ScrimPopup>
    </div>
  );
};

export const ExternalDNS: FunctionComponent<{
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
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={false}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              External DNS ({sortedExternalDNSList?.length})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-large">
            <ExternalDnsAliasHelp />
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
                            <ExternalDNSStatusBadge
                              status={externalDNS.tls.status}
                            />
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
                                    tlsCertificates={
                                      externalDNS.tls.certificates
                                    }
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
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ExternalDNS.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  externalDNSList: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ExternalDns>
  ),
};
